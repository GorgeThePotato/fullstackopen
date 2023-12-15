const Buttons = ({filterBooks, setDisplayedBooks, uniqueGenres}) =>{
    return(
        <div>
            {uniqueGenres.map((genre,i)=>(
                <button key={i+1} onClick={() => filterBooks(genre)}>{genre}</button>
            ))}
            <button onClick={() => filterBooks()}>all genres</button>
      </div>
    )
}

export default Buttons