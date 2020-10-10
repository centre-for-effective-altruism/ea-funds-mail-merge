import { Grid, Typography } from '@material-ui/core'
import EmailPreview from 'components/EmailPreview'
import SendActions from 'components/SendActions'
import MappedDataRowScrubber from 'components/MergeData/MappedDataRowScrubber'
import Page from 'components/Page'

const Preview: React.FC = () => {
  return (
    <Page pageTitle="Preview and Send">
      <Grid container spacing={6}>
        <Grid item md={3}>
          <MappedDataRowScrubber />
        </Grid>
        <Grid item md={7}>
          <EmailPreview />
        </Grid>
        <Grid item md={2}>
          <Typography variant="h4">Actions</Typography>
          <SendActions />
        </Grid>
      </Grid>
    </Page>
  )
}

export default Preview
