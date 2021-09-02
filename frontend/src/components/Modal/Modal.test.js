import { render, screen, fireEvent } from '@testing-library/react';

import Modal from '../Modal';

//Testando se o Modal possui o botão de fechar modal
it('should render the close button', () => {
	render(
		<Modal />
	);

	const closeElement = screen.getByRole('button', { label: 'Close Modal' });
	expect(closeElement).toBeInTheDocument();
});


//Testando se o handleOnClose é passado e executado ao clicado pelo botão de fechar modal
it('should call handleOnClose prop when clicked', () => {
	const handleOnClose = jest.fn();
	render(
		<Modal
			onClose={handleOnClose}
		/>
	);

	const closeElement = screen.getByRole('button', { label: 'Close Modal' });
	fireEvent.click(closeElement);
	expect(handleOnClose).toHaveBeenCalledTimes(1);
});

//Testando se o Modal renderiza o conteudo passado corretamente
it('should render the children content passed', () => {
	const text = "Texto teste";
	render(
		<Modal>
			<h1>{text}</h1>
		</Modal>
	);

	const childrenContent = screen.getByRole('heading', { name: text });
	expect(childrenContent).toBeInTheDocument();
});