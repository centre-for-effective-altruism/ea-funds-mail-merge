import { useState, createContext, useContext } from 'react'
import { useLocalStorage, getLocalStorageKeyFactory } from 'utils/hooks'
import { merge, set, omitBy, mapValues } from 'lodash'
import {
  TSenderDetails,
  getFinalMergeData,
  TFinalMergeData,
} from 'utils/emails'
import { TTemplateDataModel } from 'components/Templates/context'

export type TColumnValue = string | number | boolean | null
export type TMergeDatum = Record<string, TColumnValue>
export type TMergeData = Array<TMergeDatum>
export type TPathMapping = Record<string, string | null>

export type TGlobalDataModel = {
  sender: TSenderDetails
  testing: {
    email: string | null
  }
  [key: string]: string | Record<string, string | null> | null
}

export type MergeDataContextProps = {
  mergeData: TMergeData | null
  setMergeData: (mergeData: TMergeData | null) => void
  globalData: TMergeDatum | null
  globalDataModel: TGlobalDataModel
  setGlobalData: (mergeData: TMergeDatum) => void
  pathMapping: TPathMapping
  setPathMapping: (path: string, mergeDataField: string | null) => void
  fileName: string | null
  setFileName: (fileName: string | null) => void
  visibleRowId: number
  setVisibleRowId: (rowId: number) => void
  templateDataModel: TTemplateDataModel | null
  finalMergeData: TFinalMergeData | null
  resetMergeData: () => void
  resetGlobalData: () => void
}

const defaultSender: TSenderDetails = {
  first_name: null,
  last_name: null,
  full_name: null,
  email: null,
  cc: null,
  bcc: null,
}

const globalDataDefaults = {
  'sender.first_name': null,
  'sender.last_name': null,
  'sender.full_name': null,
  'sender.email': null,
  'testing.email': null,
}

export const isValidMergeData = (arg: unknown[]): arg is TMergeData => {
  return arg.every(
    (row) =>
      typeof row === 'object' &&
      row !== null &&
      Object.entries(row).every(
        ([key, val]) =>
          (typeof key === 'string' || typeof key === 'number') &&
          (typeof val === 'string' ||
            typeof val === 'number' ||
            typeof val === 'boolean' ||
            val === null),
      ),
  )
}

export const getTemplateDataModel = (
  mergeData: TMergeData,
  pathMapping: TPathMapping,
): TTemplateDataModel => {
  return mergeData.map((row) => {
    const templateModel = {
      recipient: { ...defaultSender },
    }
    for (const path in pathMapping) {
      const col = pathMapping[path]
      if (col) set(templateModel, path, row[col])
    }
    return templateModel
  })
}

const initialContext: Readonly<Omit<
  MergeDataContextProps,
  | 'setMergeData'
  | 'setGlobalData'
  | 'globalDataModel'
  | 'setPathMapping'
  | 'setFileName'
  | 'setVisibleRowId'
  | 'resetMergeData'
  | 'resetGlobalData'
>> = {
  mergeData: null,
  globalData: { ...globalDataDefaults },
  pathMapping: {},
  fileName: null,
  visibleRowId: 0,
  templateDataModel: null,
  finalMergeData: null,
}

export const MergeDataContext = createContext(
  initialContext as MergeDataContextProps,
)

const LOCALSTORAGE_NAMESPACE = 'MergeData'
const getLSKey = getLocalStorageKeyFactory(LOCALSTORAGE_NAMESPACE)

const { Provider } = MergeDataContext

export const MergeDataProvider: React.FC = ({ children }) => {
  const [mergeData, setMergeData] = useLocalStorage(
    getLSKey('mergeData'),
    null as TMergeData | null,
  )
  const [globalData, setGlobalData] = useLocalStorage(
    getLSKey('globalData'),
    initialContext.globalData,
  )
  const [pathMapping, setPathMapping] = useLocalStorage(
    getLSKey('pathMapping'),
    {} as TPathMapping,
  )
  const [fileName, setFileName] = useLocalStorage(
    'fileName',
    null as string | null,
  )
  const [visibleRowId, setVisibleRowId] = useState(0)

  const templateDataModel =
    mergeData && pathMapping
      ? getTemplateDataModel(mergeData, pathMapping)
      : null

  const resetMergeData = () => {
    setMergeData(initialContext.mergeData)
    setPathMapping(initialContext.pathMapping)
    setFileName(initialContext.fileName)
    setVisibleRowId(initialContext.visibleRowId)
  }

  const resetGlobalData = () => {
    setGlobalData(initialContext.globalData)
  }

  // maps out the flat string paths of globalData into a fully-specified object
  // e.g. 'sender.email': 'foo' becomes { sender: {email : 'foo' } }
  const globalDataModel: TGlobalDataModel = {
    sender: { ...defaultSender },
    testing: { email: null },
  }
  for (const key in globalData) {
    set(globalDataModel, key, globalData[key])
  }

  const finalMergeData =
    globalDataModel && templateDataModel
      ? getFinalMergeData(globalDataModel, templateDataModel)
      : null

  const value = {
    mergeData,
    setMergeData: (mergeData: TMergeData | null) => {
      setMergeData(mergeData)
    },
    globalData,
    globalDataModel,
    setGlobalData: (globalDatum: TMergeDatum) => {
      // merge the new data, unless the value === 'false', in which case remove it
      const newData = mapValues(
        omitBy(
          merge(globalData, globalDatum),
          (val, key) =>
            val === false && !Object.keys(globalDataDefaults).includes(key),
        ),
        (val) => (val === false ? '' : val),
      )
      if (Object.keys(newData).length) {
        setGlobalData({
          ...newData,
        })
      } else {
        setGlobalData(null)
      }
    },
    pathMapping,
    setPathMapping: (path: string, mergeDataField: string | null) => {
      setPathMapping({
        ...pathMapping,
        [path]: mergeDataField,
      })
    },
    fileName,
    setFileName,
    visibleRowId,
    setVisibleRowId,
    templateDataModel,
    finalMergeData,
    resetMergeData,
    resetGlobalData,
  } as MergeDataContextProps
  return <Provider value={value}>{children}</Provider>
}

export const useMergeData = (): MergeDataContextProps =>
  useContext(MergeDataContext)
