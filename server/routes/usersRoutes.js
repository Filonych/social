const { Router } = require('express')
const usersController = require('../controllers/usersController')

const usersRoutes = new Router()

usersRoutes.post('/add', usersController.regUser)
// usersRoutes.get("/get", usersController.checkUser);
usersRoutes.get('/get', usersController.getUsers)
// usersRoutes.delete("/delete", usersController.deletePost);

module.exports = usersRoutes
