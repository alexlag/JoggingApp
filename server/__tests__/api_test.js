const request = require('supertest')
const app = require('../api/index.js')

const User = require('../models/user').default

let token = null

const user = {
  name: 'Test',
  surname: 'Test',
  passwordConfirm: 'test'
}

const correctUser = {
  ...user,
  password: 'test',
  email: 'test@foo.bar'
}

beforeAll(() => User.remove({}))

describe('User API', () => {
  test('It does not create user without email', async () => {
    const response = await request(app).post('/users/signup').send(user)
    expect(response.statusCode).toBe(400)
    expect(response.body.error).toBe(true)
  })

  test('It does not create user with mismatching password', async () => {
    const response = await request(app).post('/users/signup').send({ ...user, password: 'none', email: 'test@foo.bar' })
    expect(response.statusCode).toBe(400)
    expect(response.body.error).toBe(true)
  })

  test('It creates correct user', async () => {
    const response = await request(app).post('/users/signup').send(correctUser)
    expect(response.statusCode).toBe(200)
  })

  test('It authorizes user correctly', async () => {
    const response = await request(app).post('/users/signin').send(correctUser)
    token = response.body.token
    expect(response.statusCode).toBe(200)
  })
})

describe('Records API', () => {
  test('It should not allow anauth', async () => {
    const response = await request(app).get('/records')
    expect(response.statusCode).toBe(401)
  })

  test('It shows list', async () => {
    const response = await request(app).get('/records').set('Authorization', `BEARER ${token}`)
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual([])
  })
})
