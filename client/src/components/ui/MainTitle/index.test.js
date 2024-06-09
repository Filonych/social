import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import { MainTitle } from './index'

describe('MainTitle component', () => {
	test('рендерится корректно с текстом "Create account"', () => {
		render(<MainTitle first='Create' second='account' />)

		const firstTitleElement = screen.getByText(/Create/i)
		const secondTitleElement = screen.getByText(/account/i)

		expect(firstTitleElement).toBeInTheDocument()
		expect(secondTitleElement).toBeInTheDocument()
	})
})
