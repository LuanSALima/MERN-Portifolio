import React, { Component } from 'react';

import api from "../../services/api";

import { withRouter } from "react-router-dom";

import Navbar from "../../components/Navbar";

import { emailConfirmed, isAuthenticated, updateRole } from "../../services/auth";

import { Page, CenterContent, Title, ErrorMessage, ProgressBar } from '../../styles/default';

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

		this.setState({loading: true});

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

        this.setState({loading: false});
	}

	render() {
		return (
			<Page>
			    <Navbar />
				<CenterContent>

					{(this.state.loading === true) && 
                        <ProgressBar />
                    }

					<Title>Confirmar Email</Title>
					<ErrorMessage>{this.state.error}</ErrorMessage>

					<h2>{this.state.message}</h2>
				</CenterContent>
			</Page>
		);
	}
}

export default withRouter(ConfirmEmail);