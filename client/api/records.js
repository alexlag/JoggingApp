import { apiGet, apiDelete } from './http'

export function all () {
  return apiGet('/records')
}

export function del (id) {
  return apiDelete(`/records/${id}`)
}
