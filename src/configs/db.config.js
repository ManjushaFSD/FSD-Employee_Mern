const mongoose = require("mongoose");
const db = mongoose.connect(
  "mongodb+srv://manjusharn93:userone@cluster1.ydecups.mongodb.net/EmployeeMern?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
).then(()=>{
    console.log("Connected successfully to the MongoDB Database")
}).catch((error)=>{
    console.log(error,"Error connecting to MongoDB")
})

module.exports = db