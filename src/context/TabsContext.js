import { createContext, useContext, useState } from 'react';

const TabsContext = createContext();

export function TabsProvider({ children }) {
  const [tabs, setTabs] = useState([]);
  const [activeKey, setActiveKey] = useState('');

  const addTab = (newTab) => {
    setTabs(prev => {
      const exists = prev.find(t => t.key === newTab.key);
      return exists ? prev : [...prev, newTab];
    });
    setActiveKey(newTab.key);
  };

  const removeTab = (targetKey) => {
    const newTabs = tabs.filter(tab => tab.key !== targetKey);
    setTabs(newTabs);
    if (targetKey === activeKey && newTabs.length > 0) {
      setActiveKey(newTabs[newTabs.length - 1].key);
    }
  };

  return (
    <TabsContext.Provider value={{ tabs, activeKey, addTab, removeTab }}>
      {children}
    </TabsContext.Provider>
  );
}

export const useTabs = () => useContext(TabsContext);