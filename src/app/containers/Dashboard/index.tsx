import { useDispatch } from 'react-redux';
import { selectHeight } from 'settings/slice';

export default function Dashboard() {
  const dispatch = useDispatch();
  const appHeight = useSelector(selectHeight);
  const { width, height } = useWindowSize();

  React.useEffect(() => {
    dispatch(toggleAll(width, height));
  }, [width, height, dispatch]);
  return (
    <DashboardContainer>
      <DashboardGlobalStyles />
      <Layout style={{ height: height }}>
        <Topbar />
        <Layout style={styles.layout}>
          <Sidebar />
          <Layout
            className="isoContentMainLayout"
            style={{
              height: appHeight,
            }}
          >
            <Content className="isomorphicContent" style={styles.content}>
              <DashboardRoutes />
            </Content>
            <Footer style={styles.footer}>{siteConfig.footerText}</Footer>
          </Layout>
        </Layout>
        <ThemeSwitcher />
      </Layout>
    </DashboardContainer>
  );
}
