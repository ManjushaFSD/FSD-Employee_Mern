const express = require('express')
const app = express()
const cors = require('cors')
const logger = require('morgan')
const path = require('path');

require('./src/configs/db.config')
const api = require("./src/routes/api")


app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/api', api);

app.use(express.static(path.join(__dirname, "./client/build")))
app.get("*",(_,res)=>{
res.sendFile(path.join(__dirname,"./client/build/index.html"),
(err)=>{
  res.status(500).send(err)
}
)

})

app.listen(3001, () => {
  console.log('Server running successfully on Port 3001')
});
