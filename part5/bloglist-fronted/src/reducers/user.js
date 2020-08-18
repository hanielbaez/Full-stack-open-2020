const userReducer = (state = null, action) => {
    switch (action.type) {
        case 'SET_USER':
            return action.data
        case 'LOG_OUT':
            return null
        default:
            return state
    }
}

export const setUser = (userObj) => {
    return {
        type: 'SET_USER',
        data: userObj
    }
}

export const logOut = () => {
    return {
        type: 'LOG_OUT'
    }
}

export default userReducer