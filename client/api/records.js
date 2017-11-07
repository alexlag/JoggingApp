import { apiGet, apiPost, apiPut, apiDelete } from './http'

export function all () {
  return apiGet('/records')
}

export function del (id) {
  return apiDelete(`/records/${id}`)
}

export function add (params) {
  return apiPost('/records', params)
}

export function edit (id, params) {
  return apiPut(`/records/${id}`, params)
}
