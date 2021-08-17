import React, { Component } from 'react';

import api from "../../services/api";

import { withRouter } from "react-router-dom";

import Navbar from "../../components/Navbar";

import Footer from '../../components/Footer';

import jwt from "../../services/auth";

import { Page, CenterContent, Title, ErrorMessage, ProgressBar } from '../../styles/default';

import { withTranslation } from 'react-i18next';

class ConfirmEmail extends Component {

	constructor(props) {
		super(props);

		this.state = {
			emailToken: props.match.params.emailToken,
			message: '',
			error: '',
			loading: false
		}
	}

	componentDidMount() {

		const { t } = this.props;
		document.title = 'MERN - ' + t('ConfirmEmail.title');

		this.setState({loading: true});

		api.post("/api/auth/confirm-email", {emailConfirmToken: this.state.emailToken})
			.then(response => {
				if(response.data.success) {
					this.setState({
						message: response.data.message
					});

					if(jwt.isAuthenticated()) {
						let user = jwt.getUser();
						user.emailIsConfirmed = true;
						jwt.setUser(user);
						jwt.setAccessToken(response.data.token);
					}
					
				} else {
                    this.setState({error: response.data.message});
                }
			})
			.catch(error => {
                if(error.response.data) {
                     if(error.response.data.message) {
                        this.setState({error: error.response.data.message});
                    }
                }
                else{
                    this.setState({error: t('Error.unexpectedresponse')});
                }
            });

        this.setState({loading: false});
	}

	render() {
		const { t } = this.props;

		return (
			<Page>
			    <Navbar />
				<CenterContent>

					{(this.state.loading === true) && 
                        <ProgressBar />
                    }

					<Title>{t('ConfirmEmail.title')}</Title>
					<ErrorMessage>{this.state.error}</ErrorMessage>

					<h2>{this.state.message}</h2>
				</CenterContent>
				<Footer />
			</Page>
		);
	}
}

export default withTranslation()(withRouter(ConfirmEmail));