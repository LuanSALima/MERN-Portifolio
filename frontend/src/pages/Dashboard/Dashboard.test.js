import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import Dashboard from '../Dashboard';

//Cannot use withRouter without <Router>
const MockDashboard = (props) => {
	return (
		<BrowserRouter>
			<Dashboard />
		</BrowserRouter>
	);
}

//Testando se a página possui o cabeçalho e rodapé
it('should have header and footer rendered', () => {
	render(
		<MockDashboard />
	);

	const headerElement = screen.getByTestId(/header/i);
	expect(headerElement).toBeInTheDocument();

	const footerElement = screen.getByTestId(/footer/i);
	expect(footerElement).toBeInTheDocument();
});