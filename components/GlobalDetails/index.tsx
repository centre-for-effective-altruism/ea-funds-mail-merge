import {
  Box,
  Button,
  FormControl,
  Grid,
  Input,
  InputLabel,
  Link,
  Typography,
} from '@material-ui/core'
import ClearIcon from '@material-ui/icons/Clear'
import { useMergeData } from 'components/MergeData'
import { useEffect, useState } from 'react'

const GlobalDetails: React.FC = () => {
  const { globalData, setGlobalData } = useMergeData()
  const [addFieldValue, setAddFieldValue] = useState(null as string | null)
  const [showAddField, setShowAddField] = useState(false)

  const handleAddFieldChange = (
    event: React.ChangeEvent<{ value: unknown }>,
  ) => {
    const val = event.target.value
    if (typeof val === 'string' || val === null) setAddFieldValue(val)
  }

  const handleAddField = (event: React.FormEvent) => {
    event.preventDefault()
    if (typeof addFieldValue === 'string') {
      setGlobalData({ [addFieldValue]: null })
      setShowAddField(false)
    }
  }

  const handleDataChange = (
    key: string,
    event: React.ChangeEvent<{ value: unknown }>,
  ) => {
    const val = event.target.value
    if (typeof val === 'string' && val !== null) {
      setGlobalData({ [key]: `${val}` })
    } else {
      setGlobalData({ [key]: null })
    }
  }

  useEffect(() => {
    if (!globalData) setShowAddField(true)
  }, [globalData])

  useEffect(() => {
    if (showAddField && addFieldValue) setAddFieldValue(null)
  }, [showAddField])

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Global data
      </Typography>
      <Box marginBottom={2}>
        {showAddField ? (
          <>
            {globalData && (
              <ul>
                {Object.keys(globalData).map((key) => (
                  <li key={key}>
                    <Typography gutterBottom>
                      <strong>{key}:</strong> {globalData[key]}
                    </Typography>
                  </li>
                ))}
              </ul>
            )}
            <Typography>
              Add field:{' '}
              <Link onClick={() => setShowAddField(false)}>(cancel)</Link>
            </Typography>
            <form onSubmit={handleAddField}>
              <FormControl fullWidth>
                <InputLabel htmlFor={`add-field-input`}>New field</InputLabel>
                <Input
                  autoFocus
                  id={`add-field-input`}
                  value={addFieldValue}
                  onChange={handleAddFieldChange}
                />
              </FormControl>
            </form>
          </>
        ) : (
          <>
            {globalData &&
              Object.keys(globalData).map((key) => (
                <Box marginBottom={2} key={key}>
                  <Grid container alignItems="flex-end">
                    <Grid item xs={11}>
                      <FormControl fullWidth>
                        <InputLabel htmlFor={`${key}-input`}>{key}</InputLabel>
                        <Input
                          autoFocus={key === addFieldValue}
                          id={`${key}-input`}
                          value={globalData[key] || ''}
                          onChange={(event) => handleDataChange(key, event)}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={1}>
                      <Button onClick={() => setGlobalData({ [key]: false })}>
                        <ClearIcon />
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              ))}

            <Button variant="outlined" onClick={() => setShowAddField(true)}>
              Add field
            </Button>
          </>
        )}
      </Box>
    </>
  )
}

export default GlobalDetails
