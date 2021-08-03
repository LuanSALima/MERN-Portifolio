import React, { Component } from 'react';

import api from "../../services/api";
import { login } from "../../services/auth";

import { withRouter } from "react-router-dom";

import Navbar from "../../components/Navbar";

import { Page, CenterContent, Title, Form, FormGroup, ErrorMessage, ProgressBar } from '../../styles/default';

import { withTranslation } from 'react-i18next';

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

		this.btnRef = React.createRef();
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

		const { t } = this.props;

		e.preventDefault();

		if(this.btnRef.current){
			this.btnRef.current.setAttribute("disabled", "disabled");
		}

		this.setState({loading: true});

		const { email, password } = this.state;

		if(!email || !password) {

			if(this.btnRef.current){
				this.btnRef.current.removeAttribute("disabled");
			}

			this.setState({error: t('SignIn.form_empty')});
		} else {
			try {
				const response = await api.post("/api/auth/authenticate", { email, password });

				if(response.data.success) {
					login(response.data.token, response.data.user);
					this.props.history.push("/");
				} else {
					if(this.btnRef.current){
						this.btnRef.current.removeAttribute("disabled");
					}

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
					<Title>{t('SignIn.title')}</Title>
					<ErrorMessage>{this.state.error}</ErrorMessage>
					<Form onSubmit={this.handleSignIn}>

						{(this.state.loading === true) && 
	                        <ProgressBar />
	                    }

						<FormGroup>
							<label>{t('SignIn.form_label1')}</label>
							<input	type="email"
									required
									value={this.state.email}
									onChange={this.onChangeEmail}
									/>
							<ErrorMessage>{this.state.errorEmail}</ErrorMessage>
						</FormGroup>
						<FormGroup>
							<label>{t('SignIn.form_label2')}</label>
							<input	type="password"
									required
									value={this.state.password}
									onChange={this.onChangePassword}
									/>
							<ErrorMessage>{this.state.errorPassword}</ErrorMessage>
						</FormGroup>

						<input ref={this.btnRef} type="submit" value={t('SignIn.form_submit')} />
					</Form>
				</CenterContent>
			</Page>
		);
	}
}

export default withTranslation()(withRouter(SignIn));