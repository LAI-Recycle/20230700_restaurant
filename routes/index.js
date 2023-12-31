const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const users = require('./modules/users') 
const { model } = require('mongoose')
const restaurants = require('./modules/restaurants')
const { authenticator } = require('../middleware/auth') 

const auth = require('./modules/auth')

router.use('/restaurants', authenticator, restaurants)
router.use('/users', users)
router.use('/auth', auth) 
router.use('/', authenticator, home)

module.exports = router