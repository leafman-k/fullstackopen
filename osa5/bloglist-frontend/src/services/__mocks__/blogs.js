const blogs = [
  {
    'likes': 9,
    'title': 'Hold back river',
    'author': 'James Bay',
    'url': 'www.james.com',
    'user': {
      'username': 'muumipei',
      'name': 'Muumi Peikko',
      'id': '5d501b5b29b5a87161ecca25'
    },
    'id': '5d5031acf46c5794ac38e056'
  },
  {
    'likes': 5,
    'title': 'Another Love',
    'author': 'Tom Odell',
    'url': 'www.odell.com',
    'user': {
      'username': 'muumipei',
      'name': 'Muumi Peikko',
      'id': '5d501b5b29b5a87161ecca25'
    },
    'id': '5d503a35e2f9b3a1ed233548'
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll }