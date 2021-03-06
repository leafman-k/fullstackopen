import React, {useState} from 'react'
import {gql} from 'apollo-boost'
import {useQuery, useMutation, useSubscription, useApolloClient} from '@apollo/react-hooks'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommendation from './components/Recommendation'

const ALL_AUTHORS = gql`
{
 allAuthors {
    name
    born
    bookCount
  }
}
`

const ALL_BOOKS = gql`
{
  allBooks {
    title 
    author{
      name
      born
    }
    published 
    genres
  }
}
`
const CREATE_BOOK = gql`
mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String]) {
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    title
    author {
      name
    }
  }
}
`
const EDIT_AGE = gql`
mutation editAuthor($name: String!, $born: Int!) {
  editAuthor(name: $name, setBornTo: $born)  {
    name
    born
  }
}
`
const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`
const BOOK_ADDED = gql`
subscription {
  bookAdded {
    title
    author{
      name
    }
    published
  }
}
`
const App = () => {
  const client = useApolloClient()
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
  const [addBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{query: ALL_BOOKS}, {query: ALL_AUTHORS}]
  })
  const [updateAuthor] = useMutation(EDIT_AGE, {
    refetchQueries: [{query: ALL_AUTHORS}]
  })
  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
        set.map(p => p.id).includes(object.id)

    const dataInStore = client.readQuery({query: ALL_BOOKS})
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: {allBooks: dataInStore.allBooks.concat(addedBook)}
      })
    }
  }
  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({subscriptionData}) => {
      const addedBook = subscriptionData.data.bookAdded
      setErrorMessage(`${addedBook.title} added`)
      updateCacheWith(addedBook)
      setTimeout(() => {
        setErrorMessage(null)
      }, 1500)
    }
  })
  const handleError = (error) => {
    setErrorMessage(error.graphQLErrors[0].message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }
  const [login] = useMutation(LOGIN, {
    onError: handleError
  })
  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }


  return (
      <div>
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          {
            token && <button onClick={() => setPage('add')}>add book</button>
          }
          {
            token && <button onClick={() => setPage('recommendation')}>Recommended</button>
          }
          {
            token && <button onClick={() => logout()}>logout</button>
          }
          {!token && <button onClick={() => setPage('login')}>login </button>}
        </div>
        {errorMessage &&
        <div style={{color: 'red'}}>
          {errorMessage}
        </div>
        }
        <Authors show={page === 'authors'} result={authors} editAuthor={updateAuthor}/>
        <Books show={page === 'books'} result={books}/>
        <NewBook show={page === 'add'} addBook={addBook}/>
        <LoginForm show={page === 'login'} login={login} setToken={setToken}/>
        <Recommendation show={page === 'recommendation'} result={books}/>
      </div>
  )
}

export default App