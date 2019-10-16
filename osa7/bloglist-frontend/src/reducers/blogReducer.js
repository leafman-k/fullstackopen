import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch(action.type){
    case 'LIKE':
      const id = action.data.id
      return state.map(blog =>
          blog.id !== id ? blog : action.data
      ).sort((a, b) => (a.likes > b.likes) ? -1 : 1)
    case 'NEW_BLOG':
      return state.concat(action.data)
    case 'INIT_BLOGS':
      return action.data
    case 'REMOVE_BLOG':
      const removedId = action.data.id
      return state.filter(blog =>
          blog.id !== removedId)
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


export default blogReducer