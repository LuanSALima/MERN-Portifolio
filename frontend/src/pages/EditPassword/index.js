import React, { useState, useRef, useEffect } from "react";
import { withRouter } from "react-router-dom";

import Navbar from "../../components/Navbar";

import Footer from '../../components/Footer';

import api from "../../services/api";

import { Page, CenterContent, Title, Form, FormGroup, ErrorMessage, ProgressBar } from '../../styles/default';

import { useTranslation } from 'react-i18next';

import PasswordInput from '../../components/PasswordInput';

import { useFormik } from 'formik';
import * as Yup from 'yup';

function EditPassword(props){

    const [errorMessage, setErrorMessage] = useState("");

    const [loading, setLoading] = useState(false);

    const { t } = useTranslation();

    const btnRef = useRef();

    const {
        handleSubmit,
        handleChange,
        handleBlur,
        errors,
        touched,
        values
    } = useFormik({
        initialValues: {
            actualPassword: '',
            newPassword: '',
            confirmNewPassword: ''
        },
        onSubmit: (values, { setErrors }) => {
            if(btnRef.current){
                btnRef.current.setAttribute("disabled", "disabled");
            }

            setLoading(true);
            
            api.post("/api/users/password-update", {actualPassword: values.actualPassword, newPassword: values.newPassword})
                .then(response => {
                    if(response.data.success) {
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
                        else if(error.response.data.errors) {
                            setErrors({
                                newPassword: error.response.data.errors.password
                            });
                        }
                        else{
                            setErrorMessage(t('Error.unexpectedresponse'));
                        }
                    }
                });

            if(btnRef.current){
                btnRef.current.removeAttribute("disabled");
            }

            setLoading(false);
        },
        validationSchema: Yup.object({
            actualPassword: Yup.string().required(t('Validations.User.password_required')).min(8, t('Validations.User.password_min')).max(40, t('Validations.User.password_max')),
            newPassword: Yup.string().required(t('Validations.User.password_required')).min(8, t('Validations.User.password_min')).max(40, t('Validations.User.password_max')),
            confirmNewPassword: Yup.string().required(t('Validations.User.password_required')).min(8, t('Validations.User.password_min')).max(40, t('Validations.User.password_max')).oneOf([Yup.ref('newPassword'), null], t('Validations.User.passwords_notmatch'))
        })
    });

    useEffect(() => {
        document.title = 'MERN - ' + t('EditPassword.title');
    }, [t]);

	return (
		<Page>
		    <Navbar />
			<CenterContent>
                <Title>{t('EditPassword.title')}</Title>

				<ErrorMessage>{errorMessage}</ErrorMessage>

                <Form onSubmit={handleSubmit}>

                    {(loading === true) && 
                        <ProgressBar />
                    }

                    <FormGroup>
                        <label>{t('EditPassword.form_label1')}</label>
                        <PasswordInput
                            name="actualPassword"
                            value={values.actualPassword}
                            onChange={handleChange}
                            onBlur={handleBlur} />
                        {touched.actualPassword && errors.actualPassword ? 
                            <ErrorMessage>{errors.actualPassword}</ErrorMessage>
                            : null}
                    </FormGroup>

                    <FormGroup>
                        <label>{t('EditPassword.form_label2')}</label>
                        <PasswordInput
                            name="newPassword"
                            value={values.newPassword}
                            onChange={handleChange}
                            onBlur={handleBlur} />
                        {touched.newPassword && errors.newPassword ? 
                            <ErrorMessage>{errors.newPassword}</ErrorMessage>
                            : null}
                    </FormGroup>

                    <FormGroup>
                        <label>{t('EditPassword.form_label3')}</label>
                        <PasswordInput
                            name="confirmNewPassword"
                            value={values.confirmNewPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}/>
                        {touched.confirmNewPassword && errors.confirmNewPassword ? 
                            <ErrorMessage>{errors.confirmNewPassword}</ErrorMessage>
                            : null}
                    </FormGroup>

                    <input ref={btnRef} type="submit" value={t('EditPassword.form_submit')} />
                </Form>
			</CenterContent>
            <Footer i18nT={t}/>
		</Page>
	);
}

export default withRouter(EditPassword);