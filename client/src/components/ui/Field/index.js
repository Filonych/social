import React from 'react'
import * as SC from './styles'

export const Field = ({ children, ...rest }) => (
	<SC.Field {...rest}>{children}</SC.Field>
)
