import React, { useEffect, useState, useRef } from 'react';
import BpmnModeler from 'camunda-bpmn-js/lib/camunda-platform/Modeler';
import { processAPI } from '../services/bpmnProcessApi'
import { Button,message,} from 'antd';
import { SaveOutlined } from '@ant-design/icons';

import {
  BpmnPropertiesPanelModule,
  BpmnPropertiesProviderModule,
  CamundaPlatformPropertiesProviderModule
} from 'bpmn-js-properties-panel';

import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda.json';

const BpmnEditor = () => {

  const [xml, setXml] = useState('');
  const modelerRef = useRef(null);

  useEffect(() => {
    const modeler = new BpmnModeler({
      container: '#js-canvas',
      propertiesPanel: {
        parent: '#js-properties-panel'
      },
      additionalModules: [
        BpmnPropertiesPanelModule,
        BpmnPropertiesProviderModule,
        CamundaPlatformPropertiesProviderModule
      ],
      moddleExtensions: {
        camunda: camundaModdleDescriptor
      }
    });

    modelerRef.current = modeler; // 存到引用中


    const initialDiagram = `<?xml version="1.0" encoding="UTF-8"?>
    <bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL"
                      xmlns:camunda="http://camunda.org/schema/1.0/bpmn"
                      xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
                      xmlns:dc="http://www.omg.org/spec/DD/20100524/DC"
                      id="Definitions_1"
                      targetNamespace="http://bpmn.io/schema/bpmn">
      <bpmn:process id="Process_1" isExecutable="true">
        <bpmn:startEvent id="StartEvent_1"/>
      </bpmn:process>
      <bpmndi:BPMNDiagram id="BPMNDiagram_1">
        <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
          <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">
            <dc:Bounds x="173" y="102" width="36" height="36"/>
          </bpmndi:BPMNShape>
        </bpmndi:BPMNPlane>
      </bpmndi:BPMNDiagram>
    </bpmn:definitions>`;

    modeler.importXML(initialDiagram).catch((err) => {
      console.error('Failed to import diagram:', err);
    });

    // return () => {
    //   modeler.destroy();
    // };
    return () => {
      // 确保组件卸载时销毁实例
      modeler.destroy();
      const canvas = document.getElementById('js-canvas');
      if (canvas) canvas.innerHTML = '';
    };
  }, []);

  const handleSave = async () => {
    // localStorage.setItem('bpmn_draft', xml);
    // message.success('已保存到本地');
    try {
      const { xml } = await modelerRef.current.saveXML({ format: true });

      // 构建发送给后端的数据
      const payload = {
        id: 1, // 创建时可不传或由后端生成
        name: '示例流程',
        category: '默认分类',
        systemId: 'system-001',
        systemName: '审批系统',
        version: 1,
        createdBy: 'admin', // 或从登录信息中获取
        createdAt: new Date(),
        lastUpdated: new Date(),
        isDeployed: 0,
        bpmnContent: xml
      };

      await processAPI.create(payload);
      message.success('保存成功');
    } catch (err) {
      console.error('保存失败:', err);
      message.error('保存失败');
    }
  };


  return (
  <div style={{ 
    display: 'flex',
    flexDirection: 'column',
    height: '100vh', // 必须设置外层高度
    overflow: 'hidden' // 防止滚动条
  }}>
    {/* 顶部工具栏 */}
    <div style={{
      padding: '12px 24px',
      background: '#fff',
      borderBottom: '1px solid #e8e8e8',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      zIndex: 1000,
      flexShrink: 0 // 固定高度
    }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
        <Button type="primary" onClick={handleSave}>保存</Button>
        <Button>导出</Button>
        <Button>预览</Button>
      </div>
    </div>

    {/* 主内容区 */}
    <div style={{
      flex: 1,
      display: 'flex',
      position: 'relative',
      background: '#fafafa' // 添加备用背景色
    }}>
      {/* 画布容器 */}
      <div 
        id="js-canvas"
        style={{ 
          flex: 1,
          height: '100%',
          minWidth: 600,
          background: '#fff' // 强制白色背景
        }}
      />

      {/* 属性面板 */}
      <div 
        id="js-properties-panel"
        style={{ 
          width: 300,
          height: '100%',
          borderLeft: '1px solid #e8e8e8',
          background: '#fff',
          overflow: 'auto'
        }}
      />
    </div>
  </div>
);
};

export default BpmnEditor;