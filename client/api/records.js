import { apiGet } from './http'

export function all () {
  return apiGet('/records')
}
