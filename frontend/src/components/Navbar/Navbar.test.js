import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import Navbar from '../Navbar';

import i18n from '../../services/i18n';
import { useTranslation } from 'react-i18next';

import auth from '../../services/auth';

//Cannot use <Link> without <BrowserRouter>
const MockNavbar = (props) => {
	return (
		<BrowserRouter>
			<Navbar i18n={i18n} i18nT={useTranslation().t} openModal={props.openModal} testid={props.testid}/>
		</BrowserRouter>
	);
}

//Testando se atribui corretamente o data-testid recebido por prop
it('should receive and access the data-testid received by prop', () => {
	const testIdName = 'Teste';
	render(
		<MockNavbar testid={testIdName}/>
	);

	const rootElement = screen.getByTestId(testIdName);
	expect(rootElement).toBeInTheDocument();
})

//Testando se o possui os links na barra de navegação de um usuário não autenticado
it('should render all links to pages accessible by not authenticated user', () => {

	const home = "Home";
	const aboutProject = "Sobre o Projeto";
	const plansProject = "Planos para o Projeto";
	const register = "Registrar-se";
	const login = "Login";
	const changeLanguage = 'Trocar Idioma';
	const dashboard = 'Dashboard';
	const account = 'Conta';


	render(
		<MockNavbar />
	);

	const homeLink = screen.getByRole('link', { name: home });
	expect(homeLink).toBeInTheDocument();

	const aboutProjectLink = screen.getByRole('link', { name: aboutProject });
	expect(aboutProjectLink).toBeInTheDocument();

	const plansProjectLink = screen.getByRole('link', { name: plansProject });
	expect(plansProjectLink).toBeInTheDocument();

	const registerLink = screen.getByRole('link', { name: register });
	expect(registerLink).toBeInTheDocument();

	const loginLink = screen.getByRole('link', { name: login });
	expect(loginLink).toBeInTheDocument();

	const changeLanguageButton = screen.getByRole('button', { name: changeLanguage });
	expect(changeLanguageButton).toBeInTheDocument();
});

//Testando se o dropdown de alterar a linguagem funciona corretamente
it('should render the change language dropdown and show the two options', () => {

	//Texto do dropdown e dos seus itens
	const changeLanguage = 'Trocar Idioma';
	const languagePortuguese = 'Português';
	const languageEnglish = 'English';

	render(
		<MockNavbar />
	);

	//Procura e espera que o botão que abre o dropdown exista
	const changeLanguageButton = screen.getByRole('button', { name: changeLanguage });
	expect(changeLanguageButton).toBeInTheDocument();

	//Espera que os itens do dropdown não existam no componente antes de clicar no botão do dropdown
	expect(screen.queryByRole('button', { name: languagePortuguese })).not.toBeInTheDocument();
	expect(screen.queryByRole('button', { name: languageEnglish })).not.toBeInTheDocument();

	//Clica no botão do dropdown
	fireEvent.click(changeLanguageButton);

	//Após o botão do dropdown ser clicado é esperado que aparença os itens do dropdown
	const portugueseButton = screen.getByRole('button', { name: languagePortuguese });
	expect(portugueseButton).toBeInTheDocument();
	const englishButton = screen.getByRole('button', { name: languageEnglish });
	expect(englishButton).toBeInTheDocument();

	//Após clicar no botão English é esperado que a linguagem esteja em en
	fireEvent.click(englishButton);
	expect(i18n.language).toBe('en');

	//Após clicar no botão Português é esperado que a linguagem esteja em pt
	fireEvent.click(portugueseButton);
	expect(i18n.language).toBe('pt');
});

const MockUser = {
	username: 'Teste',
	email: 'Teste@gmail.com',
	role: 'Guest'
};

//Testando se o possui os links na barra de navegação de um usuário autenticado com permissão de guest
it('should render all links to pages accessible by authenticated Guest user', () => {

	auth.setUser(MockUser);
	auth.setAccessToken('TokenTeste');

	const home = "Home";
	const aboutProject = "Sobre o Projeto";
	const plansProject = "Planos para o Projeto";
	const changeLanguage = 'Trocar Idioma';
	const logout = 'Sair';

	render(
		<MockNavbar />
	);

	const homeLink = screen.getByRole('link', { name: home });
	expect(homeLink).toBeInTheDocument();

	const aboutProjectLink = screen.getByRole('link', { name: aboutProject });
	expect(aboutProjectLink).toBeInTheDocument();

	const plansProjectLink = screen.getByRole('link', { name: plansProject });
	expect(plansProjectLink).toBeInTheDocument();

	const logoutLink = screen.getByRole('link', { name: logout });
	expect(logoutLink).toBeInTheDocument();

	const accountButton = screen.getByRole('button', { name: MockUser.username });
	expect(accountButton).toBeInTheDocument();

	const changeLanguageButton = screen.getByRole('button', { name: changeLanguage });
	expect(changeLanguageButton).toBeInTheDocument();
});

