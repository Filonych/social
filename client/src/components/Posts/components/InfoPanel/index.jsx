import React from 'react'
import * as SC from './styles'

export const InfoPanel = ({ children, ...rest }) => (
	<SC.InfoPanel {...rest}>{children}</SC.InfoPanel>
)
