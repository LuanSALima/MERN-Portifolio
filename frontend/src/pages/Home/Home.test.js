import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import Home from '../Home';

//Cannot use withRouter without <Router>
const MockHome = (props) => {
	return (
		<BrowserRouter>
			<Home />
		</BrowserRouter>
	);
}

//Testando se a página possui o cabeçalho e rodapé
it('should have header and footer rendered', () => {
	render(
		<MockHome />
	);

	const headerElement = screen.getByTestId(/header/i);
	expect(headerElement).toBeInTheDocument();

	const footerElement = screen.getByTestId(/footer/i);
	expect(footerElement).toBeInTheDocument();
});