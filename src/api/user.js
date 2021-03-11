import ajax from '../utils/ajax'
import md5 from 'md5'
export function postQueryUserList (data) {
  return ajax.post('/usernamange/queryUserInfo', data)
}
export function postSaveUserList (data) {
  const copydata = JSON.parse(JSON.stringify(data))
  // console.log(copydata.passwordConfirm)
  copydata.password = md5(copydata.password)
  copydata.passwordConfirm = md5(copydata.passwordConfirm)
  return ajax.post('/usernamange/saveUserInfo', copydata)
}
export function postUpdataUserList (data) {
  const copydata = JSON.parse(JSON.stringify(data))
  // console.log(copydata.passwordConfirm)
  if (data.password || data.passwordConfirm) {
  copydata.password = md5(copydata.password)
  copydata.passwordConfirm = md5(copydata.passwordConfirm)
  return ajax.post('/usernamange/updateUserInfo', copydata)
  } else {
    return ajax.post('/usernamange/updateUserInfo', data)
  }
}
export function postQueryUserinfo (data) {
  return ajax.post('/usernamange/findUserInfo', data)
}
export function postQueryDelete (data) {
  return ajax.post('/usernamange/deleteUserInfo', data)
}
