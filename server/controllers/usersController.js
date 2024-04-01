const UsersModel = require('../models/usersModel')

class UsersController {
	async getUsers(req, res) {
		try {
			const result = await UsersModel.find({})
			res.status(200).json({ users: result })
		} catch (error) {
			res.status(400).json({ message: 'Произошла ошибка при получении' })
		}
	}

	// async checkUser(req, res) {
	// 	try {
	// 		const { email } = req.body
	// 		const existingUser = await UsersModel.findOne({ email })

	// 		if (existingUser) {
	// 			res.status(200).json({ message: 'User exists' })
	// 		} else {
	// 			res.status(404).json({ message: 'User not found' })
	// 		}
	// 	} catch (error) {
	// 		console.error('Error while checking user existence:', error)
	// 		res.status(500).json({ message: 'Internal server error' })
	// 	}
	// }

	async regUser(req, res) {
		try {
			const UserModel = new UsersModel({
				username: req.body.username,
				email: req.body.email,
				password: req.body.password,
			})

			await UserModel.save()
			res.status(200).json({ message: 'Пользователь успешно добавлен' })
		} catch (e) {
			res.status(400).json({ message: 'Произошла ошибка при добавлении' })
		}
	}

	//   async deletePost(req, res) {
	//     try {
	//       const { deletedCount } = await PostsModel.deleteOne({
	//         id: req.body.id,
	//       });

	//       if (deletedCount === 0) {
	//         res.status(400).json({
	//           message: "Удаление не произошло, пожалуйста, проверьте заголовок",
	//         });
	//         return;
	//       }
	//       res.status(200).json({ message: "Элемент успешно удален" });
	//     } catch (e) {
	//       res.status(400).json({ message: "Произошла ошибка при удалении" });
	//     }
	//   }

	//   async editPost(req, res) {
	//     try {
	//       const updatedPost = await PostsModel.findOneAndUpdate(
	//         { id: req.body.id },
	//         { title: req.body.title, body: req.body.body },
	//         { new: true }
	//       );

	//       if (!updatedPost) {
	//         return res
	//           .status(400)
	//           .json({ message: "Произошла ошибка при редактировании" });
	//       }

	//       res.status(200).json({ message: "Элемент успешно отредактирован" });
	//     } catch (e) {
	//       res.status(400).json({ message: "Произошла ошибка при редактировании" });
	//     }
	//   }

	//   async getPostById(req, res) {
	//     try {
	//       const updatedPost = await PostsModel.findOne({ id: req.params.id });

	//       if (!updatedPost) {
	//         return res.status(404).json({ message: "Пост не найден" });
	//       }

	//       res.status(200).json({ post: updatedPost });
	//     } catch (e) {
	//       console.error(e);
	//       res.status(500).json({ message: "Произошла ошибка при получении поста" });
	//     }
	//   }
}

module.exports = new UsersController()
