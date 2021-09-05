import React, { Component } from 'react';

import api from "../../services/api";

import { withRouter } from "react-router-dom";

import Header from "../../components/Header";

import Footer from '../../components/Footer';

import { Page, CenterContent, Title, Form, FormGroup, ErrorMessage, ProgressBar } from '../../styles/default';

import { withTranslation } from 'react-i18next';

import { Formik } from 'formik';
import * as Yup from 'yup';

class EditUser extends Component {

	constructor(props) {
		super(props);

		this.state = {
			id: props.match.params.id,
			username: "",
			error: "",
		    loading: false
		}

		this.btnRef = React.createRef();
	}

	componentDidMount() {

		const { t } = this.props;
		document.title = 'MERN - ' + t('EditUser.title');

		api.get("/api/users/"+this.state.id)
			.then(response => {
				if(response.data.success) {
					this.setState({
						username: response.data.user.username
					})
				} else {
                    this.setState({error: response.data.message});
                }
			})
			.catch(error => {
				if(error.response) {
	                if(error.response.data) {
	                    if(error.response.data.message) {
	                        this.setState({error: error.response.data.message});
	                    }
	                }
	                else{
	                    this.setState({error: t('Error.unexpectedresponse')});
	                }
            	}
            });

	}

	render() {
		const { t } = this.props;

		return (
			<Page>
			    <Header />
				<CenterContent>
					<Title>{t('EditUser.title')}</Title>
					<ErrorMessage>{this.state.error}</ErrorMessage>
					<Formik
						enableReinitialize={true}

						initialValues={{
				            username: this.state.username
				        }}

				        onSubmit={async (values, { setErrors }) => {
							if(this.btnRef.current){
								this.btnRef.current.setAttribute("disabled", "disabled");
							}

							this.setState({loading: true});

							api.post("/api/users/update/"+this.state.id, {username: values.username})
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
					                    else if(error.response.data.errors) {
					                        setErrors({username: error.response.data.errors.username})
					                    }
					                    else{ 
					                    	this.setState({error: t('Error.unexpectedresponse')});
					                	}
					                }
					            });

					        if(this.btnRef.current){
								this.btnRef.current.removeAttribute("disabled");
							}

					        this.setState({loading: false});
				        }}

				        validationSchema={Yup.object({
				        	username: Yup.string().required(t('Validations.User.username_required')).min(3, t('Validations.User.username_min')).max(35, t('Validations.User.username_max'))
				        })}
					>
						{props => (
							<Form onSubmit={props.handleSubmit}>

								{(this.state.loading === true) && 
			                        <ProgressBar />
			                    }

								<FormGroup>
			                        <label htmlFor="username">{t('EditUser.form_label1')}</label>
			                        <input  id="username"
			                        		type="text"
			                                name="username"
											value={props.values.username}
											onChange={props.handleChange}
											onBlur={props.handleBlur}
			                                />
			                        {props.touched.username && props.errors.username ? 
			                            <ErrorMessage>{props.errors.username}</ErrorMessage>
			                            : null}
			                    </FormGroup>

								<input ref={this.btnRef} type="submit" value={t('EditUser.form_submit')} />
							</Form>
						)}
					</Formik>
				</CenterContent>
				<Footer i18nT={t}/>
			</Page>
		);
	}
}

export default withTranslation()(withRouter(EditUser));