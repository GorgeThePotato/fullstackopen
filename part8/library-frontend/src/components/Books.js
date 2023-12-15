import { useEffect, useState } from "react"
import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries"
import Book from "./Book"
import Buttons from "./Buttons"

const Books = ({show}) => {
  const [displayedBooks,setDisplayedBooks] = useState([])
  const [books,setBooks] = useState([])
  const [genre, setGenre] = useState()

  const { data, refetch } = useQuery(ALL_BOOKS, {
    variables: { genre }
  });

  useEffect(() => {
    if (data) {
      setDisplayedBooks(data.allBooks);
      refetch()
    }
  }, [data]);

  useEffect(() => {
    if(data) {
      setBooks(data.allBooks)
    }
  },[displayedBooks])

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

  const filterBooks = (genre) => {
    setGenre(genre)
 }

  return (
    <div>
      <h2>books</h2>
        <h3>in genre {genre}</h3>
          <Book book={displayedBooks}/>
          <Buttons 
          uniqueGenres={uniqueBookGenres} 
          setDisplayedBooks={setDisplayedBooks} 
          filterBooks={filterBooks}
          />
    </div>
  )
}

export default Books
