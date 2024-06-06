const UsersModel = require('../models/usersModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { secret } = require('../config')

const generateAccessToken = (_id, username, isAdmin) => {
	const payload = {
		_id,
		username,
		isAdmin,
	}
	return jwt.sign(payload, secret)
}

class UsersController {
	async regUser(req, res) {
		try {
			const { username, email, password } = req.body
			const userExists = await UsersModel.findOne({
				$or: [{ username }, { email }],
			})

			if (userExists) {
				return res.status(400).json({
					message: 'Email address or username already exists',
				})
			}
			const hashPassword = bcrypt.hashSync(password, 7)
			const UserModel = new UsersModel({
				username,
				email,
				password: hashPassword,
			})

			await UserModel.save()
			res.status(200).json({ message: 'User successfully added' })
		} catch (e) {
			res.status(400).json({ message: 'Error occurred while adding' })
		}
	}

	async loginUser(req, res) {
		try {
			const { email, password } = req.body
			const user = await UsersModel.findOne({ email })

			if (!user) {
				return res.status(404).json({ message: 'User not found' })
			}
			const validPassword = bcrypt.compareSync(password, user.password)
			if (!validPassword) {
				return res.status(404).json({ message: 'Wrong password' })
			}
			const token = generateAccessToken(user._id, user.username, user.isAdmin)

			res.status(200).json({ user, token })
		} catch (e) {
			console.error(e)
			res.status(500).json({ message: 'An error occurred while getting user' })
		}
	}

	async checkAuth(req, res) {
		try {
			const token = req.headers.authorization?.split(' ')[1]

			if (!token) {
				return res.status(401).json({ message: 'Access token not provided' })
			}
			const userData = jwt.verify(token, secret)
			return res
				.status(200)
				.json({ message: 'Authentication successful', user: userData })
		} catch (e) {
			console.error(e)
		}
	}

	async getFriends(req, res) {
		try {
			const user = await UsersModel.findOne({
				_id: req.user._id,
			})

			if (!user) {
				return res
					.status(400)
					.json({ message: 'An error occurred while getting friends' })
			}

			const friends = user.friends

			res.status(200).json({ friends })
		} catch (e) {
			res
				.status(400)
				.json({ message: 'An error occurred while getting friends' })
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

	async getUsers(req, res) {
		try {
			const { _page } = req.query

			let totalCount = 0

			const page = parseInt(_page) || 1

			const result = await UsersModel.find()
				.sort({ _id: -1 })
				.skip((page - 1) * 10)
				.limit(10)

			totalCount = await UsersModel.countDocuments()

			res.status(200).json({
				users: {
					metadata: {
						totalCount,
					},
					result,
				},
			})
		} catch (error) {
			res
				.status(400)
				.json({ message: 'An error occurred while getting the users' })
		}
	}
}

module.exports = new UsersController()
