import * as Records from '../api/records'
import Record from '../models/Record'

const SET_RECORDS = '@App/SET_RECORDS'

export function fetchRecords () {
  return dispatch => {
    Records.all()
      .then(setRecords)
      .then(dispatch)
  }
}

export function setRecords (payload) {
  return { type: SET_RECORDS, payload }
}

const initial = []

export default (state = initial, { type, payload }) => {
  switch (type) {
    case SET_RECORDS:
      return payload.map(params => new Record(params))
    default:
      return state
  }
}
