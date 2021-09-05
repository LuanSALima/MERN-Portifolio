import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import EditUser from '../EditUser';

//Cannot use withRouter without <Router>
const MockEditUser = (props) => {
	return (
		<BrowserRouter>
			<EditUser />
		</BrowserRouter>
	);
}

//Testando se a página possui o cabeçalho e rodapé
it('should have header and footer rendered', () => {
	render(
		<MockEditUser />
	);

	const headerElement = screen.getByTestId(/header/i);
	expect(headerElement).toBeInTheDocument();

	const footerElement = screen.getByTestId(/footer/i);
	expect(footerElement).toBeInTheDocument();
});


//Testando se a página possui input para nome e um botão para submit
it('should have a username input and a submit button', () => {
	render(
		<MockEditUser />
	);

	const inputUsernameElement = screen.getByLabelText(/nome:/i);
	expect(inputUsernameElement).toBeInTheDocument();

	const submitButtonElement = screen.getByRole('button', { name: /editar/i });
	expect(submitButtonElement).toBeInTheDocument();
});