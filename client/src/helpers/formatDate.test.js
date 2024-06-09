import { formatDate } from './formatDate'

describe('formatDate', () => {
	test('дата форматируется корректно', () => {
		const options = { month: 'short', day: '2-digit', year: 'numeric' }
		const date = new Date()
		const expectedDate = date.toLocaleDateString('en-US', options)

		expect(formatDate()).toBe(expectedDate)
	})
})
