const express = require('express')
const dotEnv = require('dotenv')
const {mongoose} = require('mongoose')
const userRoutes = require('./routes/userRoutes')
const productRoutes = require('./routes/productRoutes')
const app = express()

app.use(express.json())
app.use('/users/', userRoutes)
app.use('/products/', productRoutes)

dotEnv.config()

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("DB Connected successfully")
}).catch(error=>{
    console.log('Error', error)
})

app.listen(3000,()=>{
    console.log("server started at http://localhost:3000")
})