import request from 'superagent'

import { getToken } from './localStorage'

const BASE_URL = '/api'

export function apiGet (url) {
  return request
    .get(BASE_URL + url)
    .set('Authorization', `BEARER ${getToken()}`)
    .then(response => response.body)
}

export function apiPost (url, body) {
  return request
    .post(BASE_URL + url)
    .set('Authorization', `BEARER ${getToken()}`)
    .send(body)
    .then(response => response.body)
}

export function apiPut (url, body) {
  return request
    .put(BASE_URL + url)
    .set('Authorization', `BEARER ${getToken()}`)
    .send(body)
    .then(response => response.body)
}

export function apiDelete (url) {
  return request
    .del(BASE_URL + url)
    .set('Authorization', `BEARER ${getToken()}`)
    .then(response => response.body)
}
