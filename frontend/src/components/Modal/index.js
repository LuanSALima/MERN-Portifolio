import React from 'react';

import { Fade, Content, Close } from './styles';

function Modal(props) {

	return (
		<Fade>
			<Content>
				<Close onClick={props.onClose}>&times;</Close>
				{props.children}
			</Content>
		</Fade>
	);
}

export default Modal;