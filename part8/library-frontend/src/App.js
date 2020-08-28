import React, { useState, useEffect } from 'react'

import { useQuery } from '@apollo/client'
import { CURRENT_USER } from './queries'

import Authors from './components/Authors'
import Books from './components/Books'
import BookForm from './components/BookForm'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'

const App = () => {
  const [page, setPage] = useState(<Authors />)
  const [token, setToken] = useState(null)
  const { data } = useQuery(CURRENT_USER)

  useEffect(() => {
    setToken(localStorage.getItem('book-user-token'))
  }, [])

  useEffect(() => {
    setPage(<Authors />)
  }, [token])

  const logOutHandle = (event) => {
    event.preventDefault()
    localStorage.clear()
    setToken(null)
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage(<Authors />)}>authors</button>
        <button onClick={() => setPage(<Books />)}>books</button>
        {
          token
            ? (
              <>
                <button onClick={() => setPage(<BookForm />)}>add book</button>
                <button onClick={() => setPage(<Recommend favoriteGenre={data?.me.favoriteGenre} />)} >recommendations</button>
                <button onClick={logOutHandle}>
                  logout
              </button>
              </>
            )
            : <button onClick={() => setPage(<LoginForm setToken={setToken} />)} >loggin</button>
        }
      </div>
      {page}
    </div >
  )
}

export default App