import ajax from '../utils/ajax'
export function postQueryLogsList (data) {
  return ajax.post('/logaudit/queryLogAuditInfo', data)
}
