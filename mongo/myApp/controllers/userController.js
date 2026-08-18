const User = require('../models/userModes')

const createUser = async (req,res)=>{
    try{
        const {name, email, password} = req.body
    const user = new User({
        name, email, password
    })
    const savedUser = await user.save() 
    res.status(201).json(savedUser)
    }
    catch(err){
        res.status(400).json(err)
    }
}

module.exports = {createUser}