import { render, screen } from '@testing-library/react';

import Footer from '../Footer';

//Testando se o Link para o GitHub está presente no Rodapé
it('should render the title passed by title prop', () => {
	const github = "https://github.com/LuanSALima/MERN-Portifolio";
	render(
		<Footer i18nT={key => key} />
	);

	const githubLink = screen.getByRole('link', { name: github });
	expect(githubLink).toBeInTheDocument();
});