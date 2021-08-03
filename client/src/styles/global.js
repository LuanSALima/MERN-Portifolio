import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

*{
	label,h1,h2,h3,h4,h5,h6{
		cursor: default;
	}

	label,h1{
		color: var(--color-font-primary);
	}

	p, span {
		color: var(--color-font-secondary);
	}

	a {
		text-decoration: none;
		color: var(--color-font-primary);
	}

	a:hover {
		text-decoration: none;
		color: var(--color-font-secondary);
	}

	button {
		padding: 10px 20px;

		color: var(--color-font-primary);
		background-color: var(--color-dark);
		border: 1px solid var(--color-light);

		transition: all 0.4s;
	}

	button:hover {
		color: var(--color-font-secondary);
		background-color: var(--color-light);
		border: 1px solid var(--color-dark);

		transition: all 0.4s;
	}

	button:disabled {
		color: var(--color-font-secondary);
		background-color: var(--color-light);
		border: 1px solid var(--color-neutral);

		cursor: default;
	}
}

:root {
	--color-dark: #161d20;
	--color-neutral: #a4a29e;
	--color-light: #cccccc;

	--color-font-primary: #2d7c9d;
	--color-font-secondary: #36498f;

	--color-font-success: #28a745;
    --color-font-error: #dc3545;
}

`;