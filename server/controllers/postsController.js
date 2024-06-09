const PostsModel = require('../models/postsModel')
const UsersModel = require('../models/usersModel')

class PostsController {
	async getPosts(req, res) {
		try {
			const { _page } = req.query

			let result = []
			let totalCount = 0

			const page = parseInt(_page) || 1
			if (req.unauthorized) {
				result = await PostsModel.find({ isPrivate: false })
					.sort({ _id: -1 })
					.skip((page - 1) * 6)
					.limit(6)
				totalCount = await PostsModel.countDocuments({ isPrivate: false })
			} else {
				const user = await UsersModel.findOne({ _id: req.user._id })
				const friends = user.friends
				const isAdmin = req.user.roles.includes('ADMIN')

				if (isAdmin) {
					result = await PostsModel.find()
						.sort({ _id: -1 })
						.skip((page - 1) * 6)
						.limit(6)
					totalCount = await PostsModel.countDocuments({})
				}

				if (!isAdmin) {
					result = await PostsModel.find({
						$or: [
							{ authorId: req.user._id },
							{ author: { $in: friends } },
							{ isPrivate: false },
						],
					})
						.sort({ _id: -1 })
						.skip((page - 1) * 6)
						.limit(6)
					totalCount = await PostsModel.countDocuments({
						$or: [
							{ authorId: req.user._id },
							{ author: { $in: friends } },
							{ isPrivate: false },
						],
					})
				}
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
			res
				.status(400)
				.json({ message: 'An error occurred while getting the posts' })
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
			res
				.status(500)
				.json({ message: 'An error occurred while getting the post' })
		}
	}

	async getPostsByAuthor(req, res) {
		try {
			const { author } = req.body
			let result = []
			const user = await UsersModel.findOne({ username: req.user?.username })

			const isAddedToFriends = user?.friends.includes(author)
			const isAdmin = user?.roles.includes('ADMIN')
			const isAuthor = author === req.user?.username

			if (isAdmin || isAddedToFriends || isAuthor) {
				result = await PostsModel.find({ author }).sort({
					_id: -1,
				})
			} else if (req.unauthorized || !isAddedToFriends) {
				result = await PostsModel.find({
					author: author,
					isPrivate: false,
				})
			}
			res.status(200).json({ posts: result, isAddedToFriends })
		} catch (error) {
			res
				.status(400)
				.json({ message: 'An error occurred while getting the posts' })
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
			const postToDelete = await PostsModel.findOne({ _id: req.body.id })

			const isAuthor = postToDelete.author === req.body.username
			const isAdmin = req.user.roles.includes('ADMIN')

			if (isAuthor || isAdmin) {
				const { deletedCount } = await PostsModel.deleteOne({
					_id: req.body.id,
				})

				if (deletedCount === 0) {
					res.status(400).json({
						message: 'The post was not deleted',
					})
					return
				}
				return res.status(200).json({ message: 'Deleted successfully' })
			}
			return res.status(400).json({
				message: 'The post was not deleted',
			})
		} catch (e) {
			res
				.status(400)
				.json({ message: 'An error occurred while deleting the post' })
		}
	}

	async editPost(req, res) {
		try {
			const postToEdit = await PostsModel.findOne({ _id: req.body._id })
			const isAuthor = postToEdit.author == req.user.username

			if (!isAuthor) {
				return res.status(400).json({
					message: 'The post was not edited',
				})
			}
			const updatedPost = await PostsModel.findOneAndUpdate(
				{ _id: req.body._id },
				{
					title: req.body.title,
					body: req.body.body,
					isPrivate: req.body.isPrivate,
				},
				{ new: true }
			)

			if (!updatedPost) {
				return res.status(400).json({ message: 'The post was not edited' })
			}

			res.status(200).json({ message: 'Edited successfully' })
		} catch (e) {
			res
				.status(400)
				.json({ message: 'An error occurred while editing the post' })
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
			const comments = post.comments
			res.status(200).json({ comments })
		} catch (e) {
			res.status(400).json({ message: 'An error occurred while editing' })
		}
	}

	async deleteComment(req, res) {
		try {
			const post = await PostsModel.findOne({ _id: req.body.postId })
			const user = await UsersModel.findOne({ username: req.body.user })
			if (!post) {
				return res.status(404).json({ message: 'Post not found' })
			}

			const comment = post.comments.find(
				comment => comment.id === req.body.commentId
			)
			const isAuthor = comment.author === req.body.user
			const isAdmin = user.isAdmin

			if (isAuthor || isAdmin) {
				post.comments = post.comments.filter(
					comment => comment.id !== req.body.commentId
				)
				await post.save()

				const comments = post.comments
				res.status(200).json({ comments })
			}
		} catch (e) {
			res
				.status(400)
				.json({ message: 'An error occurred while deleting the post' })
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
