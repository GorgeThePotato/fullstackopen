import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import Select from 'react-select'

import { EDIT_AUTOR, ALL_AUTHORS } from "../queries";

const BirthForm = ({authorNames}) =>{
    const [selectedOption, setSelectedOption] = useState(null)
    const [born, setBorn] = useState('')

    const options = authorNames.map((author)=>{
        return {value:author,label:author}
    })

    const [ editAutor, result] = useMutation(EDIT_AUTOR, {
        refetchQueries: [ { query: ALL_AUTHORS } ],
        onError: (error) => {
            const messages = error.graphQLErrors.map(e => e.message).join('\n')
            console.log(messages)
          }
    })

    useEffect(() =>{
        if(result.data && result.data.editAutor === null){
            console.log('author not found')
        }
    }, [result.data])

    const submit = async (event) =>{
        event.preventDefault()

        const name = selectedOption.value
        editAutor({ variables: { name, born}})
        setSelectedOption(null)
        setBorn('')
    }

    return(
        <div>
            <h2>Set birthyear</h2>

            <form onSubmit={submit}>
                <div>
                <Select
                    defaultValue={selectedOption}
                    onChange={setSelectedOption}
                    options={options}
                />
                </div>
                <div>
                    birthyear <input
                    value={born}
                    onChange={({target}) => setBorn(parseInt(target.value))}/>
                </div>
                <button type="submit">update author</button>
            </form>
        </div>
    )
}

export default BirthForm