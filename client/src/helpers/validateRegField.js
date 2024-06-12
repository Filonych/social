const isValidUsername = username => {
	const lengthIsValid = username.length > 5 && username.length < 20
	const usernameRegex = /^[a-zA-Z0-9_-]+$/
	return lengthIsValid && usernameRegex.test(username)
}
const isValidEmail = email => {
	const lengthIsValid = email.length > 5 && email.length < 50
	const emailRegex =
		/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu
	return lengthIsValid && emailRegex.test(email)
}

const isValidPassword = password => {
	const lengthIsValid = password.length > 5 && password.length < 35
	const passwordRegex = /^[a-zA-Z0-9!@#$%^&*()_+{}[\]:;<>,.?/~`]+$/
	return lengthIsValid && passwordRegex.test(password)
}

export const validateRegField = ({ username, email, password }) => {
	let validationErrors = {
		usernameError: null,
		emailError: null,
		passwordError: null,
	}

	if (!isValidUsername(username)) {
		validationErrors = {
			...validationErrors,
			usernameError: 'The username format is not valid',
		}
	}

	if (!isValidEmail(email)) {
		validationErrors = {
			...validationErrors,
			emailError: 'The email format is not valid',
		}
	}

	if (!isValidPassword(password)) {
		validationErrors = {
			...validationErrors,
			passwordError: 'The password format is not valid',
		}
	}
	return validationErrors
}
