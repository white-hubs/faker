import ajax from '../utils/ajax'
export function postQueryCameraList (data) {
  return ajax.post('/cameramanage/queryCameraInfo', data)
}
export function postSaveCameraList (data) {
  return ajax.post('/cameramanage/saveCameraInfo', data)
}
export function postFindCameraList (data) {
  return ajax.post('/cameramanage/findCameraInfo', data)
}
export function postUpdataCameraList (data) {
  return ajax.post('/cameramanage/updateCameraInfo', data)
}
export function postDeleteCameraList (data) {
  return ajax.post('/cameramanage/deleteCameraInfo', data)
}
export function postSwitchCameraList (data) {
  return ajax.post('/cameramanage/switchCameraInfo', data)
}
