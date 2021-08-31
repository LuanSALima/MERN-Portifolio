import styled from 'styled-components';

export const FooterContainer = styled.div`
	width: 100%;
	padding: 20px 5px;
	background-color: var(--color-dark);
	box-shadow: 0 0.5px var(--color-dark);
	text-align: center;
	
	flex-shrink: 0;

	span {
		color: white;
		margin-right: 10px;
	}

	a {
		color: var(--color-font-primary);
	}
`;