const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)
const User = require('../models/user')
const bcrypt = require('bcrypt')

beforeEach(async () => {
  await User.remove({})
  const saltRounds = 10
  for (let user of helper.initialUsers) {
    let userObject = new User()
    userObject.username = user.username
    userObject.name = user.name
    userObject.passwordHash = await bcrypt.hash(user.password, saltRounds)
    await userObject.save()
  }
})
describe('Validate new user', () => {
  test('response status code 400 when password is missing', async () => {
    const newUser = {
      username: 'Anonymous',
      name: ' John Doe'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400, {
        error: 'Password should be at least 3 chars length'
      })
  })
  test('response status code 400 when username is too short', async () => {
    const newUser = {
      username: 'An',
      name: ' John Doe',
      password: 'salainen'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400, {
        error: 'User validation failed: username: Path `username` (`An`) is shorter than the minimum allowed length (3).'
      })
      .expect('Content-Type', /application\/json/)
  })
  test('response status code 400 when username is not unique', async () => {
    const newUser = {
      username: 'muumipap',
      name: ' Muumi Pappa',
      password: 'salainen'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400, {
        error: 'User validation failed: username: Error, expected `username` to be unique. Value: `muumipap`'
      })
  })
})
afterAll(() => {
  mongoose.connection.close()
})