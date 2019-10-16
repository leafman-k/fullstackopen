import React from 'react'
import { connect } from 'react-redux'
import Blog from './Blog'
import blogService from '../services/blogs'
import {addBlog, getAllBlogs, likeBlog} from "../reducers/blogReducer";
import {setNotification} from "../reducers/notificationReducer";


const BlogList = (props) => {
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
    const updatedBlog = props.likeBlog(id, changedBlog)
  }

  const removeBlog = async (id) => {
    const removedBlog = blogs.find(blog => blog.id === id)
    if (window.confirm(`remove blog ${removedBlog.title} by ${removedBlog.author}`)) {
      try {
        await blogService.removeBlog(id)

      } catch (exception) {
        props.setNotification({text: exception.response.data.error, type: 'error'})

      }
    }
  }

  return (
      <div>
        <h2>blogs</h2>
        {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} likes={() => likeBlog(blog.id)} remove={() => removeBlog(blog.id)}
                  user={props.user}/>
        )}
      </div>
  )
}
const mapDispatchToProps = {
  setNotification, getAllBlogs, likeBlog, addBlog
}
const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    user: state.user
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(BlogList)



