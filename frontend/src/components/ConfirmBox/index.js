import React from 'react';

import { ConfirmContainer, ConfirmContainerLabel, AcceptButton, RejectButton } from './styles';

function ConfirmBox(props) {

	const t = props.i18nT;

	return (
		<ConfirmContainer>
			<ConfirmContainerLabel>
				{props.title?
					props.title
					:
					t('ConfirmBox.text')
				}
			</ConfirmContainerLabel>
			<AcceptButton
				type="submit"
				onClick={props.onAccept}
			>
				{props.acceptText?
					props.acceptText
					:
					t('ConfirmBox.accept')
				}
			</AcceptButton>
			<RejectButton onClick={props.onRecuse}>
				{props.recuseText?
					props.recuseText
					:
					t('ConfirmBox.recuse')
				}
			</RejectButton>
		</ConfirmContainer>
	);
}

export default ConfirmBox;