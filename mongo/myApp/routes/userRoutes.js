const express = require('express')
const router = express.Router()

const {createUser, getAllUsers, usersById, updateUser, deleteUser} = require('../controllers/userController')

router.post('/addUser/',createUser)
router.get('/', getAllUsers)
router.get('/:id', usersById)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

module.exports = router