//Testando se o dropdown de conta funciona corretamente
it('should render the account dropdown and show the three options', () => {

	//Texto do dropdown e dos seus itens
	const editAccount = 'Editar Conta';
	const changePassword = 'Alterar Senha';
	const deleteAccount = 'Deletar Conta';

	render(
		<MockNavbar />
	);

	//Procura e espera que o botão que abre o dropdown exista
	const accountButton = screen.getByRole('button', { name: MockUser.username });
	expect(accountButton).toBeInTheDocument();

	//Espera que os itens do dropdown não existam no componente antes de clicar no botão do dropdown
	expect(screen.queryByRole('link', { name: editAccount })).not.toBeInTheDocument();
	expect(screen.queryByRole('link', { name: changePassword })).not.toBeInTheDocument();
	expect(screen.queryByRole('button', { name: deleteAccount })).not.toBeInTheDocument();

	//Clica no botão do dropdown
	fireEvent.click(accountButton);

	//Após o botão do dropdown ser clicado é esperado que aparença os itens do dropdown
	const editAccountLink = screen.getByRole('link', { name: editAccount });
	expect(editAccountLink).toBeInTheDocument();

	const changePasswordLink = screen.getByRole('link', { name: changePassword });
	expect(changePasswordLink).toBeInTheDocument();

	const deleteAccountButton = screen.getByRole('button', { name: deleteAccount });
	expect(deleteAccountButton).toBeInTheDocument();
});

//Testando se o possui os links na barra de navegação de um usuário autenticado com permissão de admin e usuário com email confirmado
it('should render all links to pages accessible by authenticated Admin and user with email confirmed', () => {

	MockUser.role = 'User';
	auth.setUser(MockUser);

	const home = "Home";
	const aboutProject = "Sobre o Projeto";
	const plansProject = "Planos para o Projeto";
	const changeLanguage = 'Trocar Idioma';
	const logout = 'Sair';
	const dashboard = 'Dashboard';

	render(
		<MockNavbar />
	);

	const homeLink = screen.getByRole('link', { name: home });
	expect(homeLink).toBeInTheDocument();

	const aboutProjectLink = screen.getByRole('link', { name: aboutProject });
	expect(aboutProjectLink).toBeInTheDocument();

	const plansProjectLink = screen.getByRole('link', { name: plansProject });
	expect(plansProjectLink).toBeInTheDocument();

	const logoutLink = screen.getByRole('link', { name: logout });
	expect(logoutLink).toBeInTheDocument();

	const dashboardLink = screen.getByRole('link', { name: dashboard });
	expect(dashboardLink).toBeInTheDocument();

	const accountButton = screen.getByRole('button', { name: MockUser.username });
	expect(accountButton).toBeInTheDocument();

	const changeLanguageButton = screen.getByRole('button', { name: changeLanguage });
	expect(changeLanguageButton).toBeInTheDocument();
});

//Testando se o handleOpenModal é passado e executado ao ser clicado pelo botão de deletar conta
it('should call handleOpenModal prop when click delete account button', () => {

	const handleOpenModal = jest.fn();
	const deleteAccount = 'Deletar Conta';

	render(
		<MockNavbar
			openModal={handleOpenModal}
		/>
	);

	//Procura e espera que o botão que abre o dropdown exista
	const accountButton = screen.getByRole('button', { name: MockUser.username });
	expect(accountButton).toBeInTheDocument();

	//Clica no botão do dropdown
	fireEvent.click(accountButton);

	//Clica no item deletar conta e espera que a função passada por prop tenha sido executada
	const deleteAccountButton = screen.getByRole('button', { name: deleteAccount });
	fireEvent.click(deleteAccountButton);
	expect(handleOpenModal).toHaveBeenCalledTimes(1);
}); 