import ajax from '../utils/ajax'
export function postQueryinformation (data) {
  return ajax.post('/infomanage/findBasicInfo', data)
}
export function postQueryUpdata (data) {
  return ajax.post('/infomanage/updateBasicInfo', data)
}
