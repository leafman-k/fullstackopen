import React, {useState} from 'react'
import Select from 'react-select'

const AuthorForm = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const options = props.authors.map(author => {
    return {value: author.name, label: author.name}
  })

  const submit = async (e) => {
    e.preventDefault()
    await props.editAuthor({
      variables: { name: name.value, born: parseInt(born, 10) }
    })

    setName('')
    setBorn('')
  }
  const handleChange = selectedOption => {
    setName(selectedOption)
  }
  const paddingTop = {marginTop:20, marginBottom: 20}
  return (
      <div >
        <form onSubmit={submit}>
          <div style={paddingTop}>
          <Select
              value={name}
              onChange={handleChange}
              options={options}

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