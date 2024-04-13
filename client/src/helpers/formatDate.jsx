export const formatDate = () => {
	const options = { month: 'short', day: '2-digit', year: 'numeric' }
	const date = new Date()
	return date.toLocaleDateString('en-US', options)
}
