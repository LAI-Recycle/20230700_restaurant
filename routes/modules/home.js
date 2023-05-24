const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
    Restaurant.find()
      .lean()
      .then((restaurants) => res.render('index', { restaurants }))
      .catch(err => {
        console.log(err)
        res.render('errPage', { errMsg: err.message })
    })
  })

router.get('/search', (req, res) => {
    const keyword = req.query.keyword.trim().toLowerCase()
    const sort = req.query.sort
    Restaurant.find()
      .lean()
      .sort(`${sort}`)
      .then((restaurants) => {
        const filteredRestaurants = restaurants.filter((item) => 
           item.name.toLowerCase().includes(keyword) ||
           item.category.toLowerCase().includes(keyword)
      )
        res.render('index', { restaurants: filteredRestaurants, keyword, sort })
      })
      .catch(err => {
        console.log(err)
        res.render('errPage', { errMsg: err.message })
    })
  })
  module.exports = router