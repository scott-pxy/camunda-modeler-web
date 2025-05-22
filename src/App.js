// import './App.css';
import { Layout } from 'antd';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SideNavigation from './components/SideNavigation';
import { TabsProvider } from './context/TabsContext';
import TabNavigation from './components/TabsNavigation';
import HomePage from './pages/ HomePage';
import PlatformManagePage from './pages/authorityManage/platformManagePage'
import UserRoleManagePage from './pages/authorityManage/userRoleManagePage'
import BpmnHistoryPage from './pages/bpmnProcessManage/bpmnHistoryPage';
import BpmnCRUDPage from './pages/bpmnProcessManage/bpmnCRUDPage'

const { Header, Sider, Content, Footer } = Layout;

function App() {
  return (
    <TabsProvider>
      <Router>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider width={200}>
            <SideNavigation />
          </Sider>
          <Layout>
            <TabNavigation/>
            <Content style={{ padding: '24px' }}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/bpmnProcess/CRUD" element={<BpmnCRUDPage />} />
                <Route path="/bpmnProcess/history" element={<BpmnHistoryPage />} />
                <Route path="/platform/manage" element={<PlatformManagePage />} />
                <Route path="//role/manage" element={<UserRoleManagePage />} />

                {/* 添加更多路由 */}
              </Routes>
            </Content>
          </Layout>
        </Layout>
      </Router>
    </TabsProvider>
    
  );


}

export default App;