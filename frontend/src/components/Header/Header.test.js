import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import Header from '../Header';

import auth from '../../services/auth';

//Cannot use withRouter without <Router>
const MockHeader = (props) => {
	return (
		<BrowserRouter>
			<Header/>
		</BrowserRouter>
	);
}

auth.removeUser();
auth.removeAccessToken();

//Testando se o Header apresenta os componentes corretamente para um usuário não autenticado
it('should render only the Navbar', () => {
	render(
		<MockHeader />
	);

	expect(screen.getByTestId('navbar')).toBeInTheDocument();
	expect(screen.queryByTestId('sendemailtoken')).not.toBeInTheDocument();
	expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
});

const MockUser = {
	username: 'Teste',
	email: 'Teste@gmail.com',
	emailIsConfirmed: 'false',
	role: 'Guest'
};

//Testando se o Header apresenta o SendEmailToken componente para um usuário autenticado e com e-mail não confirmado
it('should render the Navbar and SendEmailToken', () => {

	auth.setUser(MockUser);
	auth.setAccessToken('TokenTeste');

	render(
		<MockHeader />
	);

	expect(screen.getByTestId('navbar')).toBeInTheDocument();
	expect(screen.getByTestId('sendemailtoken')).toBeInTheDocument();
	expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
});

//Testando se o Header não apresenta o SendEmailToken componente para um usuário autenticado e com e-mail confirmado
it('should not render the SendEmailToken to a user with email confirmed', () => {

	MockUser.emailIsConfirmed = 'true';
	auth.setUser(MockUser);

	render(
		<MockHeader />
	);

	expect(screen.getByTestId('navbar')).toBeInTheDocument();
	expect(screen.queryByTestId('sendemailtoken')).not.toBeInTheDocument();
	expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
});

//Testando se o modal é apresentado ao clicar no botão de remover usuário
it("should render the modal when authenticated user presses 'delete account' option", () => {
	render(
		<MockHeader />
	);

	expect(screen.queryByTestId('modal')).not.toBeInTheDocument();

	//Procura e espera que o botão que abre o dropdown exista
	const accountButton = screen.getByRole('button', { name: MockUser.username });
	//Clica no botão do dropdown
	fireEvent.click(accountButton);
	//Clica no item deletar conta e espera que a função passada por prop tenha sido executada
	const deleteAccountButton = screen.getByRole('button', { name: /Deletar Conta/i });
	fireEvent.click(deleteAccountButton);
	expect(screen.getByTestId('modal')).toBeInTheDocument();
});