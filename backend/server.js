const dotenv = require('dotenv')
dotenv.config()
const app = require('./app')
const mongoose = require('mongoose')

mongoose
  .connect(process.env.DATABASE_LOCAL)
  .then(() => console.log('DB connection successful!'))

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`App running on port ${port}...`)
})
