import { useState, MouseEvent } from 'react'
import {
  Grid,
  Divider,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Typography,
  Button,
  Link as MUILink,
} from '@material-ui/core'
import FileIcon from '@material-ui/icons/Description'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import CSVReader, { IFileInfo } from 'react-csv-reader'
import { useMergeData, isValidMergeData } from './context'
import RowScrubber from 'components/RowScrubber'

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
          <Typography variant="h4">Imported data</Typography>
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
