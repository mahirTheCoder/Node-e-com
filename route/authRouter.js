const express = require('express')
const { signup, verifyOTP, resendOTP } = require('../controllers/authController')
const route = express.Router()


route.post('/signup', signup)
route.post('/verifyOtp', verifyOTP)
route.post('/resendOtp', resendOTP)

module.exports = route