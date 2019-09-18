import React, {useState} from 'react'
import PropTypes from 'prop-types'

const Blog = ({blog, likes, remove, user}) => {

  const [visible, setVisible] = useState(false)

  const showWhenVisible = {display: visible ? '' : 'none'}

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
      <div style={blogStyle}>
        <div onClick={ toggleVisibility }>
          {blog.title} {blog.author}
        </div>
        <div style={showWhenVisible}>
          {blog.likes} likes <button onClick={likes}>like</button>
          <br/>
          added by {blog.user.name}
          <br/>
          {user.username === blog.user.username ?
            <button onClick={remove}>remove</button>
              : ''}
        </div>
      </div>
  )
}
Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likes: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog