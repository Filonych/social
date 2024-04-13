import React from 'react'
import * as SC from './styles'

export const MainTitle = ({ first, second }) => (
	<div>
		<SC.FirstTitle>
			{`${first} `}
			<SC.SecondTitle>{second}</SC.SecondTitle>
		</SC.FirstTitle>
	</div>
)
