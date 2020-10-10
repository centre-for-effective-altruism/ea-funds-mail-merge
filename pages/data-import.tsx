import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Page from 'components/Page'
import { useTemplates } from 'components/Templates'
import { Box, Divider, Grid, Typography } from '@material-ui/core'
import CSVImporter from 'components/MergeData/CSVImporter'
import FieldMapper from 'components/MergeData/FieldMapper'
import { useMergeData } from 'components/MergeData'
import CSVRowScrubber from 'components/MergeData/CSVRowScrubber'

const DataImport: React.FC = () => {
  const { selectedTemplate } = useTemplates()
  const { mergeData } = useMergeData()
  const router = useRouter()
  useEffect(() => {
    if (!selectedTemplate) router.replace('/')
  }, [])

  if (!selectedTemplate) return null

  return (
    <Page pageTitle={'Data Import'}>
      <Typography gutterBottom>
        Import data to use with the <strong>{selectedTemplate.Name}</strong>{' '}
        template:
      </Typography>
      <Box marginTop={3} marginBottom={3}>
        <Divider />
      </Box>
      <Grid container spacing={6}>
        <Grid item md={4}>
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
