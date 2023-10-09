const Filter = (props) =>{
    return(
        <p>filter shown with 
            <input 
                value={props.searchName} 
                onChange={props.onChange} 
            />
      </p>
    )
}

export default Filter