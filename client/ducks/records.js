import { combineReducers } from 'redux'

import * as Records from '../api/records'
import Record from '../models/Record'

const SET_RECORDS = '@App/SET_RECORDS'
const TOGGLE_SORT = '@App/TOGGLE_SORT'

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

export function editRecord (id, params) {
  return dispatch => {
    Records.edit(id, params)
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

export function toggleSort () {
  return { type: TOGGLE_SORT }
}

const initial = []

function all (state = initial, { type, payload }) {
  switch (type) {
    case SET_RECORDS:
      return payload.map(params => new Record(params))
    default:
      return state
  }
}

function sort (state = 1, { type, payload }) {
  switch (type) {
    case TOGGLE_SORT:
      return -state
    default:
      return state
  }
}

export default combineReducers({
  sort, all
})
