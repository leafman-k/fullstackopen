import React, {useState} from 'react'


const AuthorForm = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')



  const submit = async (e) => {
    e.preventDefault()
    await props.editAuthor({
      variables: { name, born: parseInt(born, 10) }
    })

    setName('')
    setBorn('')
  }

  return (
      <div>
        <form onSubmit={submit}>
          <div>
            name <input
              value={name}
              onChange={({ target }) => setName(target.value)}
          />
          </div>
          <div>
            Born <input
              value={born}
              onChange={({ target }) => setBorn(target.value)}
          />
          </div>
          <button type='submit'>update author</button>
        </form>
      </div>
  )
}
export default AuthorForm