import ajax from '../utils/ajax'
export function postQueryZKInfo (data) {
  return ajax.post('/policyinfo/queryZKInfo', data)
}
export function postQueryZKInfoitem (data) {
    return ajax.post('/policyinfo/findZKInfo', data)
  }
export function postFindZKFCInfo (data) {
  return ajax.post('/policyinfo/findZKFCInfo', data)
}
