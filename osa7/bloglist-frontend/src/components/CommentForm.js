import React from 'react'
import {useField} from '../hooks'
import {connect} from "react-redux";
import {commentBlog} from '../reducers/blogReducer'


const CommentForm = (props) => {
  const comment = useField('text')

  const commentBlog = async (event) => {
    event.preventDefault()
    const newComment = {
      comment: comment.value
    }
    props.commentBlog(props.id, newComment)
    comment.reset()
  }
  return (

      <form onSubmit={commentBlog}>
        <div>
          comment:
          <input
              type="text"
              value={comment.value}
              name="Comment"
              onChange={comment.onChange}
          />
        </div>
        <button type="submit">Add new comment</button>
      </form>
  )
}

export default connect(null, {commentBlog})(CommentForm)