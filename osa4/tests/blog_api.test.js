const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.remove({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('notes are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two notes', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body.length).toBe(2)
})

test('id is properly formatted', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('a valid blog can be added ', async () => {
  const newBlog = {
    title: 'Continuous learning',
    author: 'Anonymous',
    url: 'https://continuouslearning.com/',
    likes: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)


  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(n => n.title)
  expect(titles).toContain(
    'Continuous learning'
  )
})

test('default value 0 is added to likes attribute', async () => {
  const newBlog = {
    title: 'Continuous improving',
    author: 'Anonymous',
    url: 'https://continuousimproving.com/'
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const likes = response.body.likes
  expect(likes).toBe(0)
})

test('Bad request response when title or url are missing', async () => {
  const newBlog = {
    author: 'Anonymous'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})
afterAll(() => {
  mongoose.connection.close()
})