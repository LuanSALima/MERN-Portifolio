import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Nav, Navbar, NavDropdown } from "react-bootstrap";

import { isAuthenticated, getUser, isEmailConfirmed, isAuthorized } from "../services/auth";

import SendEmailToken from './SendEmailToken';

export default class Header extends Component {

	render() {
		return (
			<>
			<Navbar expand="lg" bg="dark" variant="dark">
				<Navbar.Brand>
					<Link to="/" className="navbar-brand">Home</Link>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="mr-auto">
						{isAuthorized() &&
						<Link to="/dashboard" className="nav-link">Dashboard</Link>
						}
						<Link to="/sobre-projeto" className="nav-link">Sobre o Projeto</Link>
						<Link to="/planos-projeto" className="nav-link">Planos para o Projeto</Link>
					</Nav>
					{isAuthenticated() 
					?
						<Nav>
							<NavDropdown alignRight title={getUser() ? getUser().username : "Conta"} id="collasible-nav-dropdown">
								<Link to="/editar-conta" className="dropdown-item">Editar Conta</Link>
								<Link to="/alterar-senha" className="dropdown-item">Alterar Senha</Link>
							</NavDropdown>
							<Link to="/logout" className="nav-link">Sair</Link>
						</Nav>
					:
						<Nav>
							<Link to="/registrar" className="nav-link">Registrar-se</Link>
							<Link to="/login" className="nav-link">Login</Link>
						</Nav>
					}
				</Navbar.Collapse>
			</Navbar>
			{(isAuthenticated() && !isEmailConfirmed()) && <SendEmailToken />}
			</>
		);
	}

}