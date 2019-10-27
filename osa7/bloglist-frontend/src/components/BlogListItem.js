import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const BlogListItem = ({ blog }) => {


  return (
    <td>
      <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
    </td>
  )
}
BlogListItem.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default BlogListItem