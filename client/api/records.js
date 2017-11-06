import { apiGet, apiPost, apiDelete } from './http'

export function all () {
  return apiGet('/records')
}

export function del (id) {
  return apiDelete(`/records/${id}`)
}

export function add (params) {
  return apiPost('/records', params)
}
