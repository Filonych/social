const MAX_LENGTH = 20

const isValidUsername = username => /^[a-zA-Z0-9_-]+$/.test(username)
const isValidEmail = email =>
	/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu.test(
		email
	)
const isValidPassword = password =>
	/^[a-zA-Z0-9!@#$%^&*()_+{}[\]:;<>,.?/~`]+$/.test(password)

export const validateRegField = (name, value) => {
	const validateUsername = username => {
		if (!isValidUsername(username)) {
			return 'The username format is not valid'
		} else {
			return null
		}
	}

	const validateEmail = email => {
		if (!isValidEmail(email)) {
			return 'The email format is not valid'
		} else {
			return null
		}
	}

	const validatePassword = password => {
		if (!isValidPassword(password)) {
			return 'The password format is not valid'
		} else {
			return null
		}
	}

	if (value.length > MAX_LENGTH) {
		return `The ${name} is too long.`
	}

	switch (name) {
		case 'username':
			return validateUsername(value)
		case 'email':
			return validateEmail(value)
		case 'password':
			return validatePassword(value)
		default:
			return false
	}
}
