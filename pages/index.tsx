import { Button, Grid, Typography } from '@material-ui/core'
import ButtonLink from 'components/ButtonLink'
import Page from 'components/Page'
import { useTemplates } from 'components/Templates'
import { useMergeData } from 'components/MergeData'

const Home: React.FC = () => {
  const { selectedTemplate, resetTemplates } = useTemplates()
  const { mergeData, resetMergeData, resetGlobalData } = useMergeData()
  const reset = () => {
    resetMergeData()
    resetGlobalData()
    resetTemplates()
  }
  return (
    <Page pageTitle={process.env.NEXT_PUBLIC_SITE_TITLE}>
      <Grid container spacing={6}>
        <Grid item md={4}>
          <Typography variant="h4" gutterBottom>
            Step 1: Select a template
          </Typography>
          <Typography gutterBottom>
            {selectedTemplate ? (
              <>
                <strong>Selected Template:</strong> {selectedTemplate.Name}
              </>
            ) : (
              <>Select which template you{`'`}d like to use.</>
            )}
          </Typography>
          <ButtonLink
            variant="contained"
            fullWidth
            color={selectedTemplate ? 'inherit' : 'primary'}
            href="/select-template"
          >
            Select Template
          </ButtonLink>
        </Grid>
        <Grid item md={4}>
          <Typography variant="h4" gutterBottom>
            Step 2: Import Data
          </Typography>
          <ButtonLink
            variant="contained"
            fullWidth
            color={mergeData ? 'inherit' : 'primary'}
            href="/data-import"
          >
            Import Data
          </ButtonLink>
        </Grid>
        <Grid item md={4}>
          <Typography variant="h4" gutterBottom>
            Step 3: Preview and Send
          </Typography>
          <ButtonLink
            variant="contained"
            fullWidth
            disabled={!selectedTemplate || !mergeData}
            color={'primary'}
            href="/preview"
          >
            Preview and Send
          </ButtonLink>
        </Grid>
      </Grid>
      <Button onClick={reset}>Reset</Button>
    </Page>
  )
}

export default Home
