const Buttons = ({filterBooks, setDisplayedBooks, uniqueGenres, books}) =>{
    return(
        <div>
            {uniqueGenres.map((genre,i)=>(
                <button key={i+1} onClick={() => filterBooks(genre)}>{genre}</button>
            ))}
            <button onClick={() => setDisplayedBooks(books)}>all genres</button>
      </div>
    )
}

export default Buttons