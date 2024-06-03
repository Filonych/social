const { Router } = require('express')
const usersController = require('../controllers/usersController')
const roleMiddleware = require('../middleware/roleMiddleware')
const adminMiddleware = require('../middleware/adminMiddleware')
const authMiddleware = require('../middleware/authMiddleware')

const usersRoutes = new Router()

usersRoutes.post('/add', usersController.regUser)
usersRoutes.post('/login', usersController.loginUser)
usersRoutes.post('/addFriend', authMiddleware, usersController.addFriend)
usersRoutes.post('/removeFriend', authMiddleware, usersController.removeFriend)
usersRoutes.get('/getFriends', roleMiddleware, usersController.getFriends)
usersRoutes.get('/checkAuth', usersController.checkAuth)
usersRoutes.get('/list', adminMiddleware, usersController.getUsers)

module.exports = usersRoutes
