import { ThemeProvider, CssBaseline, createMuiTheme } from '@material-ui/core'

import { useEffect } from 'react'
import { AppProps } from 'next/app'
import Layout from 'components/Layout'

const sansSerifStack = 'Raleway, Helvetica, "Helvetica Neue", Arial, sans-serif'
const serifStack = 'Merriweather, Georgia, Times, "Times New Roman", serif'

const headingStyle = {
  fontFamily: sansSerifStack,
  fontWeight: 700,
}
const headings = Object.fromEntries(
  [...Array(6)].map((_, i) => [`h${i + 1}`, headingStyle]),
)
const theme = createMuiTheme({
  typography: {
    fontFamily: serifStack,
    ...headings,
  },
  palette: {
    primary: {
      main: '#0C869B',
      light: '#00B2BE',
      dark: '#1B5266',
      contrastText: '#FFF',
    },
  },
  overrides: {
    MuiButton: {
      root: {
        fontFamily: sansSerifStack,
        textTransform: 'none',
      },
    },
    MuiDrawer: {
      root: {
        '& .MuiButton-label': {
          textTransform: 'none',
        },
        '& .MuiListItemText-root .MuiTypography-root': {
          fontFamily: sansSerifStack,
        },
      },
    },
  },
})

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles?.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        {/* <Layout Component={() => <Component {...pageProps} />} /> */}
      </ThemeProvider>
    </>
  )
}

export default MyApp
