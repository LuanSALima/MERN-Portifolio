import styled from 'styled-components';

export const Page = styled.div`
	width: 100%;
	min-height: 100vh;
	background-color: var(--color-light);
`;

export const Content = styled.div`
	text-align: center;
`;

export const CenterContent = styled.div`
	text-align: center;
	padding: 25px 50px;

	@media(max-width: 995px) {
		width: 100%;
		padding: 0;
	}
`;

export const Title = styled.h1`
	font-size: 35px;
	font-weight: 700;
	color: var(--color-font-primary);
	cursor: default;
	padding: 20px 0;

	@media(max-width: 995px) {
		font-size: 2rem;
	}
`;

export const SucessMessage = styled.h2`
	font-size: 1.5rem;
	color: var(--color-font-success);
`;

export const ErrorMessage = styled.h2`
	font-size: 1.5rem;
	color: var(--color-font-error);
`;

export const Form = styled.form`
	width: 60%;
	padding: 20px 50px;
    margin: 0 auto;
	border: 1px solid var(--color-dark);
	box-shadow: 2px 2px 8px 1px var(--color-dark);

	display: block;

	input {
		width: 100%;
		height: 40px;
		padding: 5px 20px;

		font-size: 18px;
	}

	input:focus {
		font-size: 20px;
		font-weight: 500;

		box-shadow: 0 0 0 0.09rem var(--color-dark);
	}

	input:focus-visible {
		outline: 0; 
	}

	label {
		font-size: 22px;
		font-weight: 600;
	}

	input[type="submit"], button {
		width: 60%;
		padding: 0 20px;
		font-size: 18px;

		margin: 10px 0;

		background-color: var(--color-dark);
		color: var(--color-font-primary);
		border: 1px solid var(--color-dark);

		transition: all 0.2s;
	}

	input[type="submit"]:hover, button:hover {
		background-color: var(--color-light);
		color: var(--color-font-secondary);
		border: 1px solid var(--color-dark);

		transition: all 0.2s;
	}

	input[type="submit"]:disabled, button:disabled {
		background-color: var(--color-neutral);
		color: var(--color-font-secondary);
		border: 1px solid var(--color-light);

		transition: all 0.2s;
	}

	@media(max-width: 995px) {
		width: 100%;
		padding: 0 1rem;
		border: 0;
		box-shadow: none;

		input[type="submit"], button {
			width: 100%;
			height: 3rem;
		}
	}
`;

export const FormGroup = styled.div`
	display: flex;
    flex-direction: column;
    text-align: start;
    margin: 20px 0;
`;

export const ProgressBar = styled.div`
	width: 100%;
	height: 5px;

	background:linear-gradient(to right, var(--color-font-primary), var(--color-font-secondary));
	background-color: var(--color-light);
	
	background-size: 20%;
	background-repeat: repeat-y;
	background-position: -25% 0;

	animation: trajeto 1.2s ease-in-out infinite;

	@keyframes trajeto{
		50%{background-size: 60%}
		100%{background-position: 125% 0;}
	}

`;