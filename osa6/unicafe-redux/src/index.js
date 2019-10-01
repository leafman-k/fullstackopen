import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const dispatch = (action) => {
      store.dispatch({
        type: action
      })
  }

  return (
    <div>
      <button onClick={(event) => dispatch('GOOD')}>hyvä</button>
      <button onClick={(event)=> dispatch('OK')}>neutraali</button>
      <button onClick={(event) => dispatch('BAD')}>huono</button>
      <button onClick={(event) => dispatch('ZERO')}>nollaa tilastot</button>
      <div>hyvä {store.getState().good}</div>
      <div>neutraali {store.getState().ok}</div>
      <div>huono {store.getState().bad}</div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
