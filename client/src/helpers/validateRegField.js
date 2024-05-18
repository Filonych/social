export const validateRegField = (name, value, validationErrors, setValidationErrors) => {

    const MAX_LOGIN_LENGTH = 20

	const isValidUsername = username => /^[a-zA-Z0-9_-]+$/.test(username)

	const isValidEmail = email =>
		/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu.test(
			email
		)

	const isValidPassword = password =>
		/^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?/~`]+$/.test(password)

        switch (name) {
            case 'username':
                if (value.length > MAX_LOGIN_LENGTH) {
                    setValidationErrors({ ...validationErrors, username: 'The username is too long.' });
                } else if (!isValidUsername(value)) {
                    setValidationErrors({ ...validationErrors, username: 'The username format is not valid' });
                } else {
                    setValidationErrors({ ...validationErrors, username: null });
                }
                break;
            case 'email':
                if (!isValidEmail(value)) {
                    setValidationErrors({ ...validationErrors, email: 'The email format is not valid.' });
                } else {
                    setValidationErrors({ ...validationErrors, email: null });
                }
                break;
            case 'password':
                if (!isValidPassword(value)) {
                    setValidationErrors({ ...validationErrors, password: 'The password format is not valid.' });
                } else {
                    setValidationErrors({ ...validationErrors, password: null });
                }
                break;
            default:
                break;
        }
    };