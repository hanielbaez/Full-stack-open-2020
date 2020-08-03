const notificationReducer = (state = { visibility: 'hidden ' }, action) => {
    switch (action.type) {
        case 'LIKE_NOTIFICATION':
            state = { msg: action.msg }
            return state
        case 'CREATE_NOTIFICATION':
            state = { msg: action.msg }
            return state
        case 'HIDE_NOTIFICATION':
            state = { visibility: 'hidden' }
            return state
        default:
            return state
    }
}

export const notificationVote = title => {
    return {
        type: 'LIKE_NOTIFICATION',
        msg: `you voted ${title}`
    }
}

export const notificationAdd = () => {
    return {
        type: 'CREATE_NOTIFICATION',
        msg: 'note created successfully'
    }
}

export const notificationHide = () => {
    return {
        type: 'HIDE_NOTIFICATION'
    }
}

export default notificationReducer