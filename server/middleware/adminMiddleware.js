const jwt = require('jsonwebtoken')
const { secret } = require('../config')

module.exports = function (req, res, next) {
	if (req.method === 'OPTIONS') {
		next()
	}

	try {
		const token = req.headers.authorization.split(' ')[1]
		if (!token) {
			return res.status(403).json({ message: 'User is not authorised' })
		}
		const decodedData = jwt.verify(token, secret)
		if (decodedData.isAdmin) {
			next()
		}
		return res.status(403).json({ message: 'You do not have access' })
	} catch (e) {
		console.log(e)
		return res.status(403).json({ message: 'User is not authorized' })
	}
}
