import React from 'react'
import { Table } from 'react-bootstrap'
import { connect } from 'react-redux'
import BlogListItem from './BlogListItem'
import { addBlog, likeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import Togglable from './Togglable'
import BlogForm from './BlogForm'

const BlogList = (props) => {
  const blogs = props.blogs

  return (
    <div>
      <div className="row">
        <div className="col">
          {props.loginUser ? <Togglable buttonLabel='new blog'>
            <BlogForm/>
          </Togglable> : <></>}
        </div>
      </div>
      <div className="row top-buffer">
        <div className="col">
          <Table striped>
            <tbody>
              {blogs.map(blog =>
                <tr key={blog.id}>
                  <BlogListItem key={blog.id} blog={blog}/>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(BlogList)



