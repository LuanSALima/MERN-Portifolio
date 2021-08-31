import React from 'react';

import { ConfirmContainer, ConfirmContainerLabel, AcceptButton, RejectButton } from './styles';

function ConfirmBox(props) {

	return (
		<ConfirmContainer>
			<ConfirmContainerLabel>
				{props.title?
					props.title
					:
					props.i18nT('ConfirmBox.text')
				}
			</ConfirmContainerLabel>
			<AcceptButton
				type="submit"
				onClick={props.onAccept}
			>
				{props.acceptText?
					props.acceptText
					:
					props.i18nT('ConfirmBox.accept')
				}
			</AcceptButton>
			<RejectButton onClick={props.onRecuse}>
				{props.recuseText?
					props.recuseText
					:
					props.i18nT('ConfirmBox.recuse')
				}
			</RejectButton>
		</ConfirmContainer>
	);
}

export default ConfirmBox;