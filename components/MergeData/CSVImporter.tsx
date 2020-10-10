import { makeStyles, Button } from '@material-ui/core'
import CSVReader, { IFileInfo } from 'react-csv-reader'
import { useMergeData, isValidMergeData } from './context'

const parserOptions = {
  header: true,
  dynamicTyping: true,
  skipEmptyLines: true,
}

const useStyles = makeStyles((theme) => ({
  root: {},
  csvReader: {
    display: 'none',
  },
}))

const CSVImporter: React.FC = () => {
  const { setMergeData, setVisibleRowId, setFileName } = useMergeData()
  const classes = useStyles()

  const handleFileLoaded = (data: unknown[], fileInfo: IFileInfo) => {
    if (isValidMergeData(data)) {
      setVisibleRowId(0)
      setMergeData(data)
      setFileName(fileInfo.name)
    } else {
      throw new Error(`Could not import data, invalid formatting`)
    }
  }

  return (
    <>
      <CSVReader
        onFileLoaded={handleFileLoaded}
        parserOptions={parserOptions}
        cssInputClass={classes.csvReader}
        inputId="csv-reader-input"
      />
      <label htmlFor="csv-reader-input">
        <Button variant="contained" color="primary" component="span" fullWidth>
          Upload CSV File
        </Button>
      </label>
    </>
  )
}

export default CSVImporter
