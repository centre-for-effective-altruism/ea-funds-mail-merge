import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import Divider from '@material-ui/core/Divider'
import Head from 'next/head'

type PageProps = {
  pageTitle: string
  title?: string
}

const Page: React.FC<PageProps> = ({ children, pageTitle, title }) => {
  const titleTag = title || pageTitle
  return (
    <>
      <Head>
        <title>{titleTag}</title>
      </Head>
      <Container fixed>
        <Typography variant="h2" component="h1">
          {pageTitle}
        </Typography>
        <Box marginTop={4} marginBottom={4}>
          <Divider />
        </Box>
        {children}
      </Container>
    </>
  )
}

export default Page
