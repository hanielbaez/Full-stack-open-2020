import anecdoteServices from '../services/anecdote'

const anecdoteReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_VOTE':
            return state.map(anecdote => anecdote.id === action.data.id
                ? action.data
                : anecdote)
        case 'ADD_ANECDOTE':
            return [...state, action.data]
        case 'INIT_ANECDOTE':
            return action.data
        default:
            return state
    }
}

export const addVote = anecdote => {
    return async dispatch => {
        const anecdoteUpdated = await anecdoteServices.update({ ...anecdote, votes: anecdote.votes + 1 })
        dispatch({
            type: 'ADD_VOTE',
            data: anecdoteUpdated
        })
    }
}

export const addAnecdote = data => {
    return async dispatch => {
        const newAnecdote = await anecdoteServices.create(data)
        dispatch({
            type: 'ADD_ANECDOTE',
            data: newAnecdote
        })
    }


}

export const initializeAnecdote = () => {
    return async dispatch => {
        const anecdotes = await anecdoteServices.getAll()
        dispatch({
            type: 'INIT_ANECDOTE',
            data: anecdotes
        })
    }
}

export default anecdoteReducer