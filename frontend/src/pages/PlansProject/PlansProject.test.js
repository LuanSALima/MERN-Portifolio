import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import PlansProject from '../PlansProject';

//Cannot use withRouter without <Router>
const MockPlansProject = (props) => {
	return (
		<BrowserRouter>
			<PlansProject />
		</BrowserRouter>
	);
}

//Testando se a página possui o cabeçalho e rodapé
it('should have header and footer rendered', () => {
	render(
		<MockPlansProject />
	);

	const headerElement = screen.getByTestId(/header/i);
	expect(headerElement).toBeInTheDocument();

	const footerElement = screen.getByTestId(/footer/i);
	expect(footerElement).toBeInTheDocument();
});