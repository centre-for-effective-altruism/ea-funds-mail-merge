import { Typography, Grid } from '@material-ui/core'
import ButtonLink from 'components/ButtonLink'
import { useTemplates } from './context'
import { makeStyles } from '@material-ui/core'
import { getPaths } from 'utils/object'

const useStyles = makeStyles((theme) => ({
  root: {},
  alias: {
    color: theme.palette.grey[500],
  },
  templatePreview: {
    border: `1px solid ${theme.palette.grey[500]}`,
    padding: theme.spacing(3),
    fontFamily:
      'Consolas, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", Monaco, "Courier New", Courier, monospace;',
  },
}))

const TemplateViewer: React.FC = () => {
  const { selectedTemplate } = useTemplates()
  const classes = useStyles()
  if (!selectedTemplate) return <Typography>Select a template...</Typography>

  return (
    <>
      <Grid container>
        <Grid item md={9}>
          <Typography variant="h5" gutterBottom>
            {selectedTemplate.Name}{' '}
            <code className={classes.alias}>{selectedTemplate.Alias}</code>
          </Typography>
        </Grid>
        <Grid item md={3}>
          <ButtonLink fullWidth variant="contained" color="primary" href="/">
            Use this template
          </ButtonLink>
        </Grid>
      </Grid>

      <div className={classes.templatePreview}>
        {selectedTemplate.HtmlBody?.split('\n').map((str, i) => (
          <div key={i}>
            {str}
            {'\u00A0'}
          </div>
        ))}
      </div>
    </>
  )
}

export default TemplateViewer
