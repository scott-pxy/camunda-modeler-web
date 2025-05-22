// src/components/TabsNavigation.js
import { Tabs } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTabs } from '../context/TabsContext';

const TabNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { tabs, activeKey, removeTab } = useTabs();

  const onChange = (key) => {
    navigate(key);
  };

  const onEdit = (targetKey, action) => {
    if (action === 'remove') {
      removeTab(targetKey);
      if (targetKey === location.pathname) {
        const remainingTabs = tabs.filter(t => t.key !== targetKey);
        navigate(remainingTabs[remainingTabs.length - 1]?.key || '/');
      }
    }
  };

  return (
    <Tabs
      type="editable-card"
      hideAdd
      onChange={onChange}
      activeKey={activeKey}
      onEdit={onEdit}
      items={tabs.map(tab => ({
        key: tab.key,
        label: tab.label,
        closable: tab.closable !== false
      }))}
      style={{ 
        margin: '-16px -24px 0',
        padding: '0 24px',
        background: '#fff'
      }}
    />
  );
};

export default TabNavigation;