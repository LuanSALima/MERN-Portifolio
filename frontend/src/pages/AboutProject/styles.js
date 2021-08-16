import styled from 'styled-components';

export const AccordionHeader = styled.div`
	padding: .75rem 1.25rem;
	cursor: pointer;

	font-size: 26px;
	color: var(--color-font-secondary);

	background-color: var(--color-dark);
	border-bottom: 2px solid var(--color-neutral);

	&:hover {
		background-color: var(--color-neutral);
		color: var(--color-font-primary);
		border-bottom: 2px solid var(--color-neutral);

		transition: all 0.4s;
	}
`;

export const AccordionSubHeader = styled(AccordionHeader)`
	font-size: 24px;
	border: 0;

	&:hover {
		border: 0;
	}
`;

export const AccordionBody = styled.div`
	padding: 20px 25px;
	background-color: var(--color-dark);
`;

export const Text = styled.span`
	font-size: 18px;
	color: var(--color-font-primary);
	cursor: default;

	margin-bottom: 1rem;
	display: block;
	text-align: left;
`;

export const TextContainer = styled.div`
	margin-top: 20px;
	margin-bottom: 40px;
`;

export const PackageTitle = styled.h2`
	font-size: 22px;

	color: var(--color-font-primary);
`;

export const PackageContainer = styled.div`
	margin-top: 20px;
	margin-bottom: 50px;
`;