import React from 'react'

const BlogForm = (props) => {
  return (
      <form onSubmit={props.addBlog}>
        <div>
          title:
          <input
              type="text"
              value={props.title}
              name="Title"
              onChange={props.handleTitleChange}
          />
        </div>
        <div>
          author:
          <input
              type="text"
              value={props.author}
              name="Author"
              onChange={props.handleAuthorChange}
          />
        </div>
        <div>
          url:
          <input
              type="text"
              value={props.url}
              name="Url"
              onChange={props.handleUrlChange}
          />
        </div>
        <button type="submit">Add new blog</button>
      </form>
  )
}
export default BlogForm