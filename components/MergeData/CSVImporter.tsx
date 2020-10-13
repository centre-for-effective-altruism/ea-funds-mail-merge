import { makeStyles, Button, Box } from '@material-ui/core'
import CSVReader, { IFileInfo, CSVReaderProps } from 'react-csv-reader'
import { useMergeData, isValidMergeData } from './context'
import { Typography } from '@material-ui/core'
import { useState } from 'react'
import { Alert } from '@material-ui/lab'

const parserOptions: CSVReaderProps['parserOptions'] = {
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
  const [error, setError] = useState(null as string | null)
  const classes = useStyles()

  const handleFileLoaded = (data: unknown[], fileInfo: IFileInfo) => {
    setError(null)
    try {
      if (isValidMergeData(data)) {
        setVisibleRowId(0)
        setMergeData(
          data.map((row) =>
            Object.fromEntries(
              Object.entries(row).map(([key, val]) => {
                if (typeof val === 'string') val = val.trim()
                return [key, val]
              }),
            ),
          ),
        )
        setFileName(fileInfo.name)
      } else {
        throw new Error(`Could not import data, invalid formatting`)
      }
    } catch (err) {
      console.error(err)
      setError(err.message)
    }
  }

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Import merge data
      </Typography>
      {error && (
        <Box marginBottom={2}>
          <Alert severity="error">{error}</Alert>
        </Box>
      )}
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
