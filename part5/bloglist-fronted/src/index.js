import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { BrowserRouter as Router } from 'react-router-dom'

import userReducer from './reducers/user'
import blogReducer from './reducers/blog'
import alertReducer from './reducers/alert'
import initializeUser from './reducers/users'

import 'bulma/css/bulma.css'

import App from './App'

const reducer = combineReducers({
    user: userReducer,
    blogs: blogReducer,
    alert: alertReducer,
    users: initializeUser
})

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root'))