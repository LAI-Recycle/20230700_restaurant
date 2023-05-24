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
      .catch(err => {
        console.log(err)
        res.render('errPage', { errMsg: err.message })
    })
  })
  
router.get('/:id/edit', (req, res) => {
    const id = req.params.id
    Restaurant.findById(id)
      .lean()
      .then((restaurant) => res.render('edit', { restaurant }))
      .catch(err => {
        console.log(err)
        res.render('errPage', { errMsg: err.message })
    })
  })
  
router.post('/', (req, res) => {
    const newRestaurant = req.body
    return Restaurant.create(newRestaurant)
      .then(() => res.redirect('/'))
      .catch(err => {
        console.log(err)
        res.render('errPage', {errMsg: err.message })
    })
  })
  
router.put('/:id', (req, res) => {
    const id = req.params.id
    const restaurant = req.body
    return Restaurant.findByIdAndUpdate(id, restaurant)
      .then(() => res.redirect(`/restaurants/${id}`))
      .catch(err => {
        console.log(err)
        res.render('errPage', { errMsg: err.message })
    })
  })
  
router.delete('/:id', (req, res) => {
    const id = req.params.id
    return Restaurant.findById(id)
      .then((restaurant) => restaurant.remove())
      .then(() => res.redirect('/'))
      .catch(err => {
        console.log(err)
        res.render('errPage', { errMsg: err.message })
    })
  })

module.exports = router