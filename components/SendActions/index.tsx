import { Button, Grid, FormHelperText } from '@material-ui/core'

const SendActions: React.FC = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Button color="primary" variant="contained" fullWidth>
            Send Test Email
          </Button>
          <FormHelperText>Send a test email to</FormHelperText>
        </Grid>
        <Grid item xs={12}>
          <Button color="secondary" variant="contained" fullWidth>
            Send Live Emails
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

export default SendActions
