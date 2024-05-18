import styled from 'styled-components'

export const Post = styled.div`
	border-radius: 13px;
	min-height: 400px;
	background: #fdf3ea;
	padding: 35px;
	width: 25%;
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
export const DetailsWrap = styled.div`
	display: flex;
	flex-direction: column;
`

export const Details = styled.div`
	display: flex;
`
export const Title = styled.h2`
	font-weight: 700;
	font-size: 26px;
	margin: 0;
`

export const Body = styled.p`
text-align: left;
	font-weight: 500;
	font-size: 16px;
	line-height: 187%;
	color: #58595d;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 5;
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
