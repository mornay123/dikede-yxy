import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user-service/user/login',
    method: 'POST',
    data
  })
}
export function getImageCode(random) {
  return request({
    url: `/user-service/user/imageCode/${random}`,
    method: 'GET'
  })
}
export function getInfo(token) {
}

export function logout() {
}
