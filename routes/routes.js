const express= require ("express")
const { updateuser, deleteUser } = require("../controllers/userControllers")
const { getUser, getAllUsers, addUser } = require("../controllers/userControllers")

const bankRouter= express.Router()

bankRouter.get('/users',getAllUsers )
bankRouter.get('/users/:id',getUser )
bankRouter.put('/users/:id', updateuser )
bankRouter.post('/users',addUser )
bankRouter.delete('/users/:id',deleteUser )

module.exports= bankRouter
