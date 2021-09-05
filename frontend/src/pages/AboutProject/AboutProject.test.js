import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import AboutProject from '../AboutProject';

//Cannot use withRouter without <Router>
const MockAboutProject = (props) => {
	return (
		<BrowserRouter>
			<AboutProject />
		</BrowserRouter>
	);
}

//Testando se a página possui o cabeçalho e rodapé
it('should have header and footer rendered', () => {
	render(
		<MockAboutProject />
	);

	const headerElement = screen.getByTestId(/header/i);
	expect(headerElement).toBeInTheDocument();

	const footerElement = screen.getByTestId(/footer/i);
	expect(footerElement).toBeInTheDocument();
});