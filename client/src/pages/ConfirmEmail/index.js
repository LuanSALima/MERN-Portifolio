import React, { Component } from 'react';

import api from "../../services/api";

import { withRouter } from "react-router-dom";

import Navbar from "../../components/navbar.component";

import { emailConfirmed, isAuthenticated, updateRole } from "../../services/auth";

import { Page, CenterContent, Title } from '../../styles/default';

class ConfirmEmail extends Component {

	constructor(props) {
		super(props);

		this.state = {
			emailToken: props.match.params.emailToken,
			message: '',
			error: ''
		}
	}

	componentDidMount() {

		api.post("/api/auth/confirm-email", {emailConfirmToken: this.state.emailToken})
			.then(response => {
				if(response.data.success) {
					this.setState({
						message: response.data.message
					});

					if(isAuthenticated()) {
						emailConfirmed();
						updateRole(response.data.token);
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
                    this.setState({error: "Houve uma resposta inesperada do servidor"});
                }
            });

	}

	render() {
		return (
			<Page>
			    <Navbar />
				<CenterContent>
					<Title>Confirmar Email</Title>
					<h5 className="text-danger">{this.state.error}</h5>

					<h2>{this.state.message}</h2>
				</CenterContent>
			</Page>
		);
	}
}

export default withRouter(ConfirmEmail);