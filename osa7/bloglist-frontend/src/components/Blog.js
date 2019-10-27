import React from 'react'

import { connect } from 'react-redux'
import { likeBlog,removeBlog } from '../reducers/blogReducer'
import CommentForm from './CommentForm'

const Blog = ( props ) => {
  if ( props.blog === undefined) {
    return null
  }
  const currentBlog = props.blog
  const blogs = props.blogs

  const likeBlog = async (id) => {
    const blog = blogs.find(blog => blog.id === id)
    const likes = ++blog.likes
    const changedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: likes,
      user: blog.user.id
    }
    props.likeBlog(id, changedBlog)
  }

  const removeBlog = async (id) => {
    const removedBlog = blogs.find(blog => blog.id === id)
    if (window.confirm(`remove blog ${removedBlog.title} by ${removedBlog.author}`)) {
      try {
        await props.removeBlog(id)

      } catch (exception) {
        props.setNotification({ text: exception.response.data.error, type: 'error' })

      }
    }
  }
  const comments = currentBlog.comments.map((comment, index) => {
    console.log('comment', comment)
    return (<li key={index} className="list-group-item">{comment.comment} </li>)
  })
  return (
    <div>
      <h2>{currentBlog.title} {currentBlog.author}</h2>
      <p>{currentBlog.url}</p>
      {currentBlog.likes} likes <button onClick={() => likeBlog(currentBlog.id)} className="btn btn-success btn-sm">like</button>
      <p>Added by {currentBlog.user.name}</p>
      { props.loginUser && props.loginUser.username === currentBlog.user.username &&
        <button onClick={() => removeBlog(currentBlog.id)} className="btn btn-danger top-buffer">Remove the
          blog</button>
      }
      <h3>Comments</h3>
      <CommentForm id={currentBlog.id}/>
      <ul className="list-group top-buffer">{comments}</ul>
    </div>
  )
}
const mapDispatchToProps = {
  likeBlog, removeBlog
}
const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    loginUser: state.loginUser
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Blog)