import ReactDOM from 'react-dom'
import React from 'react'
import { createStore } from 'redux'
import anecdoteReducer from './reducers/anecdoteReducer'
import { Provider } from 'react-redux'
import App from './App'

const store = createStore(anecdoteReducer)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'))



