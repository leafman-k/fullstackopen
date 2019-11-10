import React, {useState} from 'react'
import {gql} from 'apollo-boost'
import {useQuery} from '@apollo/react-hooks'

const ME = gql`
{
 me{
    username
    favoriteGenre
  }
}
`

const Recommendation = ({show, result}) => {

  const currentUser = useQuery(ME)
  if (!show || result.loading || currentUser.loading) {
    return null
  }

  console.log('me', currentUser.data.me)
  const books = result.data.allBooks

  const booksToShow = books.filter(book => book.genres.includes(currentUser.data.me.favoriteGenre))


  return (
      <div>
        <h2>Recommendations </h2>

        <table>
          <tbody>
          <tr>
            <th>Title</th>
            <th>
              Author
            </th>
            <th>
              Published
            </th>
          </tr>
          {booksToShow.map(a =>
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
          )}
          </tbody>
        </table>

      </div>
  )
}

export default Recommendation