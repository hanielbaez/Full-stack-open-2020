const anecdoteReducer = (state = [], action) => {

    switch (action.type) {
        case 'ADD_VOTE':
            return state.map(anecdote => anecdote.id === action.data.id
                ? { ...anecdote, votes: anecdote.votes + 1 }
                : anecdote)
        case 'ADD_ANECDOTE':
            return [...state, action.data]
        case 'INIT_ANECDOTE':
            return action.data
        default:
            return state
    }
}

export const addVote = id => {
    return {
        type: 'ADD_VOTE',
        data: { id }
    }
}

export const addAnecdote = data => {
    return {
        type: 'ADD_ANECDOTE',
        data
    }
}

export const initializeAnecdote = data => {
    return {
        type: 'INIT_ANECDOTE',
        data
    }
}

export default anecdoteReducer