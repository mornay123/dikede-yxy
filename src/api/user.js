import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api/user-service/user/login',
    method: 'POST',
    data
  })
}
export function getImageCode(random) {
  return request({
    url: `/api/user-service/user/imageCode/${random}`,
    method: 'GET'
  })
}
export function getInfo(token) {
}

export function logout() {
}
