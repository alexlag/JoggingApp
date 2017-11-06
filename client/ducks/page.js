const SELECT_PAGE = '@app/SELECT_PAGE'

export function goToRecords () {
  return { type: SELECT_PAGE, payload: 'records' }
}

export function goToReports () {
  return { type: SELECT_PAGE, payload: 'reports' }
}

export default (state = 'records', { type, payload }) => {
  switch (type) {
    case SELECT_PAGE:
      return payload
    default:
      return state
  }
}
