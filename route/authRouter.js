const express = require('express')
const { signup, verifyOTP } = require('../controllers/authController')
const route = express.Router()


route.post('/signup', signup)
route.post('/verifyOtp', verifyOTP)

module.exports = route