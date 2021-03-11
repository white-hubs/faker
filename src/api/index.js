import ajax from '../utils/ajax'
export function postQueryInitData () {
  return ajax.post('/indexinfo/queryInitData')
}
