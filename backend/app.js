const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const AppError = require('./utils/appError')
const globalErrorHandler = require('./controllers/errorController')

const equipmentRouter = require('./routes/equipmentRoute')
const usersRouter = require('./routes/userRoute')

const app = express()
app.use(
  cors({
    origin: 'http://localhost:4200',
  })
)

// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())
app.use(express.static(`${__dirname}/public`))

// app.use((req, res, next) => {
//   req.requestTime = new Date().toISOString();
//   console.log(req.headers);
//   next();
// });

// 3) ROUTES
app.use('/api/equipments', equipmentRouter)
app.use('/api/users', usersRouter)

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`), 404)
})

app.use(globalErrorHandler)

module.exports = app
