const { Router } = require('express')
const usersController = require('../controllers/usersController')
const authMiddleware = require('../middleware/authMiddleware')

const usersRoutes = new Router()

usersRoutes.post('/add', usersController.regUser)
usersRoutes.post('/login', usersController.loginUser)
usersRoutes.post('/addFriend', usersController.addFriend)
usersRoutes.post('/removeFriend', usersController.removeFriend)
usersRoutes.get('/getFriends', authMiddleware, usersController.getFriends)
usersRoutes.get('/checkAuth', usersController.checkAuth)

module.exports = usersRoutes
