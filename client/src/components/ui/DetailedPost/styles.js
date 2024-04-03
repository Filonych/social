import styled from 'styled-components'

export const DetailedPost = styled.div`
    display: flex;
    flex-direction: column;
`

export const Details = styled.div`
	display: flex;
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
