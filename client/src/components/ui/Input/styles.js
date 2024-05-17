import styled from 'styled-components'

export const Input = styled.input`
	width: 100%;
	outline: none;
	border: 1px solid #009387;
	box-sizing: border-box;
	border-color: ${({ className }) => (className === 'red' ? 'red' : '#009387')};
`
