import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import SignIn from '../SignIn';

//Cannot use withRouter without <Router>
const MockSignIn = (props) => {
	return (
		<BrowserRouter>
			<SignIn />
		</BrowserRouter>
	);
}

//Testando se a página possui input para email e senha e um botão para submit
it('should have email and password input and a submit button', () => {
	render(
		<MockSignIn />
	);

	const inputEmailElement = screen.getByLabelText(/email:/i);
	expect(inputEmailElement).toBeInTheDocument();

	const inputPasswordElement = screen.getByLabelText(/senha:/i);
	expect(inputPasswordElement).toBeInTheDocument();

	const submitButtonElement = screen.getByRole('button', { name: /login/i });
	expect(submitButtonElement).toBeInTheDocument();
});