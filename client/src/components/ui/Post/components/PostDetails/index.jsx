import React from 'react'
import * as SC from './styles'

export const PostDetails = ({ children, ...rest }) => (
	<SC.PostDetails {...rest}>{children}</SC.PostDetails>
)
