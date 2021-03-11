import ajax from '../utils/ajax'
import md5 from 'md5'
export function postQueryLogin (data) {
  const copydata = JSON.parse(JSON.stringify(data))
  // console.log(copydata.passwordConfirm)
  copydata.password = md5(copydata.password)
  // copydata.passwordConfirm = md5(copydata.passwordConfirm)
  return ajax.post('/login', copydata)
}
export function postQueryUser (data) {
  return ajax.post('/userinfo/findUserInfo', data)
}
