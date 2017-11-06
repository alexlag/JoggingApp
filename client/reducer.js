import { combineReducers } from 'redux'

import token from './ducks/token'
import page from './ducks/page'
import records from './ducks/records'

export default combineReducers({
  token, page, records
})
