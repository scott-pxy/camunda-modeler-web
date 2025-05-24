// src/pages/BpmnEditorPage.js
import React, { useEffect, useState } from 'react';
import { useTabs } from '../context/TabsContext';
import { useNavigate, useLocation } from 'react-router-dom';
import BpmnEditor from '../components/BpmnEditor';
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css';
import '@bpmn-io/properties-panel/dist/assets/properties-panel.css';

const BpmnEditorPage = () => {
  const { addTab } = useTabs();
  const location = useLocation();

  useEffect(() => {
    addTab({
      key: location.pathname + location.search, // 使用完整路径作为key
      label: 'Editor'
    });
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <BpmnEditor/>
    </div>
  );
};

export default BpmnEditorPage;