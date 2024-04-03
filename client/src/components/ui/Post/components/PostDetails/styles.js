import styled from 'styled-components'

export const DetailsItem = styled.div`
	display: flex;
	align-items: center;

	&:after {
		content: '';
		display: block;
		width: 8px;
		height: 8px;
		border-radius: 4px;
		background-color: #444;
		margin: 0 10px;
	}

	&:last-child:after {
		display: none;
	}
`