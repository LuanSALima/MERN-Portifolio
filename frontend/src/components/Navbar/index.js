import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { Navbar, NavDropdown } from "react-bootstrap";

import jwt from "../../services/auth";

import SendEmailToken from '../SendEmailToken';

import './styles.css';

import { withTranslation } from 'react-i18next';

import api from '../../services/api';

import Modal from '../Modal';

import { ConfirmContainer, ConfirmContainerLabel, AcceptButton, RejectButton } from '../../styles/default';

class Header extends Component {

	constructor(props) {
		super(props);

		/*Fazendo a bind para que o 'this' usado nas funções façam referencia a classe*/
		this.removeUser = this.removeUser.bind(this);
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);

		this.state = {
		    modalIsOpen: false
		}
	}

	removeUser = () => {
		api.delete("api/users/account/delete")
			.then(response => {
				if(response.data.success) {
					this.closeModal();
					jwt.removeUser();
		            jwt.removeAccessToken();
		            jwt.removeRefreshToken();
		            this.props.history.push("/");
				}
			})
			.catch(error => {
				
			})
	}

	openModal = () => {
		this.setState({modalIsOpen: true});
	}

	closeModal = () => {
		this.setState({modalIsOpen: false});
	}

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
								<span onClick={ (e) => {e.preventDefault();i18n.changeLanguage('en');} }>English</span>
								<span onClick={ (e) => {e.preventDefault();i18n.changeLanguage('pt');} }>Português</span>
							</NavDropdown>
							<NavDropdown alignRight title={jwt.getUser() ? jwt.getUser().username : t('Navbar.account')} id="collasible-nav-dropdown">
								<Link to="/editar-conta" className="barra-dropdown-item">{t('Navbar.edit_account')}</Link>
								<Link to="/alterar-senha" className="barra-dropdown-item">{t('Navbar.change_password')}</Link>
								<span onClick={this.openModal}>{t('Navbar.delete_account')}</span>
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
			{(jwt.isAuthenticated() && !jwt.isEmailConfirmed()) && <SendEmailToken />}
			{(this.state.modalIsOpen && 
				<Modal onClose={this.closeModal}>
					<ConfirmContainer>
						<ConfirmContainerLabel>{t('Navbar.modal_text')}</ConfirmContainerLabel>
						<AcceptButton onClick={this.removeUser}>{t('Navbar.modal_yes')}</AcceptButton>
						<RejectButton onClick={this.closeModal}>{t('Navbar.modal_no')}</RejectButton>
					</ConfirmContainer>
				</Modal>
			)}
			</>
		);
	}

}

export default withTranslation()(withRouter(Header));