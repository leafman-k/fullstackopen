const listHelper = require('../utils/list_helper')
const data = require('./test_data')

test('dummy returns one', () => {

  const result = listHelper.dummy(data.emptyList)
  expect(result).toBe(0)
})
