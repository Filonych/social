const jwt = require('jsonwebtoken')
const { secret } = require('../config')

module.exports = function (roles) {
	return function (req, res, next) {
		if (req.method === 'OPTIONS') {
			next()
		}

		try {
			const token = req.headers.authorization.split(' ')[1]
			if (!token) {
				req.unauthorized = true
				return next()
			}
			const decodedData = jwt.verify(token, secret)
			req.user = decodedData

			const { roles: userRoles } = decodedData
			const hasRole = userRoles.some(role => roles.includes(role))
			if (!hasRole) {
				return res.status(403).json({ message: 'You do not have access' })
			}
			next()
		} catch (e) {
			console.log(e)
			return res.status(403).json({ message: 'User is not authorized' })
		}
	}
}
