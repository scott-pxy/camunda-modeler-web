import { useEffect } from 'react';
import { createContext, useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';


const TabsContext = createContext();

export function TabsProvider({ children }) {
  const [tabs, setTabs] = useState([]);
  const [activeKey, setActiveKey] = useState('');
  const location = useLocation();

  useEffect(() => {
    const currentKey = location.pathname + location.search;
    const existTab = tabs.find(tab => tab.key === currentKey);
    
    if (!existTab && currentKey !== '/') {
      addTab({
        key: currentKey,
        label: currentKey.includes('editor') ? '流程图' : '未命名'
      });
    }

    setActiveKey(currentKey); // <--- 关键：同步 activeKey
  }, [location]);

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