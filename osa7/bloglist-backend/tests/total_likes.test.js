const listHelper = require('../utils/list_helper')
const data = require('./test_data')

describe('total likes', () => {


  test('of empty list is zero', () => {
    const result = listHelper.totalLikes(data.emptyList)
    expect(result).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(data.listWithOneBlog)
    expect(result).toBe(5)
  })


  test('of a bigger list is calculate right', () => {
    const result = listHelper.totalLikes(data.wholeListOfblogs)
    expect(result).toBe(36)
  })
})