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

const getAllUsers = async (req,res)=>{
    try{
    const user = await User.find()
    res.status(200).json({
        count:user.length,
        user
    })}catch(e){
        res.status(400).json(e.message)
    }

}

const usersById = async (req,res)=>{
    try{
 const user = await User.findById(req.params.id)
 if (!user){
    res.status(404).json({
        message: "User not found"
    })
 }
 res.status(200).json(user)
} catch(e){
    res.status(500).json({
        message: e.message
    })
}
}

const updateUser = async (req,res)=>{
    try{
    const user =await  User.findByIdAndUpdate(req.params.id, req.body, {new:false} )
    res.status(200).json(user)
    }catch(e){
        res.status(404).json({
            message: e.message
        })
    }
}

const deleteUser = async (req,res)=>{
    try{
    const user =await  User.findByIdAndDelete(req.params.id )
if(!user){
    res.status(404).json({
        message: "User not found"
    })
}

    res.status(200).json(user)
    }catch(e){
        res.status(404).json({
            message: e.message
        })
    }
}

module.exports = {createUser, getAllUsers,usersById,updateUser, deleteUser}