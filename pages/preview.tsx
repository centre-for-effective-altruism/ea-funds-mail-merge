import { Grid, Divider } from '@material-ui/core'
import EmailPreview from 'components/EmailPreview'
import MappedDataRowScrubber from 'components/MergeData/MappedDataRowScrubber'
import Page from 'components/Page'

const Preview: React.FC = () => {
  return (
    <Page pageTitle="Preview and Send">
      <Grid container spacing={6}>
        <Grid item md={4}>
          <MappedDataRowScrubber />
        </Grid>
        <Grid item md={8}>
          <EmailPreview />
        </Grid>
      </Grid>
    </Page>
  )
}

export default Preview
