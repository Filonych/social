import styled from 'styled-components'

export const CommentWrap = styled.div`
	display: flex;
	gap: 15px;
	justify-content: flex-start;
	padding: 15px;
	border-radius: 10px;

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

export const CommentText = styled.div`
	border-left: 5px solid #fff;
	padding-left: 15px;
	text-align: left;
`
export const PostDetailsWrap = styled.div`
	display: flex;
	max-width: 300px;
	width: 100%;
`

export const ButtonWrap = styled.div`
	margin-left: auto;
`
