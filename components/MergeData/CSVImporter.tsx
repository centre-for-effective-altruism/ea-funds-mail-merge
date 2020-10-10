import { makeStyles, Button } from '@material-ui/core'
import CSVReader, { IFileInfo } from 'react-csv-reader'
import { useMergeData, isValidMergeData } from './context'
import { Typography } from '@material-ui/core'

const parserOptions = {
  header: true,
  dynamicTyping: true,
  skipEmptyLines: true,
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
      <Typography variant="h4" gutterBottom>
        Import merge data
      </Typography>
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
