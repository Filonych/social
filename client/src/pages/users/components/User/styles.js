import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const User = styled.div`
	display: flex;
	flex-direction: column;
`

export const Username = styled(Link)`
	display: flex;
	font-weight: 700;
	font-size: 15px;
	color: #989898;
	cursor: pointer;
	margin-left: 7px;
`

export const Details = styled.span`
	display: flex;
`