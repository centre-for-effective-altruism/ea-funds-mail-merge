import { useState, createContext, useContext, useEffect } from 'react'
import { useLocalStorage, getLocalStorageKeyFactory } from 'utils/hooks'
import { set } from 'lodash'

export type TColumnValue = string | number | boolean | null
export type TMergeData = Array<Record<string, TColumnValue>>
export type TPathMapping = Record<string, string | null>
export type TTemplateDataModel = Record<string, string | null>[]

export type MergeDataContextProps = {
  mergeData: TMergeData | null
  setMergeData: (mergeData: TMergeData | null) => void
  pathMapping: TPathMapping
  setPathMapping: (path: string, mergeDataField: string | null) => void
  fileName: string | null
  setFileName: (fileName: string | null) => void
  visibleRowId: number
  setVisibleRowId: (rowId: number) => void
  templateDataModel: TTemplateDataModel | null
  resetMergeData: () => void
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
    const templateModel = {}
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
  | 'setPathMapping'
  | 'setFileName'
  | 'setVisibleRowId'
  | 'resetMergeData'
>> = {
  mergeData: null,
  pathMapping: {},
  fileName: null,
  visibleRowId: 0,
  templateDataModel: null,
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

  const value = {
    mergeData,
    setMergeData: (mergeData: TMergeData | null) => {
      setMergeData(mergeData)
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
    resetMergeData,
  } as MergeDataContextProps
  return <Provider value={value}>{children}</Provider>
}

export const useMergeData = (): MergeDataContextProps =>
  useContext(MergeDataContext)
