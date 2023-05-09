const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const port = 3000
const mongoose = require('mongoose')
const Restaurant = require('./models/restaurant')

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

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    Restaurant.find()
      .lean()
      .then((restaurants) => res.render('index', { restaurants }))
      .catch((error) => console.error(error))
  })

app.listen(port, () => {
    console.log(`Express is listening on localhost:${port}` )
  })