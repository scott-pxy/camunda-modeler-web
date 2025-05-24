import React, { useState } from 'react';
import { Button, Card } from 'antd';
import { useNavigate } from 'react-router-dom';

const BpmnCRUDPage = () => {
  const navigate = useNavigate();

  const handleCreate = () => {
    // 生成唯一路径标识
    const uniquePath = `/bpmn/editor?ts=${Date.now()}`;
    navigate(uniquePath);
  };

  return (
    <Card
      title="流程管理"
      extra={<Button type="primary" onClick={handleCreate}>新建流程</Button>}
    >
    </Card>
  );
};

export default BpmnCRUDPage;