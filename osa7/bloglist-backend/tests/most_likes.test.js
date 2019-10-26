const listHelper = require('../utils/list_helper')
const data = require('./test_data')

describe('most likes', () => {

  test('when get author with most likes, empty list', () => {
    const result = listHelper.mostLikes(data.emptyList)
    expect(result.likes).toBe(0)
  })

  test('when get author with most likes, full list', () => {
    const result = listHelper.mostLikes(data.wholeListOfblogs)
    expect(result.likes).toBe(17)
  })

})