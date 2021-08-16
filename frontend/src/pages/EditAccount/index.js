import React, { useEffect, useState, useRef } from "react";
import { withRouter } from "react-router-dom";

import Navbar from "../../components/Navbar";

import api from "../../services/api";

import jwt from "../../services/auth";

import { Page, CenterContent, Title, Form, FormGroup, ErrorMessage, ProgressBar } from '../../styles/default';

import { useTranslation } from 'react-i18next';

import { ConfirmContainer, AcceptButton, RejectButton } from './style';

import { useFormik } from 'formik';
import * as Yup from 'yup';

function EditAccount(props){

    const [errorMessage, setErrorMessage] = useState("");
    const [bcdEmail, setBCDEmail] = useState("");
    const [changeEmail, setChangeEmail] = useState(false);

    const [loading, setLoading] = useState(false);

    const { t } = useTranslation();

    const btnRef = useRef();

    const {
        handleSubmit,
        handleChange,
        handleBlur,
        errors,
        touched,
        values,
        setValues
    } = useFormik({
        initialValues: {
            username: '',
            email: ''
        },
        onSubmit: (values, { setErrors }) => {
            if(btnRef.current){
                btnRef.current.setAttribute("disabled", "disabled");
            }

            setLoading(true);

            if(values.email !== bcdEmail && changeEmail !== true) {
                setChangeEmail(true);
            } else {
                api.post("/api/users/account/update", {username: values.username, email: values.email})
                    .then(response => {
                        if(response.data.success) {
                            let user = jwt.getUser();
                            user.username = values.username;
                            user.email = values.email;
                            
                            if(changeEmail === true) {
                                user.emailIsConfirmed = false;
                            }

                            jwt.setUser(user);

                            props.history.push("/dashboard");
                        } else {
                            setErrorMessage(response.data.message);
                        }
                    })
                    .catch(error => {
                        if(error.response.data) {
                            if(error.response.data.message) {
                                setErrorMessage(error.response.data.message);
                            }
                            if (error.response.data.errors) {
                                setErrors({
                                    username: error.response.data.errors.username,
                                    email: error.response.data.errors.email
                                });
                            }
                        }
                        else{
                            setErrorMessage(t('Error.unexpectedresponse'));
                        }
                    });
            }

            if(btnRef.current){
                btnRef.current.removeAttribute("disabled");
            }

            setLoading(false);
        },
        validationSchema: Yup.object({
            username: Yup.string().required(t('Validations.User.username_required')).min(3, t('Validations.User.username_min')).max(35, t('Validations.User.username_max')),
            email: Yup.string().required(t('Validations.User.email_required')).email(t('Validations.User.email_invalid'))
        })
    });

    const confirmChangeEmail = e => {
        setChangeEmail(true);
        handleSubmit(values);
    }

    const resetChangeEmail = e => {
        e.preventDefault();

        values.email = bcdEmail;
        setChangeEmail(false);
    }
    
	useEffect(() => {
        api.get("/api/users/account")
            .then(response => {
                if (response.data.success) {
                    setValues({
                        username: response.data.user.username,
                        email: response.data.user.email
                    });
                    setBCDEmail(response.data.user.email);
                } else {
                    setErrorMessage(response.data.message);
                }
            })
            .catch(error => {
            	if(error.response.data.message) {
                    setErrorMessage(error.response.data.message);
                } else {
                    setErrorMessage(t('Error.unexpected'));
                }
            });
    }, [t, setValues]);

	return (
		<Page>
		    <Navbar />
			<CenterContent>
                <Title>{t('EditAccount.title')}</Title>

				<ErrorMessage>{errorMessage}</ErrorMessage>

                <Form onSubmit={handleSubmit}>

                    {(loading === true) && 
                        <ProgressBar />
                    }
                    
                    <FormGroup>
                        <label>{t('EditAccount.form_label1')}</label>
                        <input  type="text"
                                name="username"
                                value={values.username}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                />
                        {touched.username && errors.username ? 
                            <ErrorMessage>{errors.username}</ErrorMessage>
                            : null}
                    </FormGroup>

                    <FormGroup>
                        <label>{t('EditAccount.form_label2')}</label>
                        <input  type="text"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                />
                        {touched.email && errors.email ? 
                            <ErrorMessage>{errors.email}</ErrorMessage>
                            : null}
                    </FormGroup>

                    {(changeEmail === true)
                        ?
                        <ConfirmContainer>
                            <label>{t('EditAccount.emailedit_text')}</label>
                            <AcceptButton type="submit" onClick={confirmChangeEmail}>{t('EditAccount.emailedit_accept')}</AcceptButton>
                            <RejectButton onClick={resetChangeEmail}>{t('EditAccount.emailedit_reject')}</RejectButton>
                        </ConfirmContainer>
                        :
                        <input ref={btnRef} type="submit" value={t('EditAccount.form_submit')}/>
                    }
                    
                </Form>
			</CenterContent>
		</Page>
	);
}

export default withRouter(EditAccount);