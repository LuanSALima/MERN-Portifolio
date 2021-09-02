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
				data-testid="input-element"
				type={ (showPassword) ? 'text' : 'password' }
				name={props.name}
				value={props.value}
				onChange={props.onChange}
				onBlur={props.onBlur}
			/>
			{(showPassword)
			?
			<Visible alt={"Click to Not Show Password"} onClick={changeShowPassword} />
			:
			<NotVisible alt={"Click to Show Password"} onClick={changeShowPassword} />
			}
		</Container>
	);
}

export default PasswordInput;