import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import SignUp from '../SignUp';

//Cannot use withRouter without <Router>
const MockSignUp = (props) => {
	return (
		<BrowserRouter>
			<SignUp />
		</BrowserRouter>
	);
}

//Testando se a página possui o cabeçalho e rodapé
it('should have header and footer rendered', () => {
	render(
		<MockSignUp />
	);

	const headerElement = screen.getByTestId(/header/i);
	expect(headerElement).toBeInTheDocument();

	const footerElement = screen.getByTestId(/footer/i);
	expect(footerElement).toBeInTheDocument();
});

//Testando se a página possui input para nome, email e senha e um botão para submit
it('should have username, email and password input and a submit button', () => {
	render(
		<MockSignUp />
	);

	const inputUsernameElement = screen.getByLabelText(/nome:/i);
	expect(inputUsernameElement).toBeInTheDocument();

	const inputEmailElement = screen.getByLabelText(/email:/i);
	expect(inputEmailElement).toBeInTheDocument();

	const inputPasswordElement = screen.getByLabelText(/senha:/i);
	expect(inputPasswordElement).toBeInTheDocument();

	const submitButtonElement = screen.getByRole('button', { name: /cadastrar/i });
	expect(submitButtonElement).toBeInTheDocument();
});