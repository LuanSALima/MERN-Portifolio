import React, { useState } from 'react';

import { Container } from './styles';

import { ReactComponent as Visible } from '../../assets/visible.svg';
import { ReactComponent as NotVisible } from '../../assets/notvisible.svg';

function PasswordInput(props) {
	const [showPassword, setShowPassword] = useState(false);

	const changeShowPassword = () => {
		setShowPassword(!showPassword);
	}

	return (
		<Container>
			<input
				type={ (showPassword) ? 'text' : 'password' }
				name={props.name}
				value={props.value}
				onChange={props.onChange}
				onBlur={props.onBlur}
			/>
			{(showPassword)
			?
			<Visible onClick={changeShowPassword} />
			:
			<NotVisible onClick={changeShowPassword} />
			}
		</Container>
	);
}

export default PasswordInput;