import React, {useState} from 'react'

const Books = ({show, result}) => {

  const [genre, setGenre] = useState('')
  const [showAll, setShowAll] = useState(true)

  if (!show || result.loading) {
    return null
  }
  const books = result.data.allBooks

  const booksToShow = showAll
      ? books
      : books.filter(book => book.genres.includes(genre))
  let genresToShow = []

  books.forEach(book => {
    book.genres.forEach(bookGenre => {
      if (!genresToShow.includes(bookGenre)) {
        genresToShow.push(bookGenre)
      }
    })
  })
  const changeEvent = (event) => {
    setShowAll(false)
    console.log('Event value', event)
    setGenre(event)
  }
  return (
      <div>
        <h2>books</h2>
        <p>Selected genre {showAll ? 'Show all' : genre}</p>
        <table>
          <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
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
        {genresToShow.map((genre) =>
            <button onClick={() => changeEvent(genre)} key={genre}>{genre}</button>
        )}
        <button onClick={() => setShowAll(true)} >Show all</button>
      </div>
  )
}

export default Books