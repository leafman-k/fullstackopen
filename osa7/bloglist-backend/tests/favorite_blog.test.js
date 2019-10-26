const listHelper = require('../utils/list_helper')
const data = require('./test_data')

describe('favorite blog', () => {

  test('empty list', () => {
    const result = listHelper.favoriteBlog(data.emptyList)
    expect(result.title).toEqual('Empty list, no favorites')
  })

  test('when list has only one blog', () => {
    const result = listHelper.favoriteBlog(data.listWithOneBlog)
    expect(result.title).toEqual('Go To Statement Considered Harmful')
  })

  test('when list have more than one item', () => {
    const result = listHelper.favoriteBlog(data.wholeListOfblogs)
    expect(result.title).toEqual('Canonical string reduction')
  })

})