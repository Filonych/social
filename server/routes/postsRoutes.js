const { Router } = require('express')
const postsController = require('../controllers/postsController')
const roleMiddleware = require('../middleware/roleMiddleware')
const authMiddleware = require('../middleware/authMiddleware')

const postsRoutes = new Router()


postsRoutes.get('/list', roleMiddleware, postsController.getPosts)
postsRoutes.get('/list/:id', postsController.getPostById)
postsRoutes.post('/byAuthor', roleMiddleware, postsController.getPostsByAuthor)
postsRoutes.post('/add', authMiddleware, postsController.addPost)
postsRoutes.delete('/delete', roleMiddleware, postsController.deletePost)
postsRoutes.put('/edit', roleMiddleware, postsController.editPost)
postsRoutes.post('/comment', authMiddleware, postsController.addComment)
postsRoutes.post('/likePost', authMiddleware, postsController.likePost)

module.exports = postsRoutes
