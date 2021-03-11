import ajax from '../utils/ajax'
export function postQueryCLQDInfo (data) {
  return ajax.post('/policyinfo/queryCLQDInfo', data)
}
