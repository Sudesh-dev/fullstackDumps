const Product = require('../models/productModel')

const newProduct = async (req,res)=>{
    try{
        const {name, category, price,description, stock} = req.body 
        const product = new Product({
            name, category, price, description, stock
        }) 
        const createdProduct = await product.save()
        res.status(201).json(createdProduct)
    }
    catch(e){
        res.status(400).json(e)
    }
}

module.exports = {newProduct}