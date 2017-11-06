import storage from 'store'

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
