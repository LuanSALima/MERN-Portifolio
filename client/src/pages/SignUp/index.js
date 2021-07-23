import React, { Component } from 'react';

import api from "../../services/api";
import { withRouter } from "react-router-dom";

import Navbar from "../../components/Navbar";

import { Page, CenterContent, Title, Form, FormGroup, ErrorMessage, ProgressBar } from '../../styles/default';

class SignUp extends Component {

	constructor(props) {
		super(props);

		/*Fazendo a bind para que o 'this' usado nas funções façam referencia a classe*/
		this.onChangeUsername = this.onChangeUsername.bind(this);
		this.onChangeEmail = this.onChangeEmail.bind(this);
		this.onChangePassword = this.onChangePassword.bind(this);

		this.handleSignUp = this.handleSignUp.bind(this);

		this.state = {
			username: "",
		    email: "",
		    password: "",
		    error: "",
		    errorUsername: "",
		    errorEmail: "",
		    errorPassword: "",
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

	onChangePassword(e) {
		this.setState({
			password: e.target.value
		})
	}

	handleSignUp = async e => {

		e.preventDefault();

		this.setState({loading: true});

		const { username, email, password } = this.state;

		if(!username || !email || !password) {
			this.setState({error: "Preencha todos os dados para se cadastrar"});
		} else {
			try {
				const response = await api.post("/api/auth/signUp", {username, email, password});
				
				if(response.data.success) {
					this.props.history.push("/login");
				} else {
					if(response.data.message) {
						this.setState({error: response.data.message});
					}
					if (response.data.errors) {
						if(response.data.errors.username) {
							this.setState({errorUsername: response.data.errors.username});
						}
						if(response.data.errors.email) {
							this.setState({errorEmail: response.data.errors.email});
						}
						if(response.data.errors.password) {
							this.setState({errorPassword: response.data.errors.password});
						}
					}
				}
			} catch (err) {
				this.setState({error: err.message});
			}
		}

		this.setState({loading: false});
	}

	render() {
		return (
			<Page>
			    <Navbar />
				<CenterContent>
					<Title>Criar Conta</Title>
					<ErrorMessage>{this.state.error}</ErrorMessage>
					<Form onSubmit={this.handleSignUp}>

						{(this.state.loading === true) && 
	                        <ProgressBar />
	                    }
	                    
						<FormGroup>
							<label>Nome: </label>
							<input	type="text"
									required
									id="usernameField"
									value={this.state.username}
									onChange={this.onChangeUsername}
									/>
							<ErrorMessage>{this.state.errorUsername}</ErrorMessage>
						</FormGroup>
						<FormGroup>
							<label>Email: </label>
							<input	type="email"
									required
									id="emailField"
									value={this.state.email}
									onChange={this.onChangeEmail}
									/>
							<ErrorMessage>{this.state.errorEmail}</ErrorMessage>
						</FormGroup>
						<FormGroup>
							<label>Senha: </label>
							<input	type="password"
									required
									id="passwordField"
									value={this.state.password}
									onChange={this.onChangePassword}
									/>
							<ErrorMessage>{this.state.errorPassword}</ErrorMessage>
						</FormGroup>

						<input type="submit" value="Cadastrar" />
					</Form>
				</CenterContent>
			</Page>
		);
	}
}

export default withRouter(SignUp);