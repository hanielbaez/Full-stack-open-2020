const User = require('../model/users')

const validateUsername = async request => {
    const username = request.body.username
    const foundUser = await User.find({ username: username })

    if (username.trim().length < 3) {
        return 'username must be at least 3 characters long'
    }
    else if (foundUser.length !== 0) {
        return 'username must be unique'
    }
}

const validatePasswordLen = request => {
    if (request.body.password.length < 3) {
        return 'password must be at least 3 characters long'
    }
}

module.exports = {
    validateUsername,
    validatePasswordLen
}