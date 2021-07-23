import styled from 'styled-components';

export const Container = styled.div`
	width: 100%;
	padding: 5px 5px;
	background-color: white;
	box-shadow: 0 0.5px black;
	text-align: center;
`;

export const Text = styled.span`
	font-size: 18px;
`;

export const Button = styled.button`
	background: transparent;
	color: black;
	border: 2px solid black;
	font-size: 18px;
	letter-spacing: 3px;
	padding: 5px 15px;
	text-transform: uppercase;
	cursor: pointer;
	display: inline-block;
	margin: 5px 10px;

	transition: all 0.4s;

	&:hover {
		background-color: black;
		color: white;

		transition: all 0.4s;
	}
`;

export const SucessMessage = styled.h2`
	font-size: 20px;
	color: green;
`;

export const ErrorMessage = styled.h2`
	font-size: 20px;
	color: red;
`;

export const ProgressBar = styled.div`
	width: 100%;
	height: 5px;

	background:linear-gradient(to right, #aaaaf5, #0000ff);
	background-color: #ccc;
	
	background-size: 20%;
	background-repeat: repeat-y;
	background-position: -25% 0;

	animation: trajeto 1.2s ease-in-out infinite;

	@keyframes trajeto{
		50%{background-size: 60%}
		100%{background-position: 125% 0;}
	}

`;