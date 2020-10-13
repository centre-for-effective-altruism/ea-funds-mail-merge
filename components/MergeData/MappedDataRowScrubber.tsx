import { Typography } from '@material-ui/core'
import RowScrubber from 'components/RowScrubber'
import { get } from 'lodash'
import { useMergeData } from './'
import { TPathMapping } from './context'
import {
  TTemplateDataModel,
  TTemplateDataModelRowBase,
} from 'components/Templates/context'

const getMappedTemplateData = (
  templateDataModel: TTemplateDataModel,
  pathMapping: TPathMapping,
): Record<string, TTemplateDataModelRowBase>[] =>
  templateDataModel.map((row) =>
    Object.fromEntries(
      Object.entries(pathMapping).map(([key]) => {
        let val = get(row, key)
        // this type guard here because technically, `get()` could return an object
        // (i.e. not a leaf node). In practice this will almost certainly never happen
        // (because the path mappings should always terminate at a leaf node)
        // but the type guard is here so that TS doesn't complain
        if (
          typeof val !== 'number' &&
          typeof val !== 'string' &&
          typeof val !== 'boolean' &&
          val !== null
        )
          val = null
        return [key, val]
      }),
    ),
  )

const MappedDataRowScrubber: React.FC = () => {
  const {
    pathMapping,
    templateDataModel,
    visibleRowId,
    setVisibleRowId,
  } = useMergeData()
  if (!templateDataModel) return null

  const rows = getMappedTemplateData(templateDataModel, pathMapping)

  return (
    <>
      <Typography variant="h4">Data</Typography>
      <RowScrubber
        rows={rows}
        rowId={visibleRowId}
        setRowId={setVisibleRowId}
      />
    </>
  )
}

export default MappedDataRowScrubber
