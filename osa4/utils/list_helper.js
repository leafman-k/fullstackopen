const _ = require('lodash')


const dummy = (blogs) => {
  return blogs.length
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }
  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0)

}
const favoriteBlog = (blogs) => {

  if(blogs.length === 0){
    return { title: 'Empty list, no favorites' }
  }

  const max = blogs.reduce(function(prev, current) {
    return (prev.likes > current.likes) ? prev : current
  })

  return {
    title: max.title,
    author: max.author,
    likes: max.likes
  }

}
const mostBlogs = (blogs) => {

  if(blogs.length === 0){
    return { author: 'Empty list', blogs: 0 }
  }


  let result = _(blogs)
    .countBy('author')
    .map((key, value) => ({
      author: value,
      blogs: key
    }))
    .maxBy('blogs')

  console.log('Most Blogs', result)

  return result
}
const mostLikes = (blogs) => {

  if(blogs.length === 0){
    return { author: 'Empty list', likes: 0 }
  }

  let result = _(blogs)
    .groupBy('author')
    .map((blog ,id) => ({
      author: id,
      likes: _.sumBy(blog, 'likes')
    }))
    .maxBy('likes')

  console.log('Most likes', result)
  return result
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}