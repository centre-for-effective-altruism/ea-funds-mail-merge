import {
  Grid,
  Divider,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Typography,
  Button,
} from '@material-ui/core'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'

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

type RowScrubberProps = {
  rows: Record<string, string | number | boolean | null>[]
  rowId: number
  setRowId: (rowId: number) => void
}

const RowScrubber: React.FC<RowScrubberProps> = ({ rows, rowId, setRowId }) => {
  const classes = useStyles()

  const handleSetRowId = (rowId: number) => {
    if (rowId < 0) rowId = rows.length - 1
    else if (rowId > rows.length - 1) rowId = 0
    setRowId(rowId)
  }

  if (!rows) return null
  const visibleRow = rows[rowId]

  return (
    <>
      <List>
        <ListItem>
          <ListItemText disableTypography>
            <Grid container>
              <Grid item xs={8}>
                <Typography variant="h6">Row {rowId + 1}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Grid container>
                  <Grid item xs={6}>
                    <Button onClick={() => handleSetRowId(rowId - 1)}>
                      <ChevronLeftIcon />
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button onClick={() => handleSetRowId(rowId + 1)}>
                      <ChevronRightIcon />
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </ListItemText>
        </ListItem>
        <Divider />
        <div className={classes.mergeData}>
          {Object.entries(visibleRow).map(([key, val]) => (
            <ListItem key={key}>
              <ListItemText primary={val} secondary={key} />
            </ListItem>
          ))}
        </div>
      </List>
    </>
  )
}

export default RowScrubber
