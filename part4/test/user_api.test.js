const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)
const helper = require('./helper/user_helper')
const User = require('../model/users')

beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('dumPassword', 10)
    const newUser = new User({
        username: "Dooncam",
        name: "Haniel",
        password: passwordHash
    })
    await newUser.save()
})

describe('invalid user will not be created', () => {

    test('username must be unique', async () => {
        const userAtStart = await helper.usersInDb()

        const newUser = {
            username: "Dooncam",
            name: "Haniel",
            password: "dumPassword"
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(userAtStart.length).toEqual(usersAtEnd.length)
    })

    test('name must be at least 3 characters long', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: "Do",
            name: "Haniel",
            password: "dumPassword"
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtStart.length).toEqual(usersAtEnd.length)
    })

    test('password must be at least 3 characters long', async () => {
        const usersAtStart = await helper.usersInDb()
        const newUser = {
            username: "Do",
            name: "Haniel",
            password: "du"
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtStart.length).toEqual(usersAtEnd.length)
    })

})



afterAll(() => {
    mongoose.connection.close()
})