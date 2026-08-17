const express = require('express')
const dotEnv = require('dotenv')
const {mongoose} = require('mongoose')
const app = express()

dotEnv.config()

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("DB Connected successfully")
}).catch(error=>{
    console.log('Error', error)
})