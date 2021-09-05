import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import Unauthorized from '../Unauthorized';

//Cannot use withRouter without <Router>
const MockUnauthorized = (props) => {
	return (
		<BrowserRouter>
			<Unauthorized />
		</BrowserRouter>
	);
}

//Testando se a página possui o cabeçalho e rodapé
it('should have header and footer rendered', () => {
	render(
		<MockUnauthorized />
	);

	const headerElement = screen.getByTestId(/header/i);
	expect(headerElement).toBeInTheDocument();

	const footerElement = screen.getByTestId(/footer/i);
	expect(footerElement).toBeInTheDocument();
});

//Testando se a página possui um titulo
it('should have a heading with the page title', () => {
	render(
		<MockUnauthorized />
	);

	const titleElement = screen.getByRole('heading');
	expect(titleElement).toBeInTheDocument();
});