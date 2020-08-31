import React, { useState, useEffect } from 'react'

import Authors from './components/Authors'
import Books from './components/Books'
import BookForm from './components/BookForm'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'

const App = () => {
  const [page, setPage] = useState(<Authors />)
  const [token, setToken] = useState(null)

  // useSubscription(BOOK_ADDED, {
  //   onSubscriptionData: ({ subscriptionData }) => {
  //     const addedBook = subscriptionData.data.bookAdded;
  //     window.alert(`A new book has been added: ${addedBook.title}`);
  //     updateCacheWith(addedBook)
  //   }
  // })

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
                <button onClick={() => setPage(<Recommend />)} >recommendations</button>
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