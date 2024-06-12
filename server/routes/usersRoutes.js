const { Router } = require('express')
const usersController = require('../controllers/usersController')
const roleMiddleware = require('../middleware/roleMiddleware')
const authMiddleware = require('../middleware/authMiddleware')

const usersRoutes = new Router()

usersRoutes.post('/add', usersController.regUser)
usersRoutes.post('/login', usersController.loginUser)
usersRoutes.get('/checkAuth', usersController.checkAuth)
usersRoutes.post('/addFriend', authMiddleware, usersController.addFriend)
usersRoutes.post('/removeFriend', authMiddleware, usersController.removeFriend)
usersRoutes.get('/list', roleMiddleware(['ADMIN']), usersController.getUsers)

module.exports = usersRoutes
