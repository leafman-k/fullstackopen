import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  const id = action.data.id
  switch (action.type) {
  case 'LIKE':
    return state.map(blog =>
      blog.id !== id ? blog : action.data
    ).sort((a, b) => (a.likes > b.likes) ? -1 : 1)
  case 'NEW_BLOG':
    return state.concat(action.data)
  case 'INIT_BLOGS':
    return action.data
  case 'REMOVE_BLOG':
    return state.filter(blog =>
      blog.id !== id)
  case 'NEW_COMMENT':
    return state.map(blog => {
      if (blog.id !== id) {
        return blog
      } else {
        const newComments = blog.comments.concat(action.data)
        const updatedBlog = { ...blog, comments: newComments }
        return updatedBlog
      }
    }
    )

  default:
    return state
  }
}

export const getAllBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}
export const likeBlog = (id, blog) => {

  return async dispatch => {
    const response = await blogService.likeBlog(id, blog)
    dispatch({
      type: 'LIKE',
      data: response
    })
  }
}
export const addBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.addBlog(blog)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog,
    })
  }
}
export const commentBlog = (id, comment) => {

  return async dispatch => {
    const response = await blogService.commentBlog(id, comment)
    dispatch({
      type: 'NEW_COMMENT',
      data: response
    })
  }
}
export const removeBlog = (id) => {

  return async dispatch => {
    await blogService.removeBlog(id)
    dispatch({
      type: 'REMOVE_BLOG',
      data: { id: id }
    })
  }
}
export default blogReducer