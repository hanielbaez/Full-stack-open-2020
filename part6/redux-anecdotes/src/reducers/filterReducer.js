
const filterReducer = (state = null, action) => {
    if (action.type === 'FILTER') {
        state = action.anecdotes.filter(anecdote =>
            anecdote.content.indexOf(action.searchFor) !== -1
        )
    }
    return state
}

export const filterAnecdotes = ({ anecdotes, searchFor }) => {
    return {
        type: 'FILTER',
        anecdotes,
        searchFor
    }
}

export default filterReducer