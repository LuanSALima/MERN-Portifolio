import React, { Component } from 'react';

import api from "../../services/api";
import { withRouter } from "react-router-dom";

import Navbar from "../../components/Navbar";

import { Page, CenterContent, Title, Form, FormGroup, ErrorMessage, ProgressBar } from '../../styles/default';

import { withTranslation } from 'react-i18next';

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

		this.btnRef = React.createRef();
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

		const { t } = this.props;

		e.preventDefault();

		if(this.btnRef.current){
			this.btnRef.current.setAttribute("disabled", "disabled");
		}

		this.setState({loading: true});

		const { username, email, password } = this.state;

		if(!username || !email || !password) {

			if(this.btnRef.current){
				this.btnRef.current.removeAttribute("disabled");
			}

			this.setState({error: t('SignUp.form_empty')});
		} else {
			try {
				const response = await api.post("/api/auth/signUp", {username, email, password});
				
				if(response.data.success) {
					this.props.history.push("/login");
				} else {
					if(this.btnRef.current){
						this.btnRef.current.removeAttribute("disabled");
					}

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
				if(this.btnRef.current){
					this.btnRef.current.removeAttribute("disabled");
				}
			
				this.setState({error: err.message});
			}
		}

		this.setState({loading: false});
	}

	render() {
		const { t } = this.props;

		return (
			<Page>
			    <Navbar />
				<CenterContent>
					<Title>{t('SignUp.title')}</Title>
					<ErrorMessage>{this.state.error}</ErrorMessage>
					<Form onSubmit={this.handleSignUp}>

						{(this.state.loading === true) && 
	                        <ProgressBar />
	                    }
	                    
						<FormGroup>
							<label>{t('SignUp.form_label1')}</label>
							<input	type="text"
									required
									id="usernameField"
									value={this.state.username}
									onChange={this.onChangeUsername}
									/>
							<ErrorMessage>{this.state.errorUsername}</ErrorMessage>
						</FormGroup>
						<FormGroup>
							<label>{t('SignUp.form_label2')}</label>
							<input	type="email"
									required
									id="emailField"
									value={this.state.email}
									onChange={this.onChangeEmail}
									/>
							<ErrorMessage>{this.state.errorEmail}</ErrorMessage>
						</FormGroup>
						<FormGroup>
							<label>{t('SignUp.form_label3')}</label>
							<input	type="password"
									required
									id="passwordField"
									value={this.state.password}
									onChange={this.onChangePassword}
									/>
							<ErrorMessage>{this.state.errorPassword}</ErrorMessage>
						</FormGroup>

						<input ref={this.btnRef} type="submit" value={t('SignUp.form_submit')} />
					</Form>
				</CenterContent>
			</Page>
		);
	}
}

export default withTranslation()(withRouter(SignUp));