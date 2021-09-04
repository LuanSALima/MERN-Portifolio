import { render, screen, fireEvent } from '@testing-library/react';

import PasswordInput from '../PasswordInput';

//Testando se o input se inicia como type=password
it('should have type password', () => {
	render(
		<PasswordInput />
	);

	const inputElement = screen.getByTestId('input-element');
	expect(inputElement).toBeInTheDocument();
	expect(inputElement).toHaveAttribute("type", 'password');
});

//Testando se o prop name e value é atribuido ao input
it('should receive the name and value prop', () => {
	const id="senha";
	const inputName="senha";
	const inputValue="Minha#Senha";
	render(
		<PasswordInput
			onChange={key => key}
			id={id}
			name={inputName}
			value={inputValue}
		/>
	);

	const inputElement = screen.getByTestId('input-element');
	expect(inputElement).toBeInTheDocument();
	expect(inputElement).toHaveAttribute("id", id);
	expect(inputElement).toHaveAttribute("name", inputName);
	expect(inputElement).toHaveAttribute("value", inputValue);
});

//Testando se a função handleOnChange é passada por prop e se é executada a função passada por prop
it('should call handleOnChange prop when input value change', () => {
	const handleOnChange = jest.fn();
	const value="Minha#Senha";
	render(
		<PasswordInput
			onChange={handleOnChange}
		/>
	);

	const inputElement = screen.getByTestId('input-element');
	fireEvent.change(inputElement, { target: { value: value }});
	expect(handleOnChange).toHaveBeenCalledTimes(1);
});

//Testando se a função handleOnBlur é passada e executada
it('should call handleOnBlur prop when input value change', () => {
	const handleOnBlur = jest.fn();
	const value="Minha#Senha";
	render(
		<PasswordInput
			onBlur={handleOnBlur}
		/>
	);

	const inputElement = screen.getByTestId('input-element');
	fireEvent.blur(inputElement);
	expect(handleOnBlur).toHaveBeenCalledTimes(1);
});

//Testando se possui o svg NotVisible
it('should render the not visible icon', () => {
	render(
		<PasswordInput />
	);

	const notVisibleIcon = document.querySelector("svg");
    expect(notVisibleIcon).toBeInTheDocument();
    expect(notVisibleIcon).toHaveAttribute("alt", 'Click to Show Password');
});

//Testando se o input se transforma em text ao clicar no svg e o svg é trocado pelo svg visible
it('should set type of input to text when notvisible icon is clicked', () => {
	render(
		<PasswordInput />
	);

	//Input e Icone Not Visible
	const inputElement = screen.getByTestId('input-element');
	const notVisibleIcon = document.querySelector("svg");

	//Clica no Icone Not Visible
	fireEvent.click(notVisibleIcon);

	//Checa se o Input type foi alterado
	expect(inputElement).toHaveAttribute("type", 'text');

	//Espera que o Not Visible Icon tenha sido trocado pelo Visible Icon
	expect(notVisibleIcon).not.toBeInTheDocument();
	const visibleIcon = document.querySelector("svg");
	expect(visibleIcon).toHaveAttribute("alt", 'Click to Not Show Password');
});