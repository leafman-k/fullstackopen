import React from 'react'

const User = ({ user }) => {
  if(user === undefined){
    return null
  }
  return (
    <div>
      <h2>{user.name}</h2>
      <ul className="list-group">
        {user.blogs.map(blog =>
          <li key={blog.id} className="list-group-item">
            {blog.title}
          </li>
        )}
      </ul>
    </div>
  )
}
export default User