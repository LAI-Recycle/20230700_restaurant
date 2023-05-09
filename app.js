const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')

if (process.env.NODE_ENV !== 'production') {
    require("dotenv").config()
  }

//set MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })

const db = mongoose.connection

db.on('error', () => {
  console.log('MongoDB error')
})

db.once('open', () => {
  console.log('MongoDB connected!')
})

app.listen(port, () => {
    console.log(`Express is listening on localhost:${port}` )
  })