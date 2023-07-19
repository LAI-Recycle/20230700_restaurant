const bcrypt = require('bcryptjs')
const Restaurant = require('../restaurant')
const User = require("../../models/user")
const restaurantList = require('./restaurant.json').results //restaurant.json資料
const seedUsers = require('./user.json').SEED_USERS //user.json資料
const db = require('../../config/mongoose')

db.on('error', () => {
  console.log('MongoDB error!')
})

db.once("open", () => {
  console.log('MongoDB connected!')
  const promises = seedUsers.map((seedUser) => {
   return bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(seedUser.password , salt))
    .then(hash => 
      User.create({ 
        name: seedUser.name, 
        email: seedUser.email, 
        password: hash 
      })
    )
    // 新增餐廳在使用者之下
    .then(user => {
      const userId = user._id
      const name = user.name
      let userrestaurant = []
      if ( name === seedUsers[0].name ){
        userrestaurant = restaurantList.slice(0,3)
      } else {
        userrestaurant = restaurantList.slice(3,6)
      }
      return Restaurant.create( 
          //Object.assign複製一個或多個物件自身所有可數的屬性到另一個目標物件
          userrestaurant.map(r => Object.assign(r , {userId}))
      )
    })
      .catch(err => console.log(err))
    })
  
    Promise.all(promises)
    .then(() => {
      console.log("restaurantSeeder done!")
      process.exit()
    })
    .catch(err => console.log(err))
  })

