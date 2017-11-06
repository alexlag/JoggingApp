import { apiPost } from './http'

import { setToken } from './localStorage'

export function signin (email, password) {
  return apiPost('/users/signin', { email, password })
    .then(data => {
      data && setToken(data.token)

      return data
    })
}

export function signup (params) {
  return apiPost('/users/signup', params)
}
