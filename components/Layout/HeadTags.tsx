import Head from 'next/head'

const HeadTags: React.FC = () => (
  <Head>
    <title>{process.env.NEXT_PUBLIC_SITE_TITLE}</title>
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      href="https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,400;0,700;1,400;1,700&family=Raleway:wght@700&display=swap"
      rel="stylesheet"
    />
  </Head>
)

export default HeadTags
