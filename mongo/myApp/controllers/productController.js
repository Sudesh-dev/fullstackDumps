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


const getProduct = async (req,res)=>{
    try{
        filter = {} 
        if(req.query.minPrice){
            filter.price = {...filter.price, $gte:Number(req.query.minPrice)}
        }
        if(req.query.maxPrice){
            filter.price = {...filter.price, $lte:Number(req.query.maxPrice)}
        }
        if(req.query.category){
            filter.category = req.query.category
        }
        if(req.query.search){
            filter.name = {$regex:req.query.search, $options:"i"}
        }

        const sortObj = {}
        if(req.query.sortBy){
            const order = req.query.order === 'desc' ? -1 :1
            sortObj[req.query.sortBy] = order
        }

        console.log(filter)
        console.log(sortObj)

        const products = await Product.find(filter).sort(sortObj)
        res.status(200).json({
            count: products.length,
            products
        })
    }
    catch(e){
        res.status(500).json(e.message)
    }
}

const getProductById = async (req, res)=>{
    try{
        const product = await Product.findById(req.params.id)
        if(!product){
            res.status(404).json({
    message: "Product Not Found"
})        }
res.status(200).json(product)
    }
    catch(e){
        res.status(500).json(e.message)
    }
}

const updateProduct = async (req,res)=>{
    try{
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {new:true})
        if(!product){
            res.status(404).json({
    message: "Product Not Found"
})        }
res.status(200).json(product)
    }
    catch(e){
        res.status(500).json(e.message)
    }
}

const deleteProduct = async (req,res)=>{
    try{
    const product = await Product.findByIdAndDelete(req.params.id)
    if(!product){
            res.status(404).json({
    message: "Product Not Found"
})        }
res.status(200).json({
    message:"Product deleted successfully",
    product
})
    }
    catch(e){
        res.status(500).json(e.message)
    }
}

module.exports = {newProduct, getProduct, getProductById , updateProduct, deleteProduct}