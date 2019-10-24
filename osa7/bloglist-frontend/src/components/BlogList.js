import React from 'react'
import { connect } from 'react-redux'
import BlogListItem from './BlogListItem'
import blogService from '../services/blogs'
import {addBlog, getAllBlogs, likeBlog} from '../reducers/blogReducer'
import {setNotification} from '../reducers/notificationReducer'
import Togglable from './Togglable'
import BlogForm from './BlogForm'


const BlogList = (props) => {
  const blogs = props.blogs



  return (
      <div>
        {props.loginUser ? <Togglable buttonLabel='new blog'>
          <BlogForm />
        </Togglable> : <></>}

        {blogs.map(blog =>
            <BlogListItem key={blog.id} blog={blog}/>
        )}
      </div>
  )
}
const mapDispatchToProps = {
  setNotification, likeBlog, addBlog
}
const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    loginUser: state.loginUser
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(BlogList)



