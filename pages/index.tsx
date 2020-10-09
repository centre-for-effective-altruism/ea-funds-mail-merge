import Page from 'components/Page'

const Home: React.FC = () => {
  return (
    <Page pageTitle={process.env.NEXT_PUBLIC_SITE_TITLE}>
      <p>Home page</p>
    </Page>
  )
}

export default Home
