import storage from 'store'
import request from 'superagent'

const JWT_TOKEN = 'jwtToken'

export function getToken () {
  return storage.get(JWT_TOKEN)
}

export function setToken (token) {
  storage.set(JWT_TOKEN, token)
}

export function clearToken () {
  storage.remove(JWT_TOKEN)
}

export function signin (email, password) {
  return request
    .post('/api/users/signin')
    .send({ email, password })
    .then(response => response.body)
    .then(data => {
      data && setToken(data.token)

      return data
    })
}
