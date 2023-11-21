const filterReducer = (state = 'ALL', action) =>{
    console.log('state now: ', state)
    switch (action.type) {
        case 'SET_FILTER':     
            return action.payload    
        default:
            return state
    }
}

export const filterChange = filter => {
    return {
        type: 'SET_FILTER',
        payload: filter 
    }
}

export default filterReducer