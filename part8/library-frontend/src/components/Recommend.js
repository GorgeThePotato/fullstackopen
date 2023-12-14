import Book from "./Book"

const Recommend = ({books, show, favouriteGenre}) => {
    if(!show){
        return null
    }
    const recommendedBook = (favouriteGenre) => {
        const newBooks = books.filter((book) =>{
            return book.genres.includes(favouriteGenre.toLowerCase())
        })
        return newBooks
    }

    return (
        <div>
          <h2>recommendations</h2>
            <h3>books in your favourite genre {favouriteGenre} </h3>
              <Book book={recommendedBook(favouriteGenre)}/>
        </div>
      )
}
export default Recommend