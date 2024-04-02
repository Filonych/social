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

	// async addPost(req, res) {
	//   try {
	//     const PostModel = new PostsModel({
	//       title: req.body.title,
	//       body: req.body.body,
	//       id: req.body.id,
	//     });

	//     await PostModel.save();
	//     res.status(200).json({ message: "Элемент успешно добавлен" });
	//   } catch (e) {
	//     res.status(400).json({ message: "Произошла ошибка при добавлении" });
	//   }
	// }

	// async deletePost(req, res) {
	//   try {
	//     const { deletedCount } = await PostsModel.deleteOne({
	//       id: req.body.id,
	//     });

	//     if (deletedCount === 0) {
	//       res.status(400).json({
	//         message: "Удаление не произошло, пожалуйста, проверьте заголовок",
	//       });
	//       return;
	//     }
	//     res.status(200).json({ message: "Элемент успешно удален" });
	//   } catch (e) {
	//     res.status(400).json({ message: "Произошла ошибка при удалении" });
	//   }
	// }
}

module.exports = new PostsController()
