import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

const BlogListItem = ({ blog }) => {


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
      <div style={blogStyle} className="blog">
        <div className="blogTitle">
          <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
        </div>
      </div>
  )
}
BlogListItem.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default BlogListItem