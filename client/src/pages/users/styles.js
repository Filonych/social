import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const Wrap = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 10px;
`

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
`

export const Simple = styled.span`
	text-align: left;
`
