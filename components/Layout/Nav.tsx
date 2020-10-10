import {
  AppBar,
  Container,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core'
import ButtonLink from 'components/ButtonLink'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'

const useStyles = makeStyles((theme) => ({
  toolbarSpacer: {
    ...theme.mixins.toolbar,
    marginBottom: theme.spacing(4),
  },
  title: {
    flexGrow: 1,
  },
  navigation: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  navigationItem: {
    display: 'flex',
    flexGrow: 0,
    width: 'auto',
    alignContent: 'center',
  },
  navSpacerIcon: {
    paddingTop: '0.43em',
  },
}))

export type TRoute = {
  href: string
  label: string
}

const Routes: TRoute[] = [
  { href: '/', label: 'Start' },
  { href: '/sender', label: 'Sender' },
  { href: '/select-template', label: 'Template' },
  { href: '/data-import', label: 'Data' },
  { href: '/preview', label: 'Preview and Send' },
]

const Nav: React.FC = () => {
  const classes = useStyles()
  return (
    <>
      <AppBar>
        <Container>
          <Toolbar disableGutters>
            <Typography variant="h6" component="h1" className={classes.title}>
              EA Funds Mail Merge
            </Typography>
            <div className={classes.navigation}>
              {Routes.map(({ href, label }, i) => (
                <span key={href} className={classes.navigationItem}>
                  <ButtonLink key={href} href={href} color="inherit">
                    {label}
                  </ButtonLink>
                  {i < Routes.length - 1 && (
                    <span className={classes.navSpacerIcon}>
                      <ChevronRightIcon />
                    </span>
                  )}
                </span>
              ))}
            </div>
          </Toolbar>
        </Container>
      </AppBar>
      <div className={classes.toolbarSpacer} />
    </>
  )
}
export default Nav
