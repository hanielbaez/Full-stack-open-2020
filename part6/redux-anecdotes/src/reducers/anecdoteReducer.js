let anecdotesAtStart = [
    {
        content: 'If it hurts, do it more often',
        votes: 2,
        id: 1
    },
    {
        content: 'Adding manpower to a late software project makes it later!',
        votes: 5,
        id: 2
    },
    {
        content: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        votes: 0,
        id: 3
    }
]

const anecdoteReducer = (state = anecdotesAtStart, action) => {

    switch (action.type) {
        case 'ADD_VOTE':
            state = state.map(anecdote => anecdote.id === action.data.id
                ? { ...anecdote, votes: anecdote.votes + 1 }
                : anecdote)
            return state
        case 'ADD_ANECDOTE':
            state = [...state, action.data]
            return state
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

const generateId = () => {
    return (Math.random() * 1000).toFixed()
}

export const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''

    return {
        type: 'ADD_ANECDOTE',
        data: {
            content: content,
            votes: 0,
            id: generateId()
        }
    }
}

export default anecdoteReducer