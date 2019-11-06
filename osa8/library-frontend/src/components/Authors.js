import React from 'react'
import AuthorForm from './AuthorForm'


const Authors = ({ show, result, editAuthor }) => {

  if (!show || result.loading ) {
    return null
  }
  const authors = result.data.allAuthors
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <AuthorForm editAuthor={editAuthor}/>
    </div>
  )
}

export default Authors