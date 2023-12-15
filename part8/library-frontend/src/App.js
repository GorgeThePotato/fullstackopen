import { useState } from 'react'
import { useApolloClient, useQuery, useSubscription } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED, ME } from './queries'

export const updateCache = (cache, query, addedBook) => {
  const uniqByTitle = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }
  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByTitle(allBooks.concat(addedBook))
    }
  })
}

const App = () => {
  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
  const user = useQuery(ME)
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      window.alert("New book was added!")
      const addedBook = data.data.bookAdded
      updateCache(client.cache, {query: ALL_BOOKS }, addedBook)
    }
  })
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
          <Recommend show={page === 'recommend'} books={books.data.allBooks} favouriteGenre={user.data.me.favouriteGenre}/>
        </div>}
        </div> 
      <div>
      </div>
      <Authors show={page === 'authors'} authors={authors.data.allAuthors} />

      <Books show={page === 'books'} books={books.data.allBooks}/>

      <NewBook show={page === 'add'} />
    </div>
  )
}

export default App
