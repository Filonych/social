const { Router } = require('express')
const postsController = require('../controllers/postsController')
const authMiddleware = require('../middleware/authMiddleware')

const postsRoutes = new Router()

postsRoutes.get('/list', authMiddleware, postsController.getPosts)
postsRoutes.get('/list/:id', postsController.getPostById)
postsRoutes.post('/byAuthor', authMiddleware, postsController.getPostsByAuthor)
postsRoutes.post('/add', postsController.addPost)
postsRoutes.delete('/delete', postsController.deletePost)
postsRoutes.put('/edit', postsController.editPost)
postsRoutes.post('/comment', postsController.addComment)
postsRoutes.post('/likePost', postsController.likePost)

module.exports = postsRoutes
