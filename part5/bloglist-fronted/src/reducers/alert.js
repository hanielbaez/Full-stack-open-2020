const alertReducer = (state = null, action) => {
    switch (action.type) {
        case 'SUCCESS_ALERT':
            return {
                state: true,
                text: action.data
            }
        case 'ERROR_ALERT':
            return {
                state: false,
                text: action.data
            }
        case 'REMOVE_ALERT':
            return null
        default:
            return state
    }
}

export const successAlert = (message) => {
    return {
        type: 'SUCCESS_ALERT',
        data: message
    }
}

export const errorAlert = (message) => {
    return {
        type: 'ERROR_ALERT',
        data: message
    }
}

export const removeAlert = () => {
    return async dispatch => {
        setTimeout(() => {
            dispatch({
                type: 'REMOVE_ALERT'
            })
        }, 5000)
    }
}

export default alertReducer