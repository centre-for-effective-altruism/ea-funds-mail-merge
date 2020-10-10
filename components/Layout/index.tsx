import HeadTags from './HeadTags'
import Nav from './Nav'

const Layout: React.FC = ({ children }) => (
  <>
    <HeadTags />
    <Nav />
    {children}
  </>
)

export default Layout
