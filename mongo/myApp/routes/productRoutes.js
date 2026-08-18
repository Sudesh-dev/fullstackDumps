const express = require('express')
const router = express.Router()
const {newProduct} = require('../controllers/productController')

router.post('/add-product/', newProduct)

module.exports = router