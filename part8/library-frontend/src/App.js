import React, { useState } from 'react'

import Authors from './components/Authors'
import Books from './components/Books'
import BookForm from './components/BookForm'

const App = () => {
  const [page, setPage] = useState(<Authors />)

  return (
    <div>
      <div>
        <button onClick={() => setPage(<Authors />)}>authors</button>
        <button onClick={() => setPage(<Books />)}>books</button>
        <button onClick={() => setPage(<BookForm />)}>add book</button>
      </div>
      {page}
    </div>
  )
}

export default App