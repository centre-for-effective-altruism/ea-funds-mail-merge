import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Page from 'components/Page'
import { useTemplates } from 'components/Templates'
import { Box, Divider, Grid, Typography } from '@material-ui/core'
import CSVImporter from 'components/MergeData/CSVImporter'
import FieldMapper from 'components/MergeData/FieldMapper'
import { useMergeData } from 'components/MergeData'
import SenderDetails from 'components/GlobalDetails'
import CSVRowScrubber from 'components/MergeData/CSVRowScrubber'

const DataImport: React.FC = () => {
  const { selectedTemplate } = useTemplates()
  const { mergeData } = useMergeData()
  const router = useRouter()
  // If we don't have requisite data, and it doesn't get loaded from localStorage after a second
  // then redirect back to the home page
  useEffect(() => {
    if (!selectedTemplate) router.replace('/')
  }, [])

  if (!selectedTemplate) return null

  return (
    <Page pageTitle={'Data Import'}>
      <Box marginTop={3} marginBottom={6}>
        <Typography gutterBottom>
          Import data to use with the <strong>{selectedTemplate.Name}</strong>{' '}
          template:
        </Typography>
      </Box>
      <Grid container spacing={6}>
        <Grid item md={4}>
          <SenderDetails />
          {!mergeData ? <CSVImporter /> : <CSVRowScrubber />}
        </Grid>
        <Grid item md={8}>
          <FieldMapper />
        </Grid>
      </Grid>
    </Page>
  )
}
export default DataImport
