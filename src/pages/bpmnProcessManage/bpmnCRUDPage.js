import React, { useState } from 'react';
import { Button, Card } from 'antd';
import BpmnEditor from '../../components/BpmnEditor';
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css';
import '@bpmn-io/properties-panel/dist/assets/properties-panel.css';

const BpmnCRUDPage = () => {
  const [showEditor, setShowEditor] = useState(false);

  return (
    <div style={{ padding: 24 }}>
      <Card
        title="流程管理"
        extra={
          <Button 
            type="primary"
            onClick={() => setShowEditor(true)}
          >
            新建流程
          </Button>
        }
      >
        {showEditor ? (
          <BpmnEditor />
        ) : (
          <div style={{ textAlign: 'center', padding: 40 }}>
            <p>点击上方按钮开始创建新流程</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default BpmnCRUDPage;