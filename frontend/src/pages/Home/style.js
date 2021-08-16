import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
	align-content: center;

	@media(max-width: 995px) {
		display: block;
	}
`;

export const Content = styled.div`
	width: 400px;
	min-height: 50vh;

	margin: 1rem;
	padding: 20px;

	border: 1px solid var(--color-dark);
	box-shadow: 2px 2px 8px 1px var(--color-dark);

	h1 {
		font-size: 2.5rem;
		margin-bottom: 20px;
	}

	p {
		font-size: 1.5rem;
		margin-bottom: 60px;
	}

	a {
		padding: 1vh 15vh;
		font-size: 18px;

		margin: 10px 0;

		background-color: var(--color-dark);
		color: var(--color-font-primary);
		border: 1px solid var(--color-dark);

		transition: all 0.2s;
	}

	a: hover {
		background-color: var(--color-light);
		color: var(--color-font-secondary);
		border: 1px solid var(--color-dark);

		transition: all 0.2s;
	}

	@media(max-width: 995px) {
		width: 100%;

		margin: 0;
		margin-top: 1rem;
		display: grid;

		a {
			width: 100%;
			height: 40px;
		}
	}
`;