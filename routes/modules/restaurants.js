const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

router.get('/new', (req, res) => {
    return res.render('new')
  })
  
router.get('/:id', (req, res) => {
    const userId = req.user._id
    const _id = req.params.id
    return Restaurant.findOne({ _id, userId })
      .lean()
      .then((restaurant) => res.render('show', { restaurant }))
      .catch(err => {
        console.log(err)
        res.render('errPage', { errMsg: err.message })
    })
  })
  
router.get('/:id/edit', (req, res) => {
    const userId = req.user._id
    const _id = req.params.id
    return Restaurant.findOne({ _id, userId })
      .lean()
      .then((restaurant) => res.render('edit', { restaurant }))
      .catch(err => {
        console.log(err)
        res.render('errPage', { errMsg: err.message })
    })
  })
  
router.post('/', (req, res) => {
    const userId = req.user._id
    const newRestaurant = req.body
    newRestaurant.userId = userId
    return Restaurant.create( newRestaurant )
      .then(() => res.redirect('/'))
      .catch(err => {
        console.log(err)
        res.render('errPage', {errMsg: err.message })
    })
  })
  
router.put('/:id', (req, res) => {
    const userId = req.user._id
    const _id = req.params.id
    const restaurant = req.body
    // 怎麼做?
    return Restaurant.findByIdAndUpdate(_id, restaurant ,userId)
      .then(() => res.redirect(`/restaurants/${_id}`))
      .catch(err => {
        console.log(err)
        res.render('errPage', { errMsg: err.message })
    })
  })
  
router.delete('/:id', (req, res) => {
    const userId = req.user._id
    const _id = req.params.id
    return Restaurant.findOne({ _id, userId })
      .then((restaurant) => restaurant.remove())
      .then(() => res.redirect('/'))
      .catch(err => {
        console.log(err)
        res.render('errPage', { errMsg: err.message })
    })
  })

module.exports = router