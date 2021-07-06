import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Nav, Navbar, NavDropdown } from "react-bootstrap";

import { isAuthenticated, getUser } from "../services/auth";

export default class Header extends Component {

	render() {
		return (
			<Navbar expand="lg" bg="dark" variant="dark">
				<Navbar.Brand>
					<Link to="/" className="navbar-brand">Home</Link>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="mr-auto">
						<Link to="/dashboard" className="nav-link">Dashboard</Link>
					</Nav>
					{isAuthenticated() 
					?
						<Nav>
							<NavDropdown title={getUser() ? getUser().username : "Conta"} id="collasible-nav-dropdown">
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
		);
	}

}