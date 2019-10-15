
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';

import notificationReducer from './reducers/notificationReducer'
import App from './App'
import './index.css'


const reducer = combineReducers({
  notification: notificationReducer
})

const store = createStore(reducer,applyMiddleware(thunk))

ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>,
    document.getElementById('root')
)