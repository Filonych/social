import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

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