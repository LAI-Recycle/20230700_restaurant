const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

router.get('/new', (req, res) => {
    return res.render('new')
  })
  
  router.get('/:id', (req, res) => {
    const id = req.params.id
    return Restaurant.findById(id)
      .lean()
      .then((restaurant) => res.render('show', { restaurant }))
      .catch((error) => console.log('error'))
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
  
  router.post('/:id', (req, res) => {
    const id = req.params.id
    Restaurant.findById(id)
      .lean()
      .then((restaurant) => res.render('edit', { restaurant }))
      .catch((error) => console.log('error'))
  })
  
  router.post('/', (req, res) => {
    const newRestaurant = req.body
    return Restaurant.create(newRestaurant)
      .then(() => res.redirect('/'))
      .catch((error) => console.log('error'))
  })
  
  router.put('/:id', (req, res) => {
    const id = req.params.id
    const restaurant = req.body
    return Restaurant.findByIdAndUpdate(id, restaurant)
      .then(() => res.redirect(`/restaurants/${id}`))
      .catch((error) => console.log('error'))
  })
  
  router.delete('/:id', (req, res) => {
    const id = req.params.id
    return Restaurant.findById(id)
      .then((restaurant) => restaurant.remove())
      .then(() => res.redirect('/'))
      .catch((error) => console.log('error'))
  })











module.exports = router