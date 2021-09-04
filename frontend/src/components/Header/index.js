import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import jwt from "../../services/auth";

import { withTranslation } from 'react-i18next';

import api from '../../services/api';

import Navbar from '../Navbar';
import SendEmailToken from '../SendEmailToken';
import Modal from '../Modal';
import ConfirmBox from '../ConfirmBox';

class Header extends Component {

	constructor(props) {
		super(props);

		/*Fazendo a bind para que o 'this' usado nas funções façam referencia a classe*/
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
			<header>
				<Navbar
					testid="navbar"
					i18nT={t}
					i18n={i18n}
					openModal={this.openModal}
				/>
				{(jwt.isAuthenticated() && !jwt.isEmailConfirmed()) &&
					<SendEmailToken
						testid="sendemailtoken"
						i18nT={t}
					/>
				}
				{(this.state.modalIsOpen && 
					<Modal testid="modal" onClose={this.closeModal}>
						<ConfirmBox
							i18nT={t}
							title={t('Navbar.modal_text')}
							onAccept={this.removeUser}
							onRecuse={this.closeModal}
						/>
					</Modal>
				)}
			</header>
		);
	}

}

export default withTranslation()(withRouter(Header));