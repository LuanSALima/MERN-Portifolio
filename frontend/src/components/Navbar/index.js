import React from 'react';
import { Link } from 'react-router-dom';

import { Navbar as BootstrapNavbar, NavDropdown } from "react-bootstrap";

import jwt from "../../services/auth";

import './styles.css';

function Navbar(props){

	const t = props.i18nT;

	const changeLanguageEn = (e) => {
		e.preventDefault();
		props.i18n.changeLanguage('en');
	}

	const changeLanguagePt = (e) => {
		e.preventDefault();
		props.i18n.changeLanguage('pt');
	}

	return (
		<BootstrapNavbar expand="lg" variant="dark" className="barra-navegacao">
			<div className="barra-navegacao-items barra-navegacao-marca">
				<Link to="/">Home</Link>
			</div>
			<BootstrapNavbar.Toggle aria-controls="responsive-navbar-nav" />
			<BootstrapNavbar.Collapse id="responsive-navbar-nav">
				<div className="barra-navegacao-items barra-navegacao-items-left">
					{jwt.isAuthorized() &&
					<Link to="/dashboard">{t('Navbar.dashboard')}</Link>
					}
					<Link to="/sobre-projeto">{t('Navbar.about_project')}</Link>
					<Link to="/planos-projeto">{t('Navbar.plans_project')}</Link>
				</div>
				{jwt.isAuthenticated() 
				?
					<div className="barra-navegacao-items">
						<NavDropdown alignRight title={t('Navbar.change_language')}>
							<span onClick={changeLanguageEn}>English</span>
							<span onClick={changeLanguagePt}>Português</span>
						</NavDropdown>
						<NavDropdown alignRight title={jwt.getUser() ? jwt.getUser().username : t('Navbar.account')} id="collasible-nav-dropdown">
							<Link to="/editar-conta" className="barra-dropdown-item">{t('Navbar.edit_account')}</Link>
							<Link to="/alterar-senha" className="barra-dropdown-item">{t('Navbar.change_password')}</Link>
							<span role="button" onClick={props.openModal}>{t('Navbar.delete_account')}</span>
						</NavDropdown>
						<Link to="/logout">{t('Navbar.logout')}</Link>
					</div>
				:
					<div className="barra-navegacao-items">
						<NavDropdown alignRight title={t('Navbar.change_language')}>
							<span role="button" onClick={changeLanguageEn}>English</span>
							<span role="button" onClick={changeLanguagePt}>Português</span>
						</NavDropdown>
						<Link to="/registrar">{t('Navbar.register')}</Link>
						<Link to="/login">{t('Navbar.login')}</Link>
					</div>
				}
			</BootstrapNavbar.Collapse>
		</BootstrapNavbar>
	);
}

export default Navbar;