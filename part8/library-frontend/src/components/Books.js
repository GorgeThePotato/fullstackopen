import { useState } from "react"
import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries"
import Book from "./Book"
import Buttons from "./Buttons"

const Books = ({show, books}) => {

  const [displayedBooks,setDisplayedBooks] = useState(books)

  if (!show) {
    return null
  }

  const bookGenres = books.map((b) =>{
    return b.genres
  })

  const uniqueGenres = (genres) => {
    return [...new Set(genres)]
  }

  const uniqueBookGenres = uniqueGenres(bookGenres.flat())

  const filerBooks = (genre) => {
    const newBooks = books.filter((book) =>{
      return book.genres.includes(genre)
    })
    setDisplayedBooks(newBooks)
 }

  return (
    <div>
      <h2>books</h2>
        <h3>in genre</h3>
          <Book book={displayedBooks}/>
          <Buttons 
          uniqueGenres={uniqueBookGenres} 
          setDisplayedBooks={setDisplayedBooks} 
          filterBooks={filerBooks}
          books={books}
          />
    </div>
  )
}

export default Books
