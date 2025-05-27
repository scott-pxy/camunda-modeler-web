import React, { useState, useEffect } from 'react';
import { Button, Card, Table, Select,Input,Form, Row, Col, Spin, message, Divider } from 'antd';
import { useNavigate } from 'react-router-dom';
import { processAPI } from '../../services/bpmnProcessApi'

const { Option } = Select;

const BpmnCRUDPage = () => {
  const navigate = useNavigate();
  const [queryForm] = Form.useForm();
  const [processesData, setProcessesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  });

  const fetchData = async (params = {}) => {
    try {
      setLoading(true);
      const { 
        // current, 
        // pageSize,
         ...queryParams } = params;
      const response = await processAPI.getList({
        // pageNum: current || pagination.current,
        // pageSize: pageSize || pagination.pageSize,
        ...queryParams
      });

      console.log(response)
      
      setProcessesData(response || []);
      // setPagination({
      //   ...pagination,
      //   total: response.data.total || 0
      // });
    } catch (error) {
      // message.error('获取数据失败');
    } finally {
      // setLoading(false);
    }
  };


  // 初始化加载数据
  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate = () => {
    // 生成唯一路径标识
    const uniquePath = `/bpmn/editor?ts=${Date.now()}`;
    navigate(uniquePath);
  };

  const handleDeploy = async ( id ) => {
    const response = await processAPI.deploy({id:id});
  }

  const query = () => {
    console.log(processesData)
  }

  const columns = [
    {
      title: '主键id',
      key: 'id',
      dataIndex: 'id',
      align: 'center',
      width: 60
    },
    {
      title: '流程名称',
      key: 'name',
      dataIndex: 'name',
      align: 'center',
      width: 90
    },
    {
      title: '流程分类',
      key: 'category',
      dataIndex: 'category',
      align: 'center',
      width: 90
    },
    {
      title: '系统名称',
      key: 'systemName',
      dataIndex: 'systemName',
      align: 'center',
      width: 90
    },
    {
      title: '流程版本',
      key: 'version',
      dataIndex: 'version',
      align: 'center',
      width: 60
    },
    {
      title: '是否部署',
      key: 'isDeployed',
      dataIndex: 'isDeployed',
      align: 'center',
      width: 60
    },
    {
      title: '创建人',
      key: 'createdBy',
      dataIndex: 'createdBy',
      align: 'center',
      width: 60
    },
    {
      title: '创建时间',
      key: 'createdAt',
      dataIndex:'createdAt',
      align: 'center',
      width: 90
    },
    {
      title: '最后更新时间',
      key: 'lastUpdated',
      dataIndex:'lastUpdated',
      align: 'center',
      width: 90
    },
    {
      title: '操作',
      fixed:'right',
      align: 'center',
      width: 200,
      render: (text, rec) => {
        return (
          <div>
            <span
              style={{cursor: 'pointer', color: 'blue'}}
              onClick={() => query(rec)}
              role='presentation'
              >
              查看
            </span>
            <Divider type='vertical'/>
            <span
              style={{cursor: 'pointer', color: 'blue'}}
              onClick={() => query(rec)}
              role='presentation'
              >
              修改
            </span>
            <Divider type='vertical'/>
            <span
              style={{cursor: 'pointer', color: 'blue'}}
              onClick={() => handleDeploy(rec.id)}
              role='presentation'
              >
              部署
            </span>
          </div>
        )
      }
    },
  ]

  return (
    <div>
      <Card
        title="流程管理"
        extra={<Button type="primary" onClick={handleCreate}>新建流程</Button>}
      >
        <Form
          name='queryForm'
          wrapperCol={{span: 24}}>
            <Row gutter={16}>

              <Col span={6}>
                <Form.Item label='流程名称' name="name">
                  <Input placeholder="请输入流程名称" />
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item label='是否部署' name="isDeployed">
                  <Select placeholder="请选择部署状态">
                    <Option value="deployed">已部署</Option>
                    <Option value="undeployed">未部署</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col span={12} style={{ textAlign: 'right' }}>
                <Form.Item>
                  <Button type="primary" onClick={query}>查询</Button>
                </Form.Item>
              </Col>
            </Row>
        </Form>
        
      </Card>

      {/* <Spin> */}
        <Table
          locale={{emptyText:'暂无数据'}}
          scroll={{x:1000}}
          scrollX='1500'
          bordered
          dataSource={processesData}
          columns={columns}
        />
      {/* </Spin> */}

    </div>
    
  );
};

export default BpmnCRUDPage;