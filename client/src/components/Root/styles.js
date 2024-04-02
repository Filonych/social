import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

export const Menu = styled.div`
	display: flex;
	gap: 15px;
	align-items: center;
	justify-content: space-between;
	max-width: 1200px;
	margin: 0 auto;
`

export const MenuLinks = styled.div`
	display: flex;
	gap: 15px;
	justify-content: space-between;
`

export const MenuItem = styled(NavLink)`
	color: black;
	text-decoration: none;

	&:hover {
		color: #ff6d2c;
	}

	&.active {
		color: #ff6d2c;
		font-weight: bold;
	}
`
