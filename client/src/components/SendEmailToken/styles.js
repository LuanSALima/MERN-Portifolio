import styled from 'styled-components';

export const Container = styled.div`
	width: 100%;
	padding: 5px 5px;
	background-color: var(--color-neutral);
	box-shadow: 0 0.5px var(--color-dark);
	text-align: center;
`;

export const Text = styled.span`
	font-size: 18px;
	color: var(--color-font-primary);
	cursor: default;
`;

export const Button = styled.button`
	background: transparent;
	color: black;
	border: 2px solid var(--color-dark);
	font-size: 18px;
	letter-spacing: 3px;
	padding: 5px 15px;
	text-transform: uppercase;
	cursor: pointer;
	display: inline-block;
	margin: 5px 10px;

	transition: all 0.4s;

	&:hover {
		background-color: var(--color-dark);
		color: var(--color-font-primary);
		border: 2px solid var(--color-dark);

		transition: all 0.4s;
	}

	&:disabled {
		background-color: var(--color-light);
		color: var(--color-font-secondary);
		border: 2px solid var(--color-neutral);

		cursor: default;
	}
`;