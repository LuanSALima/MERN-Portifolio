import React from 'react';

import { Fade, Content, Close } from './styles';

function Modal(props) {

	return (
		<Fade data-testid={props.testid}>
			<Content role="dialog">
				<Close aria-label="Close Modal" onClick={props.onClose}>&times;</Close>
				{props.children}
			</Content>
		</Fade>
	);
}

export default Modal;