const express = require('express')
const app = express()
const cors = require('cors')
const logger = require('morgan')
require('./src/configs/db.config')
const api = require("./src/routes/api")


app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/api', api);

app.listen(3001, () => {
  console.log('Server running successfully on Port 3001')
});
