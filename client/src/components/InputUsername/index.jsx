import { useState } from 'react'
import { Field } from '../ui/Field'
import { Input } from '../ui/Input'

export const InputUsername = ({ ...props }) => {

	return (
		<Field>
			<Input
				type='text'
				name='username'
				placeholder='Username'
				{...props}
			/>
		</Field>
	)
}
