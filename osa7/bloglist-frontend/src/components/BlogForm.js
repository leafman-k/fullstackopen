import React from 'react'
import {useField} from '../hooks'
import {connect} from "react-redux";
import {setNotification} from "../reducers/notificationReducer";
import {addBlog} from '../reducers/blogReducer'


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
          {content: `A new blog ${title.value} by ${author.value} added`, type: 'info'}
      )
      title.reset()
      author.reset()
      url.reset()

    } catch (exception) {
      props.setNotification({content: 'Ooops, Something went wrong', type: 'error'})

    }

  }
  return (
    <form onSubmit={addBlog}>
      <div>
          title:
        <input
          type="text"
          value={title.value}
          name="Title"
          onChange={title.onChange}
        />
      </div>
      <div>
          author:
        <input
          type="text"
          value={author.value}
          name="Author"
          onChange={author.onChange}
        />
      </div>
      <div>
          url:
        <input
          type="text"
          value={url.value}
          name="Url"
          onChange={url.onChange}
        />
      </div>
      <button type="submit">Add new blog</button>
    </form>
  )
}
const mapDispatchToProps = {
  setNotification, addBlog
}
export default connect(null, mapDispatchToProps)(BlogForm)