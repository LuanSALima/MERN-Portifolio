import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
	align-content: center;
	justify-content: center;

	@media(max-width: 995px) {
		display: block;
	}
`;

export const Content = styled.div`
	width: 400px;

	display:flex;
	flex-direction:column;

	margin: 1rem;
	padding: 20px;

	border: 1px solid var(--color-dark);
	box-shadow: 2px 2px 8px 1px var(--color-dark);

	h1 {
		font-size: 2rem;
		margin-bottom: 20px;
	}

	p {
		font-size: 1.25rem;
		margin-bottom: 30px;

		flex: 1 0 auto;
	}

	a {
		padding: 1vh 15vh;
		font-size: 18px;

		flex-shrink: 0;

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
		margin-bottom: 2rem;
		border: 0;
		display: grid;

		a {
			width: 100%;
			height: 40px;
		}

		h1 {
			font-size: 2.5rem;
		}

		p {
			font-size: 1.5rem;
		}
	}
`;