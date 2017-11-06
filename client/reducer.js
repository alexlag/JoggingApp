import { combineReducers } from 'redux'

import token from './ducks/token'
import page from './ducks/page'

export default combineReducers({
  token, page
})
