import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import EditAccount from '../EditAccount';

//Cannot use withRouter without <Router>
const MockEditAccount = (props) => {
	return (
		<BrowserRouter>
			<EditAccount />
		</BrowserRouter>
	);
}

//Testando se a página possui o cabeçalho e rodapé
it('should have header and footer rendered', () => {
	render(
		<MockEditAccount />
	);

	const headerElement = screen.getByTestId(/header/i);
	expect(headerElement).toBeInTheDocument();

	const footerElement = screen.getByTestId(/footer/i);
	expect(footerElement).toBeInTheDocument();
});