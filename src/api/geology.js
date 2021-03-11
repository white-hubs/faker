import ajax from '../utils/ajax'
export function postQueryGeologyList (data) {
  return ajax.post('/geologicalinfo/queryGeologicalInfoTree', data)
}
export function postQueryCameraList (data) {
  return ajax.post('/geologicalinfo/queryCameraInfo', data)
}
export function postQuerySensorList (data) {
  return ajax.post('/geologicalinfo/querySensorInfo', data)
}
export function postQueryZKList (data) {
  return ajax.post('/geologicalinfo/queryZKInfo', data)
}
