import { useEffect } from 'react';
import { Tabs } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTabs, } from '../context/TabsContext';

const TabNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { tabs, addTab, activeKey, removeTab, setActiveKey } = useTabs();

  useEffect(() => {
    const currentKey = location.pathname + location.search;
    const existTab = tabs.find(tab => tab.key === currentKey);
    
    // 自动添加缺失的页签
    if (!existTab && currentKey !== '/') {
      addTab({
        key: currentKey,
        label: currentKey.includes('editor') ? '流程图' : '未命名'
      });
    }
  }, [location]);

  const onChange = (key) => {
    // navigate(key);
    const targetTab = tabs.find(t => t.key === key);
    if (!targetTab) return;

    // 同步更新顺序：先状态后路由
    setActiveKey(key);
    navigate(key);
  };

  const onEdit = (targetKey, action) => {
    if (action === 'remove') {
      // 获取当前完整路径（包含查询参数）
      // const currentPath = location.pathname + location.search;
      
      removeTab(targetKey);

      // 如果关闭的是当前活动页签
      // if (targetKey === currentPath) {
      if (targetKey === activeKey) {
        const remainingTabs = tabs.filter(t => t.key !== targetKey);
        const newPath = remainingTabs.length > 0 
          ? remainingTabs[remainingTabs.length - 1].key 
          : '/';
        
        // 强制路由跳转（使用replace防止回退）
        navigate(newPath, { replace: true });
      }
    }
  };

  return (
    <Tabs
      type="editable-card"
      hideAdd
      onChange={onChange}
      activeKey={activeKey || ''}
      onEdit={onEdit}
      items={tabs.map(tab => ({
        key: tab.key,
        label: tab.label,
        closable: tab.closable !== false
      }))}
      tabBarStyle={{
        overflowX: 'auto',
        whiteSpace: 'nowrap',
      }}
    />
  );
};

export default TabNavigation;