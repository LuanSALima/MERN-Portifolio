import styled from 'styled-components';

export const Fade = styled.div`

	width: 100%;
	height: 100%;
	z-index: 1000;

	position: fixed;
	background-color: rgba(0,0,0,0.4);

	top: 0;
	left: 0;
	
	overflow: auto;
`;

export const Content = styled.div`
	width: fit-content;
	background-color: #fefefe;
	margin: 15% auto;
	padding: 20px;
	border: 1px solid var(--color-dark);
	box-shadow: 2px 2px 8px 1px var(--color-dark);
`;

export const Close = styled.button`
	all: initial;

	position: relative;
	top: -1.4rem;

	color: #aaa;
	float: right;
	font-size: 30px;
	font-weight: bold;

	&:hover,
	&:focus {
		background-color: unset;
		border: none;
		color: black;
		text-decoration: none;
		cursor: pointer;
	}
  `;