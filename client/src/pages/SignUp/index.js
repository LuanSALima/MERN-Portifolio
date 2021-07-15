import React, { Component } from 'react';

import api from "../../services/api";
import { withRouter } from "react-router-dom";

import Navbar from "../../components/navbar.component";

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
		    errorPassword: ""
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

		const { username, email, password } = this.state;

		if(!username || !email || !password) {
			this.setState({error: "Preencha todos os dados para se cadastrar"});
		} else {
			try {
				const response = await api.post("/api/auth/signUp", {username, email, password});

				console.log(response.data);
				
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
				console.log(err);
				this.setState({error: err.message});
			}
		}
	}

	render() {
		return (
			<div>
			    <Navbar />
				<div className="container">
					<h3>Criar Conta</h3>
					<h5 className="text-danger">{this.state.error}</h5>
					<form onSubmit={this.handleSignUp}>
						<div className="form-group">
							<label>Nome: </label>
							<input	type="text"
									required
									id="usernameField"
									className="form-control"
									value={this.state.username}
									onChange={this.onChangeUsername}
									/>
							<span className="text-danger">{this.state.errorUsername}</span>
						</div>
						<div className="form-group">
							<label>Email: </label>
							<input	type="email"
									required
									id="emailField"
									className="form-control"
									value={this.state.email}
									onChange={this.onChangeEmail}
									/>
							<span className="text-danger">{this.state.errorEmail}</span>
						</div>
						<div className="form-group">
							<label>Senha: </label>
							<input	type="password"
									required
									id="passwordField"
									className="form-control"
									value={this.state.password}
									onChange={this.onChangePassword}
									/>
							<span className="text-danger">{this.state.errorPassword}</span>
						</div>
						<div className="form-group">
							<input type="submit" value="Cadastrar" className="btn btn-primary" />
						</div>
					</form>
				</div>
			</div>
		);
	}
}

export default withRouter(SignUp);