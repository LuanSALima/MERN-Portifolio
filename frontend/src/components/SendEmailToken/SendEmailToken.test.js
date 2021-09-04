import { render, screen, fireEvent } from '@testing-library/react';

import SendEmailToken from '../SendEmailToken';

//Testando se atribui corretamente o data-testid recebido por prop
it('should receive and access the data-testid received by prop', () => {
	const testIdName = 'Teste';
	render(
		<SendEmailToken i18nT={key => key} testid={testIdName}/>
	);

	const rootElement = screen.getByTestId(testIdName);
	expect(rootElement).toBeInTheDocument();
})

//Testando se o componente possui a mensagem
it('should render the text', () => {
	render(
		<SendEmailToken i18nT={key => key} />
	);

	const textElement = screen.getByTestId('text-element');
	expect(textElement).toBeInTheDocument();
});

//Testando se o componente possui o botão
it('should render the button', () => {
	render(
		<SendEmailToken i18nT={key => key} />
	);

	const buttonElement = screen.getByRole('button');
	expect(buttonElement).toBeInTheDocument();
});

//Testando se ao clicar no botão aparece a barra de loading
it('should render the progressBar when button clicked', () => {
	render(
		<SendEmailToken i18nT={key => key} />
	);

	const buttonElement = screen.getByRole('button');
	fireEvent.click(buttonElement);
	const progressBarElement = screen.getByTestId('progressBar-element');
	expect(progressBarElement).toBeInTheDocument();
});

//Testando se ao clicar no botão aparece uma mensagem de resposta