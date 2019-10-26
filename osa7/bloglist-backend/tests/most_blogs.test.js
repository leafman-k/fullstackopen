const listHelper = require('../utils/list_helper')
const data = require('./test_data')

describe('most blogs', () => {

  test('when most active writer empty list', () => {
    const result = listHelper.mostBlogs(data.emptyList)
    expect(result.blogs).toBe(0)
  })


  test('when most active writer full list', () => {
    const result = listHelper.mostBlogs(data.wholeListOfblogs)
    expect(result.blogs).toEqual(3)
  })

})