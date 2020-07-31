import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {

  const setState = (type) => {
    return () => {
      store.dispatch({
        type: type
      })
    }
  }

  return (
    <>
      <button onClick={setState('GOOD')}>good</button>
      <button onClick={setState('OK')}>neutral </button>
      <button onClick={setState('BAD')}>bad</button>
      <button onClick={setState('ZERO')}>reset</button>
      <div>good {store.getState().good}</div>
      <div>neutral {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)