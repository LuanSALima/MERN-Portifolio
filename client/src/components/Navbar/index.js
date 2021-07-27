import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Navbar, NavDropdown } from "react-bootstrap";

import { isAuthenticated, getUser, isEmailConfirmed, isAuthorized } from "../../services/auth";

import SendEmailToken from '../SendEmailToken';

import './styles.css';

import { withTranslation  } from 'react-i18next';

class Header extends Component {

	render() {
		const { t, i18n } = this.props;

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
						<Link to="/dashboard">{t('Navbar.dashboard')}</Link>
						}
						<Link to="/sobre-projeto">{t('Navbar.about_project')}</Link>
						<Link to="/planos-projeto">{t('Navbar.plans_project')}</Link>
					</div>
					{isAuthenticated() 
					?
						<div className="barra-navegacao-items">
							<NavDropdown alignRight title={t('Navbar.change_language')}>
								<span onClick={ (e) => {e.preventDefault();i18n.changeLanguage('en');} }>English</span>
								<span onClick={ (e) => {e.preventDefault();i18n.changeLanguage('pt');} }>Português</span>
							</NavDropdown>
							<NavDropdown alignRight title={getUser() ? getUser().username : t('Navbar.account')} id="collasible-nav-dropdown">
								<Link to="/editar-conta" className="barra-dropdown-item">{t('Navbar.edit_account')}</Link>
								<Link to="/alterar-senha" className="barra-dropdown-item">{t('Navbar.change_password')}</Link>
							</NavDropdown>
							<Link to="/logout">{t('Navbar.logout')}</Link>
						</div>
					:
						<div className="barra-navegacao-items">
							<NavDropdown alignRight title={t('Navbar.change_language')}>
								<span onClick={ (e) => {e.preventDefault();i18n.changeLanguage('en');} }>English</span>
								<span onClick={ (e) => {e.preventDefault();i18n.changeLanguage('pt');} }>Português</span>
							</NavDropdown>
							<Link to="/registrar">{t('Navbar.register')}</Link>
							<Link to="/login">{t('Navbar.login')}</Link>
						</div>
					}
				</Navbar.Collapse>
			</Navbar>
			{(isAuthenticated() && !isEmailConfirmed()) && <SendEmailToken />}
			</>
		);
	}

}

export default withTranslation()(Header);