import request from '../utils/request'


export const processAPI = {
  create: (data) => request.post('/bpmnProcess/create', data),
  getList: (params) => request.post('/bpmnProcess/list', { params }),
  getDetail: (id) => request.get(`/bpmnProcess/query${id}`),
  deploy:(id) => request.post('/bpmnProcess/deploy', id)
};