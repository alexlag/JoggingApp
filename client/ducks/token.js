import * as Storage from '../api/localStorage'

const SET_JWT_TOKEN = '@App/SET_JWT_TOKEN'
const CLEAR_JWT_TOKEN = '@App/CLEAR_JWT_TOKEN'

export function initToken () {
  return dispatch => {
    dispatch(setToken(Storage.getToken()))
  }
}

export function fullClearToken () {
  return dispatch => {
    Storage.clearToken()
    dispatch(clearToken())
  }
}

export function setToken (payload) {
  return { type: SET_JWT_TOKEN, payload }
}

export function clearToken () {
  return { type: CLEAR_JWT_TOKEN }
}

const initial = null

export default (state = initial, { type, payload }) => {
  switch (type) {
    case SET_JWT_TOKEN:
      return payload || initial
    case CLEAR_JWT_TOKEN:
      return initial
    default:
      return state
  }
}
