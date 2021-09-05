import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import ConfirmEmail from '../ConfirmEmail';

//Cannot use withRouter without <Router>
const MockConfirmEmail = (props) => {
	return (
		<BrowserRouter>
			<ConfirmEmail />
		</BrowserRouter>
	);
}

//Testando se a página possui o cabeçalho e rodapé
it('should have header and footer rendered', () => {
	render(
		<MockConfirmEmail />
	);

	const headerElement = screen.getByTestId(/header/i);
	expect(headerElement).toBeInTheDocument();

	const footerElement = screen.getByTestId(/footer/i);
	expect(footerElement).toBeInTheDocument();
});