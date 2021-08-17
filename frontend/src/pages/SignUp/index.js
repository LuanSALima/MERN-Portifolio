import React, { Component } from 'react';

import api from "../../services/api";
import { withRouter } from "react-router-dom";

import Navbar from "../../components/Navbar";

import Footer from '../../components/Footer';

import { Page, CenterContent, Title, Form, FormGroup, ErrorMessage, ProgressBar } from '../../styles/default';

import { withTranslation } from 'react-i18next';

import PasswordInput from '../../components/PasswordInput';

import { Formik } from 'formik';
import * as Yup from 'yup';

class SignUp extends Component {

	constructor(props) {
		super(props);

		this.state = {
		    error: "",
		    loading: false
		}

		this.btnRef = React.createRef();
	}

	componentDidMount(){
		const { t } = this.props;
		document.title = 'MERN - ' + t('SignUp.title');
	}

	render() {
		const { t } = this.props;

		return (
			<Page>
			    <Navbar />
				<CenterContent>
					<Title>{t('SignUp.title')}</Title>
					<ErrorMessage>{this.state.error}</ErrorMessage>
					<Formik
						initialValues={{
							username: '',
				            email: '',
				            password: ''
				        }}

				        onSubmit={async (values, { setErrors }) => {

				        	let isSuccess = false;

							if(this.btnRef.current){
								this.btnRef.current.setAttribute("disabled", "disabled");
							}

							this.setState({loading: true});

							try {
								const response = await api.post("/api/auth/signUp", {username: values.username, email: values.email, password: values.password});
								
								if(response.data.success) {
									isSuccess = true;
								} else {
									if(response.data.message) {
										this.setState({error: response.data.message});
									}
									if (response.data.errors) {
										setErrors({
		                                    username: response.data.errors.username,
		                                    email: response.data.errors.email,
		                                    password: response.data.errors.password
		                                });
									}
								}
							} catch (err) {
								this.setState({error: err.message});
							}

							if(this.btnRef.current){
								this.btnRef.current.removeAttribute("disabled");
							}

							this.setState({loading: false});

							if(isSuccess) {
								this.props.history.push("/login");
							}
				        }}

				        validationSchema={Yup.object({
				        	username: Yup.string().required(t('Validations.User.username_required')).min(3, t('Validations.User.username_min')).max(35, t('Validations.User.username_max')),
				        	email: Yup.string().required(t('Validations.User.email_required')).email(t('Validations.User.email_invalid')),
				            password: Yup.string().required(t('Validations.User.password_required')).min(8, t('Validations.User.password_min')).max(40, t('Validations.User.password_max')),
				        })}
					>
						{props => (
							<Form onSubmit={props.handleSubmit}>
								{(this.state.loading === true) && 
			                        <ProgressBar />
			                    }
			                    
								<FormGroup>
									<label>{t('SignUp.form_label1')}</label>
									<input	type="text"
											name="username"
											value={props.values.username}
											onChange={props.handleChange}
											onBlur={props.handleBlur}
											/>
									{props.touched.username && props.errors.username ? 
			                            <ErrorMessage>{props.errors.username}</ErrorMessage>
			                            : null}
								</FormGroup>
								<FormGroup>
									<label>{t('SignUp.form_label2')}</label>
									<input	type="email"
											name="email"
											value={props.values.email}
											onChange={props.handleChange}
											onBlur={props.handleBlur}
											/>
									{props.touched.email && props.errors.email ? 
			                            <ErrorMessage>{props.errors.email}</ErrorMessage>
			                            : null}
								</FormGroup>
								<FormGroup>
									<label>{t('SignUp.form_label3')}</label>
									<PasswordInput
										name="password"
										value={props.values.password}
										onChange={props.handleChange}
										onBlur={props.handleBlur}
										/>
									{props.touched.password && props.errors.password ? 
			                            <ErrorMessage>{props.errors.password}</ErrorMessage>
			                            : null}
								</FormGroup>

								<input ref={this.btnRef} type="submit" value={t('SignUp.form_submit')} />
							</Form>
						)}
					</Formik>
				</CenterContent>
				<Footer />
			</Page>
		);
	}
}

export default withTranslation()(withRouter(SignUp));