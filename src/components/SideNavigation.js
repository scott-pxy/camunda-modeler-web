import React from 'react';
import { Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTabs } from '../context/TabsContext';
import {
  HomeOutlined,
  TeamOutlined,
  FileTextOutlined,
} from '@ant-design/icons';

const navigationItems = [
  {
    key: '/',
    label: '首页',
    icon: <HomeOutlined />,
  },
  {
    key: '/bpmnProcess/manage',
    label: '流程管理',
    icon: <FileTextOutlined />,
    children: [
      {
        key: '/bpmnProcess/CRUD',
        label: '流程创建',
      },
      {
        key: '/bpmnProcess/history',
        label: '流程归档',
      },
    ],
  },
  {
    key: '/authority/manage',
    label: '权限管理',
    icon: <TeamOutlined />,
    children: [
      {
        key: '/platform/manage',
        label: '平台管理',
      },
      {
        key: '/role/manage',
        label: '用户权限管理',
      },
    ],
  },
];

const SideNavigation = () => {
  const { addTab } = useTabs();
  const navigate = useNavigate();
  const location = useLocation();

  const findOpenKeys = () => {
    const paths = location.pathname.split('/').filter(Boolean);
    return ['/' + paths[0]]; // 只保持一级父菜单展开
  };

  const handleMenuClick = ({ key }) => {
    // 如果是编辑器页面需要特殊处理
  if (key.startsWith('/bpmn/editor')) {
    addTab({
      key,
      label: '新流程 (加载中...)'
    });
  }
    // 根据路由配置获取标签名称
    const tabConfig = navigationItems.find(item => 
      item.key === key || item.children?.some(child => child.key === key)
    );
    
    const tabLabel = tabConfig?.children 
      ? `${tabConfig.label} - ${tabConfig.children.find(c => c.key === key)?.label}`
      : tabConfig?.label;

    addTab({
      key,
      label: tabLabel || '未命名标签'
    });
    
    navigate(key);
  };

  return (
    <Menu
      mode="inline"
      selectedKeys={[location.pathname]}
      defaultOpenKeys={findOpenKeys()}
      style={{ height: '100%' }}
      items={navigationItems}
      onClick={handleMenuClick}
    />
  );
};

export default SideNavigation;