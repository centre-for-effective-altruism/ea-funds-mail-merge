import Grid from '@material-ui/core/Grid'
import Page from 'components/Page'
import { TemplateSelector, TemplateViewer } from 'components/Templates'

const Home: React.FC = () => {
  return (
    <Page pageTitle={process.env.NEXT_PUBLIC_SITE_TITLE}>
      <Grid container spacing={6}>
        <Grid item md={4}>
          <TemplateSelector />
        </Grid>
        <Grid item md={8}>
          <TemplateViewer />
        </Grid>
      </Grid>
    </Page>
  )
}

export default Home
