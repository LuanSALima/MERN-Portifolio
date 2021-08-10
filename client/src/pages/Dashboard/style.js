import styled from 'styled-components';

export const Container = styled.div`
	width: 100%;
	min-height: 100vh;
	height: 100%;
	display: flex;
`;

export const Menu = styled.div`
	background-color: var(--color-dark);
	color: var(--color-font-primary);
	padding-top: 10px;

	@media(max-width: 995px) {
		height: ${(props)=>props.show?"100vh":"fit-content"};
		position: absolute;
	}
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

export const MenuCollapse = styled.div`
	display: block;

	@media(max-width: 995px) {
		display: ${(props)=>props.show?"block":"none"};
	}
`;

export const MenuToggle = styled.div`
	display: none;
	padding: 1rem 2rem;
	cursor: pointer;
	
	@media(max-width: 995px) {
		display: block;
	}
`;

export const TableContainer = styled.div`
	width: 100%;
	padding: 10px 25px;

	th, td {
		vertical-align: middle;
		padding: 1rem 0.5rem;
	}

	@media(max-width: 995px) {
		display: block;
		padding: 0;
		margin-top: 5rem;

		table{
			max-width: 100vh;
		}

		th, td {
			padding: 0.5rem 1rem;
		}
	}
`;