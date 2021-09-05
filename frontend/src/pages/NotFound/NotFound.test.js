import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import NotFound from '../NotFound';

//Cannot use withRouter without <Router>
const MockNotFound = (props) => {
	return (
		<BrowserRouter>
			<NotFound />
		</BrowserRouter>
	);
}

//Testando se a página possui o cabeçalho e rodapé
it('should have header and footer rendered', () => {
	render(
		<MockNotFound />
	);

	const headerElement = screen.getByTestId(/header/i);
	expect(headerElement).toBeInTheDocument();

	const footerElement = screen.getByTestId(/footer/i);
	expect(footerElement).toBeInTheDocument();
});

//Testando se a página possui um titulo
it('should have a heading with the page title', () => {
	render(
		<MockNotFound />
	);

	const titleElement = screen.getByRole('heading');
	expect(titleElement).toBeInTheDocument();
});