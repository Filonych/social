import styled from 'styled-components'

export const Post = styled.div`
	border-radius: 13px;
	max-width: 250px;
	width: 100%;
	height: 400px;
	background: #fdf3ea;
	padding: 51px;
	width: 21%;
	display: flex;
	justify-content: space-between;
	flex-direction: column;

	&:nth-child(6n + 1) {
		background: #fdf3ea;
	}

	&:nth-child(6n + 2) {
		background: #e0f8f2;
	}

	&:nth-child(6n + 3) {
		background: #eeecff;
	}

	&:nth-child(6n + 4) {
		background: #d9f2f7;
	}

	&:nth-child(6n + 5) {
		background: #faeded;
	}

	&:nth-child(6n + 6) {
		background: #f1f1f1;
	}
`

export const Details = styled.div`
	display: flex;
`

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

export const Title = styled.h2`
	font-weight: 700;
	font-size: 26px;
`

export const Body = styled.h2`
	font-weight: 500;
	font-size: 16px;
	line-height: 187%;
	color: #58595d;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 6;
	-webkit-box-orient: vertical;
`

export const Link = styled.div`
	display: flex;
	justify-content: flex-end;
	font-weight: 700;
	font-size: 15px;
	text-decoration: underline;
	color: #989898;
	cursor: pointer;
`
