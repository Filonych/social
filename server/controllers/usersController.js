const UsersModel = require('../models/usersModel')

class UsersController {
	// async getUsers(req, res) {
	// 	try {
	// 		const result = await UsersModel.find({})
	// 		res.status(200).json({ users: result })
	// 	} catch (error) {
	// 		res.status(400).json({ message: 'An error occurred while getting users' })
	// 	}
	// }

	async regUser(req, res) {
		try {
			const userExists = await UsersModel.findOne({
				$or: [{ username: req.body.username }, { email: req.body.email }],
			})

			if (userExists) {
				return res.status(400).json({
					message: 'Email address or username already exists',
				})
			}
			const UserModel = new UsersModel({
				username: req.body.username,
				email: req.body.email,
				password: req.body.password,
			})

			await UserModel.save()
			res.status(200).json({ message: 'User successfully added' })
		} catch (e) {
			res.status(400).json({ message: 'Error occurred while adding' })
		}
	}

	async loginUser(req, res) {
		try {
			const user = await UsersModel.findOne({
				email: req.body.email,
				password: req.body.password,
			})

			if (!user) {
				return res.status(404).json({ message: 'User not found' })
			}

			res.status(200).json({ user })
		} catch (e) {
			console.error(e)
			res.status(500).json({ message: 'An error occurred while getting user' })
		}
	}

	async addFriend(req, res) {
		try {
			const user = await UsersModel.findOne({
				username: req.body.username,
			})

			if (!user) {
				return res
					.status(400)
					.json({ message: 'An error occurred while adding to friends' })
			}

			user.friends.push(req.body.friend)

			await user.save()

			res.status(200).json({ user })
		} catch (e) {
			res
				.status(400)
				.json({ message: 'An error occurred while adding to friends' })
		}
	}

	async removeFriend(req, res) {
		try {
			const user = await UsersModel.findOne({ username: req.body.username })

			if (!user) {
				return res.status(404).json({ message: 'User not found' })
			}

			user.friends = user.friends.filter(friend => friend !== req.body.friend)
			await user.save()

			res.status(200).json({ user })
		} catch (error) {
			console.error(error)
			res
				.status(500)
				.json({ message: 'An error occurred while deleting a friend' })
		}
	}
}

module.exports = new UsersController()
