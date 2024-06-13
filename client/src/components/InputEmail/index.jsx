import { useState } from 'react'
import { Field } from '../ui/Field'
import { Input } from '../ui/Input'

export const InputEmail = ({ ...props }) => {

	return (
		<Field>
			<Input
				type='email'
				name='email'
				placeholder='E-mail'
				{...props}
			/>
		</Field>
	)
}
