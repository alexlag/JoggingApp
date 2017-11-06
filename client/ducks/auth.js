import * as API from '../api/auth'

import { setToken, fullClearToken } from './token'

export function signin (email, password) {
  return dispatch =>
    API.signin(email, password)
      .then(result => dispatch(setToken(result.token)))
}

export function signout () {
  return fullClearToken()
}
