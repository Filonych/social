const MAX_LENGTH = 20
const MAX_EMAIL_LENGTH = 35

const isValidUsername = username => /^[a-zA-Z0-9_-]+$/.test(username)
const isValidEmail = email =>
	/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu.test(
		email
	)
const isValidPassword = password =>
	/^[a-zA-Z0-9!@#$%^&*()_+{}[\]:;<>,.?/~`]+$/.test(password)

export const validateRegField = ({ username, email, password }) => {
	let validationErrors = {
		username: null,
		email: null,
		password: null,
	}

	if (!isValidUsername(username)) {
		validationErrors = {
			...validationErrors,
			username: 'The username format is not valid',
		}
	}

	if (!isValidEmail(email)) {
		validationErrors = {
			...validationErrors,
			email: 'The email format is not valid',
		}
	}

	if (!isValidPassword(password)) {
		validationErrors = {
			...validationErrors,
			password: 'The password format is not valid',
		}
	}

	if (username.length > MAX_LENGTH) {
		validationErrors = {
			...validationErrors,
			username: 'The username is too long',
		}
	}

	if (email.length > MAX_EMAIL_LENGTH) {
		validationErrors = {
			...validationErrors,
			email: 'The email is too long',
		}
	}

	if (password.length > MAX_LENGTH) {
		validationErrors = {
			...validationErrors,
			password: 'The password is too long',
		}
	}

	return validationErrors
}
