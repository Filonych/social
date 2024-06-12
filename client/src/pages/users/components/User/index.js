import React from 'react'
import * as SC from './styles'

export const User = ({ user }) => (
	<SC.User>
		<div>
			<SC.Details>
				Username:
				<SC.Username to={`/users/${user.username}`}>
					{user.username}
				</SC.Username>
			</SC.Details>
		</div>
		<SC.Details>{`Email: ${user.email}`}</SC.Details>
	</SC.User>
)
