import styled from 'styled-components';

export const Container = styled.div`
	width: 100%;
	min-height: 80vh;
	height: 100%;
	display: flex;
`;

export const Menu = styled.div`
	background-color: var(--color-dark);
	color: var(--color-font-primary);
	padding-top: 10px;
`;

export const MenuItem = styled.span`
	background: transparent;
	border: 2px solid transparent;
	font-size: 15px;
	letter-spacing: 3px;
	padding: 10px 20px;
	text-transform: uppercase;
	cursor: pointer;
	display: inline-block;

	transition: all 0.4s;

	&:hover {
		background-color: var(--color-light);
		color: var(--color-font-secondary);

		transition: all 0.4s;
	}
`;