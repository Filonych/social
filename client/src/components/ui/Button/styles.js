import styled from 'styled-components'

export const Button = styled.button`
	border: 2px solid #2e2f35;
	border-radius: 12px;
	padding: 14px 25px 12px 25px;
	box-shadow: 3px 3px 0 0 #2e2f35;
	background: ${({ className }) =>
		className === 'white' || className === 'danger' ? 'white' : '#ff6d2c'};
	padding: 5px 15px;
	border-radius: 10px;
	color: ${({ className }) =>
		className === 'white' || className === 'danger' ? 'black' : 'white'};
	cursor: pointer;

	&:not(:disabled):hover {
		background: ${({ className }) =>
			className === 'white'
				? '#ff6d2c'
				: className === 'danger'
				? 'red'
				: '#009387'};
		color: white;
	}

	&:not(:disabled):active {
		box-shadow: none;
		transform: translateY(2px);
	}

	&:disabled {
		opacity: 0.5;
		cursor: default;
	}
`
