const express = require('express')
const router = express.Router()

const {createUser} = require('../controllers/userController')

router.post('/addUser/',createUser)

module.exports = router