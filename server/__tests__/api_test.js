const request = require('supertest')
const app = require('../api/index.js')

const User = require('../models/user').default

let token = null
let recordId = null

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

const record = {
  date: new Date(),
  distance: 1000,
  time: 600
}

beforeAll(() => User.remove({}))

describe('Users API', () => {
  test('does not create user without email', async () => {
    const response = await request(app).post('/users/signup').send(user)
    expect(response.statusCode).toBe(400)
    expect(response.body.error).toBe(true)
  })

  test('does not create user with mismatching password', async () => {
    const response = await request(app).post('/users/signup').send({ ...user, password: 'none', email: 'test@foo.bar' })
    expect(response.statusCode).toBe(400)
    expect(response.body.error).toBe(true)
  })

  test('creates correct user', async () => {
    const response = await request(app).post('/users/signup').send(correctUser)
    expect(response.statusCode).toBe(200)
  })

  test('authorizes user correctly', async () => {
    const response = await request(app).post('/users/signin').send(correctUser)
    token = response.body.token
    expect(response.statusCode).toBe(200)
  })
})

describe('Records API', () => {
  test('should not allow anauth', async () => {
    const response = await request(app).get('/records')
    expect(response.statusCode).toBe(401)
  })

  test('shows list', async () => {
    const response = await request(app).get('/records').set('Authorization', `BEARER ${token}`)
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual([])
  })

  test('creates new record', async () => {
    const response = await request(app)
      .post('/records')
      .send(record)
      .set('Authorization', `BEARER ${token}`)
    expect(response.statusCode).toBe(200)
  })

  test('creates duplicate record', async () => {
    const response = await request(app)
      .post('/records')
      .send(record)
      .set('Authorization', `BEARER ${token}`)
    expect(response.statusCode).toBe(200)
  })

  test('gets record', async () => {
    let response = await request(app)
      .get('/records')
      .set('Authorization', `BEARER ${token}`)
    expect(response.statusCode).toBe(200)
    const records = response.body

    recordId = records[0]._id

    response = await request(app)
      .get(`/records/${recordId}`)
      .set('Authorization', `BEARER ${token}`)
    expect(response.statusCode).toBe(200)
    expect(response.body._id).toBe(recordId)
    expect(response.body.distance).toBe(record.distance)
    expect(response.body.time).toBe(record.time)
  })

  test('updates record', async () => {
    let response = await request(app)
      .put(`/records/${recordId}`)
      .send({ distance: 10000 })
      .set('Authorization', `BEARER ${token}`)
    expect(response.statusCode).toBe(200)

    response = await request(app)
      .get(`/records/${recordId}`)
      .set('Authorization', `BEARER ${token}`)
    expect(response.statusCode).toBe(200)
    expect(response.body._id).toBe(recordId)
    expect(response.body.distance).toBe(10000)
    expect(response.body.time).toBe(record.time)
  })

  test('deletes record', async () => {
    let response = await request(app)
      .delete(`/records/${recordId}`)
      .set('Authorization', `BEARER ${token}`)
    expect(response.statusCode).toBe(200)

    response = await request(app)
      .get(`/records/${recordId}`)
      .set('Authorization', `BEARER ${token}`)
    expect(response.statusCode).toBe(404)
  })
})
