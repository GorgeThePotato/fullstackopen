import { useState } from 'react'
import { useApolloClient, useQuery } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'
import { ALL_AUTHORS, ALL_BOOKS, ME } from './queries'

const App = () => {
  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
  const user = useQuery(ME)
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('login')
  }
  
  if(authors.loading){
    return <div>loading...</div>
  }

  if(books.loading){
    return <div>loading...</div>
  }

  const goHome = () => {
    setPage('authors')
  }

  return (
    <div>
      <div>
        {!token && <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('login')}>login</button>   
          <LoginForm setToken={setToken} show={page === 'login'} goHome={goHome}/>
        </div>}
        {token && <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>   
          <button onClick={() => setPage('add')}>add book</button>
          <button onClick={() => setPage('recommend')}>recommend</button>
          <button onClick={logout}>logout</button>
        </div>}
        </div> 
      <div>
      </div>
      <Authors show={page === 'authors'} authors={authors.data.allAuthors} />

      <Books show={page === 'books'} books={books.data.allBooks}/>

      <Recommend show={page === 'recommend'} books={books.data.allBooks} favouriteGenre={user.data.me.favouriteGenre}/>

      <NewBook show={page === 'add'} />
    </div>
  )
}

export default App
