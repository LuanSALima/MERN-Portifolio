import styled from 'styled-components';

export const ConfirmContainer = styled.div`
	display: flow-root !important;
`;

export const ConfirmContainerLabel = styled.label`
	width: 100%;
	text-align: center;
	font-size: 1.5rem;
`;

export const Button = styled.button`
	margin: 0.5rem 4% !important;
	width: 42% !important;
	float: left !important;
	font-size: 20px !important;
`;

export const AcceptButton = styled(Button)`
	border: 1px solid var(--success) !important;
	background-color: var(--success) !important;
	color: white !important;

	&:hover {
		background-color: white !important;
		color: var(--success) !important;
	}
`;

export const RejectButton = styled(Button)`
	border: 1px solid var(--danger) !important;
	background-color: var(--danger) !important;
	color: white !important;

	&:hover {
		background-color: white !important;
		color: var(--danger) !important;
	}
`;