import ajax from '../utils/ajax'
export function postQuerySensorList (data) {
  return ajax.post('/sensormanage/querySensorInfo', data)
}
export function postFindSensorList (data) {
  return ajax.post('/sensormanage/findSensorInfo', data)
}
export function postSaveSensorList (data) {
  return ajax.post('/sensormanage/saveSensorInfo', data)
}
export function postUpdataSensorList (data) {
  return ajax.post('/sensormanage/updateSensorInfo', data)
}
export function postDeleteSensorList (data) {
  return ajax.post('/sensormanage/deleteSensorInfo', data)
}
export function postSwitchSensorList (data) {
  return ajax.post('/sensormanage/switchSensorInfo', data)
}
