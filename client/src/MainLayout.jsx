import { Layout, Tabs } from 'antd';
import { Link, Outlet } from 'react-router-dom';

const MainLayout = () => {
  const items = [
    {
      key: 'home',
      label: <Link to="/">首页</Link>,
    },
    {
      key: 'categories',
      label: <Link to="/categories">分类</Link>,
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout.Header style={{ background: '#fff', padding: 0 }}>
        <Tabs
          defaultActiveKey="home"
          items={items}
          style={{ marginLeft: 24 }}
        />
      </Layout.Header>
      <Layout.Content style={{ padding: '24px 48px' }}>
        <Outlet />
      </Layout.Content>
    </Layout>
  );
};

export default MainLayout;