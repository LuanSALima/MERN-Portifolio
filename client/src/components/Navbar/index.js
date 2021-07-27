import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Nav, Navbar, NavDropdown } from "react-bootstrap";

import { isAuthenticated, getUser, isEmailConfirmed, isAuthorized } from "../../services/auth";

import SendEmailToken from '../SendEmailToken';

import './styles.css';

export default class Header extends Component {

	render() {
		return (
			<>
			<Navbar expand="lg" variant="dark" className="barra-navegacao">
				<div className="barra-navegacao-items barra-navegacao-marca">
					<Link to="/">Home</Link>
				</div>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<div className="barra-navegacao-items barra-navegacao-items-left">
						{isAuthorized() &&
						<Link to="/dashboard">Dashboard</Link>
						}
						<Link to="/sobre-projeto">Sobre o Projeto</Link>
						<Link to="/planos-projeto">Planos para o Projeto</Link>
					</div>
					{isAuthenticated() 
					?
						<div className="barra-navegacao-items">
							<NavDropdown alignRight title={getUser() ? getUser().username : "Conta"} id="collasible-nav-dropdown">
								<Link to="/editar-conta" className="barra-dropdown-item">Editar Conta</Link>
								<Link to="/alterar-senha" className="barra-dropdown-item">Alterar Senha</Link>
							</NavDropdown>
							<Link to="/logout">Sair</Link>
						</div>
					:
						<div className="barra-navegacao-items">
							<Link to="/registrar">Registrar-se</Link>
							<Link to="/login">Login</Link>
						</div>
					}
				</Navbar.Collapse>
			</Navbar>
			{(isAuthenticated() && !isEmailConfirmed()) && <SendEmailToken />}
			</>
		);
	}

}