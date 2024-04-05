const PostsModel = require('../models/postsModel')

class PostsController {
	async getPosts(req, res) {
		try {
			const result = await PostsModel.find({})
			res.status(200).json({ posts: result })
		} catch (error) {
			res.status(400).json({ message: 'Произошла ошибка при получении' })
		}
	}

	async getPostById(req, res) {
		try {
			const updatedPost = await PostsModel.findOne({ _id: req.params.id })

			if (!updatedPost) {
				return res.status(404).json({ message: 'Пост не найден' })
			}

			res.status(200).json({ post: updatedPost })
		} catch (e) {
			console.error(e)
			res.status(500).json({ message: 'Произошла ошибка при получении поста' })
		}
	}

	async getPostsByAuthor(req, res) {
		try {
			const result = await PostsModel.find({ author: req.body.author })

			res.status(200).json({ posts: result })
		} catch (error) {
			res.status(400).json({ message: 'Произошла ошибка при получении' })
		}
	}

	async addPost(req, res) {
		try {
			const PostModel = new PostsModel({
				title: req.body.title,
				body: req.body.body,
				author: req.body.author,
				date: req.body.date,
				isPrivate: req.body.isPrivate,
			})

			await PostModel.save()
			res.status(200).json({ message: 'Элемент успешно добавлен' })
		} catch (e) {
			res.status(400).json({ message: 'Произошла ошибка при добавлении' })
		}
	}

	async deletePost(req, res) {
		try {
			const { deletedCount } = await PostsModel.deleteOne({
				_id: req.body.id,
			})
			console.log('req.body.id', req.body.id)

			if (deletedCount === 0) {
				res.status(400).json({
					message: 'Удаление не произошло',
				})
				return
			}
			res.status(200).json({ message: 'Элемент успешно удален' })
		} catch (e) {
			res.status(400).json({ message: 'Произошла ошибка при удалении' })
		}
	}

	async addComment(req, res) {
		try {
			const updatedPost = await PostsModel.findOneAndUpdate(
				{ _id: req.body.id },
				{
						$push: {
								comments: {
										body: req.body.body,
										author: req.body.author,
										authorId: req.body.authorId,
										date: req.body.date,
								},
						},
				},
				{ new: true }
		);

			if (!updatedPost) {
				return res
					.status(400)
					.json({ message: 'Произошла ошибка при редактировании' })
			}

			res.status(200).json({ post: updatedPost })
		} catch (e) {
			res.status(400).json({ message: 'Произошла ошибка при редактировании' })
		}
	}
}

module.exports = new PostsController()
