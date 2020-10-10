import {
  Grid,
  List,
  ListItem,
  ListItemText,
  Select,
  MenuItem,
  Typography,
  Divider,
} from '@material-ui/core'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import FileIcon from '@material-ui/icons/Description'
import WorldIcon from '@material-ui/icons/Public'
import ButtonLink from 'components/ButtonLink'
import { useTemplates } from 'components/Templates'
import { getPaths } from 'utils/object'
import { useMergeData } from './context'

export const UNASSIGNED_FIELD = '__UNASSIGNED__'

const FieldMapper: React.FC = () => {
  const {
    mergeData,
    pathMapping,
    setPathMapping,
    visibleRowId,
    fileName,
  } = useMergeData()
  const { selectedTemplateModel } = useTemplates()
  const paths = selectedTemplateModel ? getPaths(selectedTemplateModel) : null
  const columns = mergeData ? Object.entries(mergeData[visibleRowId]) : null

  const handleSetPathMapping = (
    path: string,
    event: React.ChangeEvent<{ value: unknown }>,
  ) => {
    const value = event.target.value || null
    if (typeof value === 'string' || value === null) setPathMapping(path, value)
  }

  return (
    <>
      {mergeData && paths && columns ? (
        <>
          <Grid container>
            <Grid item md={9}>
              <Typography variant="h4">Map Fields</Typography>
            </Grid>
            <Grid item md={3}>
              <ButtonLink
                href="/"
                variant="contained"
                color="primary"
                fullWidth
              >
                Use This Mapping
              </ButtonLink>
            </Grid>
          </Grid>
          <List>
            {paths.map((path) => (
              <ListItem key={path}>
                <Grid container>
                  <Grid item xs={5}>
                    <ListItemText>{path}</ListItemText>
                  </Grid>
                  <Grid item xs={2}>
                    <ChevronRightIcon />
                  </Grid>
                  <Grid item xs={5}>
                    <Select
                      value={pathMapping[path] || UNASSIGNED_FIELD}
                      onChange={(event) => handleSetPathMapping(path, event)}
                      fullWidth
                    >
                      <MenuItem value={UNASSIGNED_FIELD}>
                        <em>not set</em>
                      </MenuItem>
                      <Divider />
                      <MenuItem disabled>
                        <FileIcon /> <strong>CSV Import ({fileName})</strong>
                      </MenuItem>
                      {columns.map(([key, val]) => (
                        <MenuItem key={key} value={`${key}`}>
                          {key} <em>({val})</em>
                        </MenuItem>
                      ))}
                      <MenuItem disabled>
                        <WorldIcon /> <strong>Global Data</strong>
                      </MenuItem>
                    </Select>
                  </Grid>
                </Grid>
              </ListItem>
            ))}
          </List>
        </>
      ) : (
        <>
          <Typography gutterBottom>Import merge data...</Typography>
        </>
      )}
    </>
  )
}

export default FieldMapper
