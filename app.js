const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const handlebarsHelper = require('./config/handlebars-helper')
const restaurants = require('./models/restaurant')
const usePassport = require('./config/passport')
const flash = require('connect-flash')

const routes = require('./routes')
require('./config/mongoose')

const app = express()
const port = 3000

app.engine('hbs', exphbs({ defaultLayout: 'main' , extname: 'hbs', handlebarsHelper}))
app.set('view engine', 'hbs')

app.use(session({
  secret: 'ThisIsJohnSecret',
  resave: false,
  saveUninitialized: true
}))


app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

usePassport(app)
app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

app.use(routes)

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}` )
})