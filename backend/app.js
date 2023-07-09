const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const AppError = require('./utils/appError')
const globalErrorHandler = require('./controllers/errorController')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const hpp = require('hpp')

const equipmentRouter = require('./routes/equipmentRoute')
const usersRouter = require('./routes/userRoute')
const { rateLimit } = require('express-rate-limit')

const app = express()

//GLOBAL MIDDLEWARES

//security http headers
app.use(helmet())
// CORS
app.use(
    cors({
        origin: 'http://localhost:4200',
        credentials: true
    })
)
// developement logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}
// limit request from same API
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!'
})

app.use('/api', limiter)
// body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }))
// data sanitization against NoSQL query injection
app.use(mongoSanitize())
// data sanitization against XSS attacks
app.use(xss({}))
//prevent parameter pollution
app.use(
    hpp({
        whitelist: ['powerRequirement']
    })
)
//serving  static files
app.use(express.static(`${__dirname}/public`))

// 3) ROUTES
app.use('/api/equipments', equipmentRouter)
app.use('/api/users', usersRouter)
// not found request url error handling
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`), 404)
})
// global error handler
app.use(globalErrorHandler)

module.exports = app
