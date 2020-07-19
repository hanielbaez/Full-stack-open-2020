const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../model/users')

const helper = require('./helper_user')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', { id: 1, title: 1, author: 1, url: 1 })
    response.json(users)
})

usersRouter.post('/', async (request, response) => {
    const body = request.body

    const usernameValidation = await helper.validateUsername(request)
    const passwordValidation = helper.validatePasswordLen(request)
    const validationError = usernameValidation || passwordValidation

    if (validationError) {
        return response.status(400).json(validationError)
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    })

    const savedUser = await user.save()
    response.json(savedUser)
})

module.exports = usersRouter