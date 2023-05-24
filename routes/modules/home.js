const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
    Restaurant.find()
      .lean()
      .then((restaurants) => res.render('index', { restaurants }))
      .catch((error) => console.error(error))
  })

router.get('/search', (req, res) => {
    const keyword = req.query.keyword.trim().toLowerCase()
    Restaurant.find()
      .lean()
      .then((restaurants) => {
        const filteredRestaurants = restaurants.filter((item) => 
           item.name.toLowerCase().includes(keyword) ||
           item.category.toLowerCase().includes(keyword)
      )
        res.render('index', { restaurants: filteredRestaurants })
      })
      .catch((error) => console.log('error'))
  })
  module.exports = router