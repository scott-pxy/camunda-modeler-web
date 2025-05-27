import { useEffect } from 'react';
import { createContext, useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';


const TabsContext = createContext();

export function TabsProvider({ children }) {
  const [tabs, setTabs] = useState(() => {
    // 初始化时从 localStorage 读取
    const savedTabs = localStorage.getItem('tabs');
    return savedTabs ? JSON.parse(savedTabs) : [];
  });
  const [activeKey, setActiveKey] = useState(() => {
    return localStorage.getItem('activeKey') || '';
  });
  const location = useLocation();

  // 持久化状态到localStorage
  useEffect(() => {
    localStorage.setItem('tabs', JSON.stringify(tabs));
    localStorage.setItem('activeKey', activeKey);
  }, [tabs, activeKey]);

  // 自动增加页签
  useEffect(() => {
    const currentKey = location.pathname + location.search;
    const existTab = tabs.find(tab => tab.key === currentKey);
    
    if (!existTab && currentKey !== '/') {
      addTab({
        key: currentKey,
        label: getTabLabel(currentKey),
        closable: true
      });
    }

    setActiveKey(currentKey); // <--- 关键：同步 activeKey
  }, [location]);

  const getTabLabel = (path) => {
    if (path.includes('editor')) return '流程图';
    if (path.includes('manage')) return '管理页';
    return '未命名';
  };

  const addTab = (newTab) => {
    setTabs(prev => {
      const exists = prev.find(t => t.key === newTab.key);
      return exists ? prev : [...prev, newTab];
    });
    setActiveKey(newTab.key);
  };

  const updateTab = (targetKey, newProps) => {
    setTabs(prev => prev.map(tab => 
      tab.key === targetKey ? { ...tab, ...newProps } : tab
    ));
  };

  const removeTab = (targetKey) => {
    setTabs(prev => {
      const newTabs = prev.filter(tab => tab.key !== targetKey);
      
      // 自动更新活动标签
      if (targetKey === activeKey) {
        const newActiveKey = newTabs.length > 0 
          ? newTabs[newTabs.length - 1].key 
          : '/';
        setActiveKey(newActiveKey);
      }
      
      return newTabs;
    });
  };


  return (
    <TabsContext.Provider value={{ tabs, activeKey, addTab, removeTab, updateTab,setActiveKey }}>
      {children}
    </TabsContext.Provider>
  );
}

export const useTabs = () => useContext(TabsContext);