import { render, screen, fireEvent } from '@testing-library/react';

import ConfirmBox from '../ConfirmBox';

//Testando Passar o título por prop
it('should render the title passed by title prop', () => {
	const title = "Título Teste";
	render(
		<ConfirmBox
			i18nT={key => key}
			title={title}
		/>
	);

	const titleElement = screen.getByText(title);
	expect(titleElement).toBeInTheDocument();
});

//Testando Passar o texto do botão aceitar por prop
it('should render the accept text at accept button passed by acceptText prop', () => {
	const acceptText = "Confirmar";
	render(
		<ConfirmBox
			i18nT={key => key}
			acceptText={acceptText}
		/>
	);

	const acceptButton = screen.getByRole('button', { name: acceptText });
	expect(acceptButton).toBeInTheDocument();
});

//Testando Passar o texto do botão rejeitar por prop
it('should render the reject text at reject button passed by recuseText prop', () => {
	const recuseText = "Rejeitar";
	render(
		<ConfirmBox
			i18nT={key => key}
			recuseText={recuseText}
		/>
	);

	const rejectButton = screen.getByRole('button', { name: recuseText });
	expect(rejectButton).toBeInTheDocument();
});

//Testando Passar o título, texto dos botões de aceitar e rejeitar por prop
it('should render the title, accept text and reject text passed by props', () => {
	const title = "Título Novamente";
	const acceptText = "Confirmação";
	const recuseText = "Rejeitação";

	render(
		<ConfirmBox
			i18nT={key => key}
			title={title}
			acceptText={acceptText}
			recuseText={recuseText}
		/>
	);

	const titleElement = screen.getByText(title);
	const acceptButton = screen.getByRole('button', { name: acceptText });
	const rejectButton = screen.getByRole('button', { name: recuseText });

	expect(titleElement && acceptButton && rejectButton).toBeInTheDocument();
});

//Verificar se a função handleOnAccept é passada por prop e se apertar o botão aceitar executa a função passada por prop
it('should call handleOnAccept prop when clicked', () => {
	const handleOnAccept = jest.fn();
	const acceptText = "Aceitar";
	render(
		<ConfirmBox
			i18nT={key => key}
			onAccept={handleOnAccept}
			acceptText={acceptText}
		/>
	);

	fireEvent.click(screen.getByText(acceptText));
	expect(handleOnAccept).toHaveBeenCalledTimes(1);
});

//Verificar se a função handleOnRecuse é passada por prop e se apertar o botão recusar executa a função passada por prop
it('should call handleOnRecuse prop when clicked', () => {
	const handleOnRecuse = jest.fn();
	const recuseText = "Rejeitar";
	render(
		<ConfirmBox
			i18nT={key => key}
			onRecuse={handleOnRecuse}
			recuseText={recuseText}
		/>
	);

	fireEvent.click(screen.getByText(recuseText));
	expect(handleOnRecuse).toHaveBeenCalledTimes(1);
});

//Verificar se as duas funções são passadas por props e se apertar os botões referentes a cada um dos botões vão executaram as funções passadas
it('should call handleOnAccept and handleOnRecuse prop when clicked', () => {
	const handleOnAccept = jest.fn();
  	const handleOnRecuse = jest.fn();
	const acceptText = "Aceitar";
	const recuseText = "Rejeitar";
	render(
		<ConfirmBox
			i18nT={key => key}
			onAccept={handleOnAccept}
			acceptText={acceptText}
			onRecuse={handleOnRecuse}
			recuseText={recuseText}
		/>
	);

	fireEvent.click(screen.getByText(recuseText));
	fireEvent.click(screen.getByText(recuseText));
	expect(handleOnRecuse).toHaveBeenCalledTimes(2);

	fireEvent.click(screen.getByText(acceptText));
	expect(handleOnAccept).toHaveBeenCalledTimes(1);
});