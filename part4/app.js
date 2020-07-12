const config = require('./utils/config')
require('express-async-errors')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const blogRouter = require('./controller/blogs')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => logger.info('MongoDB connecte'))

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogRouter)

app.use(middleware.errorHandler)
app.use(middleware.unknowRouter)

module.exports = app