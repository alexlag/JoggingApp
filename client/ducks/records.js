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

export function addRecord (params) {
  return dispatch => {
    Records.add(params)
      .then(fetchRecords)
      .then(dispatch)
  }
}

export function deleteRecord (id) {
  return dispatch => {
    Records.del(id)
      .then(fetchRecords)
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
      return payload.map(params => new Record(params)).sort((a, b) => a.date - b.date)
    default:
      return state
  }
}
