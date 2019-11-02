/*eslint no-undef:0*/
describe('Blog app e2e testing', function () {
  before(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Nuuska Muikkunen',
      username: 'nuuskamui',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
  })
  describe('Blog login', function () {
    beforeEach(function () {
      cy.visit('http://localhost:3000')

    })

    it('front page can be opened', function () {
      cy.contains('Blogs')
    })

    it('User can navigete to login', function () {
      cy.get('[data-cy-id=loginlink]').click()
      cy.contains('Username')
      cy.contains('password')
    })
    it('User can login', function () {
      cy.get('[data-cy-id=loginlink]').click()
      cy.get('input:first')
          .type('nuuskamui')
      cy.get('input:last')
          .type('salainen')
      cy.contains('login').click()
      cy.contains('blogs created')
      cy.contains('Nuuska Muikkunen logged in')
    })

  })
  describe('Blog add new blog', function () {
    before(function () {
      cy.visit('http://localhost:3000')
      cy.get('[data-cy-id=loginlink]').click()
      cy.get('input:first')
          .type('nuuskamui')
      cy.get('input:last')
          .type('salainen')
      cy.contains('login').click()

    })
    beforeEach(function () {
      cy.wait(1000)
    })
    it('User can open new blog from', function () {
      cy.get('[data-cy-id=bloglink]').click()
      cy.contains('new blog').click()
      cy.contains('Title')
      cy.contains('Author')
      cy.contains('Url')

    })
    it('User can add new blog', function () {
      cy.get('[name=Title]')
          .type('React patterns')
      cy.get('[name=Author]')
          .type('Michael Chan')
      cy.get('[name=Url]')
          .type('https://reactpatterns.com/')
      cy.contains('Add new blog').click()

      cy.contains('React patterns Michael Chan')
    })

    after(function () {
      cy.contains('logout').click()
    })
  })
})