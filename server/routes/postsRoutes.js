const { Router } = require('express')
const postsController = require('../controllers/postsController')
const roleMiddleware = require('../middleware/roleMiddleware')
const authMiddleware = require('../middleware/authMiddleware')

const postsRoutes = new Router()

postsRoutes.get(
	'/list',
	roleMiddleware(['ADMIN', 'USER']),
	postsController.getPosts
)
postsRoutes.get('/list/:id', postsController.getPostById)
postsRoutes.post(
	'/byAuthor',
	roleMiddleware(['ADMIN', 'USER']),
	postsController.getAuthorPosts
)
postsRoutes.post('/add', authMiddleware, postsController.addPost)
postsRoutes.delete('/delete', authMiddleware, postsController.deletePost)
postsRoutes.put('/edit', authMiddleware, postsController.editPost)
postsRoutes.post('/addComment', authMiddleware, postsController.addComment)
postsRoutes.post(
	'/deleteComment',
	authMiddleware,
	postsController.deleteComment
)
postsRoutes.post('/likePost', authMiddleware, postsController.likePost)

module.exports = postsRoutes
