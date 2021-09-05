import { render, screen } from '@testing-library/react';

import Footer from '../Footer';

//Testando se possui data-testid
it('should receive and access the data-testid received by prop', () => {
	const dataTestId = 'footer';
	render(
		<Footer i18nT={key => key} />
	);

	const rootElement = screen.getByTestId(dataTestId);
	expect(rootElement).toBeInTheDocument();
})

//Testando se o Link para o GitHub está presente no Rodapé
it('should render the title passed by title prop', () => {
	const github = "https://github.com/LuanSALima/MERN-Portifolio";
	render(
		<Footer i18nT={key => key} />
	);

	const githubLink = screen.getByRole('link', { name: github });
	expect(githubLink).toBeInTheDocument();
});