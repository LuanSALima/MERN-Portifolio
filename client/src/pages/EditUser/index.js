import React, { Component } from 'react';

import api from "../../services/api";

import { withRouter } from "react-router-dom";

import Navbar from "../../components/Navbar";

import { Page, CenterContent, Title, Form, FormGroup, ErrorMessage, ProgressBar } from '../../styles/default';

class EditUser extends Component {

	constructor(props) {
		super(props);

		/*Fazendo a bind para que o 'this' usado nas funções façam referencia a classe*/
		this.onChangeUsername = this.onChangeUsername.bind(this);
		this.onChangeEmail = this.onChangeEmail.bind(this);
		this.handleEditUser = this.handleEditUser.bind(this);

		this.state = {
			id: props.match.params.id,
			username: "",
			email: "",
			error: "",
			errorUsername: "",
		    errorEmail: "",
		    loading: false
		}
	}

	onChangeUsername(e) {
		this.setState({
			username: e.target.value
		})
	}

	onChangeEmail(e) {
		this.setState({
			email: e.target.value
		})
	}

	componentDidMount() {

		api.get("/api/users/"+this.state.id)
			.then(response => {
				if(response.data.success) {
					this.setState({
						username: response.data.user.username,
						email: response.data.user.email
					})
				} else {
                    this.setState({error: response.data.message});
                }
			})
			.catch(error => {
                if(error.response.data) {
                     if(error.response.data.message) {
                        this.setState({error: error.response.data.message});
                    }
                    if (error.response.data.errors) {
                        if(error.response.data.errors.username) {
                            this.setState({errorUsername: error.response.data.errors.username});
                        }
                        if(error.response.data.errors.email) {
                            this.setState({errorEmail: error.response.data.errors.email});
                        }
                    }
                }
                else{
                    this.setState({error: "Houve uma resposta inesperada do servidor"});
                }
            });

	}

	handleEditUser = async e => {

		e.preventDefault();

		this.setState({loading: true});

		api.post("/api/users/update/"+this.state.id, {username: this.state.username, email: this.state.email})
            .then(response => {
                if(response.data.success) {
                    this.props.history.push("/dashboard");
                } else {
                    this.setState({error: response.data.message});
                }
            })
            .catch(error => {
                if(error.response.data) {
                     if(error.response.data.message) {
                        this.setState({error: error.response.data.message});
                    }
                    if (error.response.data.errors) {
                        if(error.response.data.errors.username) {
                            this.setState({errorUsername: error.response.data.errors.username});
                        }
                        if(error.response.data.errors.email) {
                            this.setState({errorEmail: error.response.data.errors.email});
                        }
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
					<Title>Editar Usuário</Title>
					<ErrorMessage>{this.state.error}</ErrorMessage>
					<Form onSubmit={this.handleEditUser}>

						{(this.state.loading === true) && 
	                        <ProgressBar />
	                    }

						<FormGroup>
	                        <label>Nome: </label>
	                        <input  type="text"
	                                required
	                                value={this.state.username}
	                                onChange={this.onChangeUsername}
	                                />
	                        <ErrorMessage>{this.state.errorUsername}</ErrorMessage>
	                    </FormGroup>
						<FormGroup>
							<label>Email: </label>
							<input	type="email"
									required
									value={this.state.email}
									onChange={this.onChangeEmail}
									/>
							<ErrorMessage>{this.state.errorEmail}</ErrorMessage>
						</FormGroup>

						<input type="submit" value="Editar" />
					</Form>
				</CenterContent>
			</Page>
		);
	}
}

export default withRouter(EditUser);