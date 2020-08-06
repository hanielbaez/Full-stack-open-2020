let timeoutID;

const notificationReducer = (state = { visibility: 'hidden ' }, action) => {
    switch (action.type) {
        case 'HIDE_NOTIFICATION':
            return { visibility: 'hidden' }
        case 'SET_NOTIFICATION':
            return { data: action.data, visibility: 'visible' }
        default:
            return state
    }
}

export const setNotification = (text, seconds) => {
    return async dispatch => {
        clearTimeout(timeoutID)
        
        dispatch({
            type: 'SET_NOTIFICATION',
            data: text
        })

        timeoutID = setTimeout(() => {
            dispatch(notificationHide())
        }, seconds * 1000)
    }
}

export const notificationHide = () => {
    return {
        type: 'HIDE_NOTIFICATION'
    }
}

export default notificationReducer