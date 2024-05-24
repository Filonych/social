const MAX_WORD_LENGTH = 20

export const validateTextField = (name, value, maxLength) => {
	const words = value.split(' ')
	const isLongWordExist = words.some(word => word.length > MAX_WORD_LENGTH)

	if (isLongWordExist) {
		return `${
			name === 'title' ? 'The title' : 'The text'
		} cannot contain words longer than ${MAX_WORD_LENGTH} characters.`
	} else if (!value.trim()) {
		return `${
			name === 'title' ? 'The title' : 'The text'
		} field cannot be empty.`
	} else if (value.length > maxLength) {
		return `${
			name === 'title' ? 'The title' : 'The text'
		} cannot be longer than ${maxLength} characters.`
	} else {
		return null
	}
}
