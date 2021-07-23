import React, { Component } from 'react';

import api from "../../services/api";
import { login } from "../../services/auth";

import { withRouter } from "react-router-dom";

import Navbar from "../../components/Navbar";

import { Page, CenterContent, Title, Form, FormGroup, ErrorMessage, ProgressBar } from '../../styles/default';

class SignIn extends Component {

	constructor(props) {
		super(props);

		/*Fazendo a bind para que o 'this' usado nas funções façam referencia a classe*/
		this.onChangeEmail = this.onChangeEmail.bind(this);
		this.onChangePassword = this.onChangePassword.bind(this);
		this.handleSignIn = this.handleSignIn.bind(this);

		this.state = {
			email: "",
			password: "",
			error: "",
		    errorEmail: "",
		    errorPassword: "",
		    loading: false
		}
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

	handleSignIn = async e => {

		e.preventDefault();

		this.setState({loading: true});

		const { username, email, password } = this.state;

		if(!email || !password) {
			this.setState({error: "Preencha todos os dados para logar"});
		} else {
			try {
				const response = await api.post("/api/auth/authenticate", {username, email, password});

				if(response.data.success) {
					login(response.data.token, response.data.user);
					this.props.history.push("/");
				} else {
					if(response.data.message) {
						this.setState({error: response.data.message});
					}
					if (response.data.errors) {
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
					<Title>Login</Title>
					<ErrorMessage>{this.state.error}</ErrorMessage>
					<Form onSubmit={this.handleSignIn}>

						{(this.state.loading === true) && 
	                        <ProgressBar />
	                    }

						<FormGroup>
							<label>Email: </label>
							<input	type="email"
									required
									value={this.state.email}
									onChange={this.onChangeEmail}
									/>
							<ErrorMessage>{this.state.errorEmail}</ErrorMessage>
						</FormGroup>
						<FormGroup>
							<label>Senha: </label>
							<input	type="password"
									required
									value={this.state.password}
									onChange={this.onChangePassword}
									/>
							<ErrorMessage>{this.state.errorPassword}</ErrorMessage>
						</FormGroup>

						<input type="submit" value="Login" />
					</Form>
				</CenterContent>
			</Page>
		);
	}
}

export default withRouter(SignIn);