import React from 'react'
import { useField } from '../hooks'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { addBlog } from '../reducers/blogReducer'


const BlogForm = (props) => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const addBlog = async (event) => {
    event.preventDefault()
    try {
      props.addBlog({
        title: title.value, author: author.value, url: url.value
      })
      props.setNotification(
        { content: `A new blog ${title.value} by ${author.value} added`, type: 'success' }
      )
      title.reset()
      author.reset()
      url.reset()

    } catch (exception) {
      props.setNotification({ content: 'Ooops, Something went wrong', type: 'danger' })

    }

  }
  return (
    <form onSubmit={addBlog}>
      <div className="form-group">
        <label htmlFor="Title">Title</label>
        <input
          type="text"
          value={title.value}
          name="Title"
          onChange={title.onChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="Author">Author</label>
        <input
          type="text"
          value={author.value}
          name="Author"
          onChange={author.onChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="Url">Url</label>
        <input
          type="text"
          value={url.value}
          name="Url"
          onChange={url.onChange}
          className="form-control"
        />
      </div>
      <button type="submit" className="btn btn-primary">Add new blog</button>
    </form>
  )
}
const mapDispatchToProps = {
  setNotification, addBlog
}
export default connect(null, mapDispatchToProps)(BlogForm)