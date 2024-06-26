import service from './fetch'

export const getMapList = (data?: any) => {
  return service.get('/getMapList', data)
}
export const register = (data?: any) => {
  return service.post('/register', data)
}
export const addMapApi = (data?: any) => {
  return service.post('/addMap', data)
}
export const addMapRecord = (data?: any) => {
  return service.post('/addMapRecord', data)
}
export const getMapRecordList = (data?: any) => {
  return service.post('/getMapRecordList', data)
}
export const login = (data?: any) => {
  return service.post('/login', data)
}

export const findInfo = (data?: any) => {
  return service.post('/findInfo', data)
}
export const updateInfo = (data?: any) => {
  return service.post('/updateInfo', data)
}


export const getUsers = (data?: any) => {
  return service.post('/getUsers', data)
}


