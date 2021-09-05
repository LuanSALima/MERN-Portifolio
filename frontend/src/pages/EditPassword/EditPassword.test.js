import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import EditPassword from '../EditPassword';

//Cannot use withRouter without <Router>
const MockEditPassword = (props) => {
	return (
		<BrowserRouter>
			<EditPassword />
		</BrowserRouter>
	);
}

//Testando se a página possui o cabeçalho e rodapé
it('should have header and footer rendered', () => {
	render(
		<MockEditPassword />
	);

	const headerElement = screen.getByTestId(/header/i);
	expect(headerElement).toBeInTheDocument();

	const footerElement = screen.getByTestId(/footer/i);
	expect(footerElement).toBeInTheDocument();
});


//Testando se a página possui inputs para senha atual, nova senha e confirmar nova senha e um botão para submit
it('should have actualPassword, newPassword and confirmNewPassword input and a submit button', () => {
	render(
		<MockEditPassword />
	);

	const inputActualPassword = screen.getByLabelText(/senha atual:/i);
	expect(inputActualPassword).toBeInTheDocument();

	const inputNewPassword = screen.getByLabelText('Nova Senha:');
	expect(inputNewPassword).toBeInTheDocument();

	const inputConfirmNewPassword = screen.getByLabelText('Confirmar Nova Senha:');
	expect(inputConfirmNewPassword).toBeInTheDocument();

	const submitButtonElement = screen.getByRole('button', { name: /alterar/i });
	expect(submitButtonElement).toBeInTheDocument();
});