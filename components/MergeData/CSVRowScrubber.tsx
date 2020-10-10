import { makeStyles, Typography, Link as MUILink } from '@material-ui/core'
import FileIcon from '@material-ui/icons/Description'
import { useMergeData } from './context'
import RowScrubber from 'components/RowScrubber'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useStyles = makeStyles((theme) => ({
  root: {},
  mergeData: {
    maxHeight: '80vh',
    overflowY: 'scroll',
  },
  csvReader: {
    display: 'none',
  },
  clearLink: {
    cursor: 'pointer',
  },
}))

const CSVRowScrubber: React.FC = () => {
  const {
    mergeData,
    visibleRowId,
    setVisibleRowId,
    fileName,
    resetMergeData,
  } = useMergeData()
  const classes = useStyles()

  return (
    <>
      {mergeData ? (
        <>
          <Typography variant="h4" gutterBottom>
            Merge data
          </Typography>
          <Typography>
            <FileIcon /> {fileName}{' '}
            <MUILink onClick={resetMergeData} className={classes.clearLink}>
              (clear)
            </MUILink>
          </Typography>
          <RowScrubber
            rows={mergeData}
            rowId={visibleRowId}
            setRowId={setVisibleRowId}
          />
        </>
      ) : (
        <>No merge data imported!</>
      )}
    </>
  )
}

export default CSVRowScrubber
