const express = require('express')
const router = express.Router()
const {newProduct, getProduct, getProductById, updateProduct, deleteProduct} = require('../controllers/productController')

router.post('/add-product/', newProduct)
router.get('/', getProduct)
router.get('/:id', getProductById)
router.put('/:id', updateProduct)
router.delete('/:id', deleteProduct)


module.exports = router