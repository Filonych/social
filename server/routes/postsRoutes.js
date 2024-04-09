const { Router } = require('express')
const postsController = require('../controllers/postsController')

const postsRoutes = new Router()

postsRoutes.get('/list', postsController.getPosts)
postsRoutes.get('/list/:id', postsController.getPostById)
postsRoutes.post('/byAuthor', postsController.getPostsByAuthor)
postsRoutes.post("/add", postsController.addPost);
postsRoutes.delete("/delete", postsController.deletePost);
postsRoutes.post("/comment", postsController.addComment);
postsRoutes.post("/likePost", postsController.likePost);

module.exports = postsRoutes
