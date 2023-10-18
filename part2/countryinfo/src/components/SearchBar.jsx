const SearchBar = (props) =>{
    return(
        <p>find countries 
            <input value={props.searchCountry} onChange={props.onChange}/>
        </p>
    )
}

export default SearchBar