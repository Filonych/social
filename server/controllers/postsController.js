const PostsModel = require('../models/postsModel')
const UsersModel = require('../models/usersModel')

class PostsController {
	async getPosts(req, res) {
		try {
			const { _userId, _page } = req.query

			let result = []
			let totalCount = 0

			const page = parseInt(_page) || 1
			const adminId = '6616aae42dae08b279a06b43'

			if (_userId === adminId) {
				result = await PostsModel.find()
					.sort({ _id: -1 })
					.skip((page - 1) * 6)
					.limit(6)
				totalCount = await PostsModel.countDocuments({})
			}

			if (_userId === 'undefined') {
				result = await PostsModel.find({ isPrivate: false })
					.sort({ _id: -1 })
					.skip((page - 1) * 6)
					.limit(6)
				totalCount = await PostsModel.countDocuments({ isPrivate: false })
			}

			if (_userId !== 'undefined' && _userId !== adminId) {
				const user = await UsersModel.findOne({ _id: _userId })
				const friends = user.friends

				result = await PostsModel.find({
					$or: [
						{ authorId: _userId },
						{ author: { $in: friends } },
						{ isPrivate: false },
					],
				})
					.sort({ _id: -1 })
					.skip((page - 1) * 6)
					.limit(6)
				totalCount = await PostsModel.countDocuments({
					$or: [
						{ authorId: _userId },
						{ author: { $in: friends } },
						{ isPrivate: false },
					],
				})
			}

			res.status(200).json({
				posts: {
					metadata: {
						totalCount,
					},
					result,
				},
			})
		} catch (error) {
			res.status(400).json({ message: 'An error occurred while getting the posts' })
		}
	}

	async getPostById(req, res) {
		try {
			const post = await PostsModel.findOne({ _id: req.params.id })

			if (!post) {
				return res.status(404).json({ message: 'The post was not found' })
			}

			res.status(200).json({ post: post })
		} catch (e) {
			console.error(e)
			res.status(500).json({ message: 'An error occurred while getting the post' })
		}
	}

	async getPostsByAuthor(req, res) {
		try {
			let result = []
			const { _privatePosts } = req.query
			if (_privatePosts === 'false') {
				result = await PostsModel.find({
					author: req.body.author,
					isPrivate: false,
				})
			} else {
				result = await PostsModel.find({ author: req.body.author })
			}

			res.status(200).json({ posts: result })
		} catch (error) {
			res.status(400).json({ message: 'An error occurred while getting the posts' })
		}
	}

	async addPost(req, res) {
		try {
			const PostModel = new PostsModel({
				title: req.body.title,
				body: req.body.body,
				author: req.body.author,
				authorId: req.body.authorId,
				date: req.body.date,
				isPrivate: req.body.isPrivate,
			})

			await PostModel.save()
			res.status(200).json({ message: 'The post successfully added' })
		} catch (e) {
			res.status(400).json({ message: 'An error occurred while adding' })
		}
	}

	async deletePost(req, res) {
		try {
			const { deletedCount } = await PostsModel.deleteOne({
				_id: req.body.id,
			})

			if (deletedCount === 0) {
				res.status(400).json({
					message: 'The post was not deleted',
				})
				return
			}
			res.status(200).json({ message: 'Deleted successfully' })
		} catch (e) {
			res.status(400).json({ message: 'An error occurred while deleting the post' })
		}
	}

	async addComment(req, res) {
		try {
			const post = await PostsModel.findOneAndUpdate(
				{ _id: req.body.id },
				{
					$push: {
						comments: {
							body: req.body.body,
							author: req.body.author,
							date: req.body.date,
							id: req.body.commentId,
						},
					},
				},
				{ new: true }
			)

			if (!post) {
				return res
					.status(400)
					.json({ message: 'An error occurred while editing' })
			}

			res.status(200).json({ post: post })
		} catch (e) {
			res.status(400).json({ message: 'An error occurred while editing' })
		}
	}

	async likePost(req, res) {
		try {
			const post = await PostsModel.findOne({ _id: req.body.id })

			if (!post) {
				return res.status(400).json({ message: 'An error occurred' })
			}

			if (post.likes.includes(req.body.user)) {
				const index = post.likes.indexOf(req.body.user)
				post.likes.splice(index, 1)
			} else {
				post.likes.push(req.body.user)
			}

			await post.save()

			res.status(200).json({ post: post })
		} catch (e) {
			res.status(400).json({ message: 'An error occurred' })
		}
	}
}

module.exports = new PostsController()
