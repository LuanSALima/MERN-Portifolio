import React, { Component } from 'react';

import api from "../../services/api";
import { login } from "../../services/auth";

import { withRouter } from "react-router-dom";

import Navbar from "../../components/navbar.component";

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
		    errorPassword: ""
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

		const { username, email, password } = this.state;

		if(!email || !password) {
			this.setState({error: "Preencha todos os dados para logar"});
		} else {
			try {
				const response = await api.post("/api/auth/authenticate", {username, email, password});

				if(response.data.success) {
					login(response.data.token, response.data.user);
					this.props.history.push("/dashboard");
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
	}

	render() {
		return (
			<div>
			    <Navbar />
				<div className="container">
					<h3>Login</h3>
					<h5 className="text-danger">{this.state.error}</h5>
					<form onSubmit={this.handleSignIn}>
						<div className="form-group">
							<label>Email: </label>
							<input	type="email"
									required
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
									className="form-control"
									value={this.state.password}
									onChange={this.onChangePassword}
									/>
							<span className="text-danger">{this.state.errorPassword}</span>
						</div>
						<div className="form-group">
							<input type="submit" value="Login" className="btn btn-primary" />
						</div>
					</form>
				</div>
			</div>
		);
	}
}

export default withRouter(SignIn);