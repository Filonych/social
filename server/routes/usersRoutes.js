const { Router } = require('express')
const usersController = require('../controllers/usersController')

const usersRoutes = new Router()

usersRoutes.post('/add', usersController.regUser)
usersRoutes.post('/login', usersController.loginUser)
usersRoutes.get('/get', usersController.getUsers)
usersRoutes.post('/addFriend', usersController.addFriend)
usersRoutes.post('/removeFriend', usersController.removeFriend);

module.exports = usersRoutes
