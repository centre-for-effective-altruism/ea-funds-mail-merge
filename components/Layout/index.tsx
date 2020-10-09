import HeadTags from './HeadTags'

const Layout: React.FC = ({ children }) => (
  <>
    <HeadTags />
    {children}
  </>
)

export default Layout
