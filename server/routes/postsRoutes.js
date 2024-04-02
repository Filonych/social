const { Router } = require('express')
const postsController = require('../controllers/postsController')

const postsRoutes = new Router()

postsRoutes.get('/list', postsController.getPosts)
postsRoutes.get('/list/:id', postsController.getPostById)
// postsRoutes.post("/add", postsController.addPost);
// postsRoutes.delete("/delete", postsController.deletePost);

module.exports = postsRoutes
