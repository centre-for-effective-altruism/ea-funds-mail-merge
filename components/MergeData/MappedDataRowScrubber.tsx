import { Divider, Typography } from '@material-ui/core'
import RowScrubber from 'components/RowScrubber'
import { get } from 'lodash'
import { useMergeData } from './'
import { TPathMapping, TTemplateDataModel } from './context'

const getMappedTemplateData = (
  templateDataModel: TTemplateDataModel,
  pathMapping: TPathMapping,
) =>
  templateDataModel.map((row) =>
    Object.fromEntries(
      Object.entries(pathMapping).map(([key]) => [key, get(row, key)]),
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
