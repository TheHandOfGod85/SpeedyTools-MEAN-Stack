const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const equipmentRouter = require('./routes/equipmentRoute')

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

// 3) ROUTES
app.use('/api/equipments', equipmentRouter)

module.exports = app
