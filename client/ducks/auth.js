import * as Users from '../api/users'

import { setToken, fullClearToken } from './token'

export function signin (email, password) {
  return dispatch =>
    Users.signin(email, password)
      .then(result => dispatch(setToken(result.token)))
}

export function signout () {
  return fullClearToken()
}

export function signup (params) {
  return dispatch => Users.signup(params)
    .then(() => {
      const { email, password } = params

      dispatch(signin(email, password))
    })
}
