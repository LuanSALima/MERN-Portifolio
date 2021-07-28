import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";

import Navbar from "../../components/Navbar";

import api from "../../services/api";

import { updateUser } from "../../services/auth";

import { Page, CenterContent, Title, Form, FormGroup, ErrorMessage, ProgressBar } from '../../styles/default';

import { useTranslation } from 'react-i18next';

function EditAccount(props){

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [errorUsername, setErrorUsername] = useState("");
    const [errorEmail, setErrorEmail] = useState("");

    const [loading, setLoading] = useState(false);

    const { t } = useTranslation();

    const handleEditAccount = e => {
        e.preventDefault();

        setLoading(true);

        api.post("/api/users/account/update", {username, email})
            .then(response => {
                if(response.data.success) {
                    updateUser(username, email);
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
                        if(error.response.data.errors.username) {
                            setErrorUsername(error.response.data.errors.username)
                        }
                        if(error.response.data.errors.email) {
                            setErrorEmail(error.response.data.errors.email);
                        }
                    }
                }
                else{
                    setErrorMessage("Houve uma resposta inesperada do servidor");
                }
            });

        setLoading(false);
    }

	useEffect(() => {
        api.get("/api/users/account")
            .then(response => {
                if (response.data.success) {
                    setUsername(response.data.user.username);
                    setEmail(response.data.user.email);
                } else {
                    setErrorMessage(response.data.message);
                }
            })
            .catch(error => {
            	if(error.response.data.message) {
                    setErrorMessage(error.response.data.message);
                } else {
                    alert("Ocorreu um erro Inesperado :(");
                }
            });
    }, [])

	return (
		<Page>
		    <Navbar />
			<CenterContent>
                <Title>{t('EditAccount.title')}</Title>

				<ErrorMessage>{errorMessage}</ErrorMessage>

                <Form onSubmit={handleEditAccount}>

                    {(loading === true) && 
                        <ProgressBar />
                    }
                    
                    <FormGroup>
                        <label>{t('EditAccount.form_label1')}</label>
                        <input  type="text"
                                required
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                />
                        <ErrorMessage>{errorUsername}</ErrorMessage>
                    </FormGroup>

                    <FormGroup>
                        <label>{t('EditAccount.form_label2')}</label>
                        <input  type="email"
                                required
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                />
                        <ErrorMessage>{errorEmail}</ErrorMessage>
                    </FormGroup>

                    <input type="submit" value={t('EditAccount.form_submit')}/>
                </Form>
			</CenterContent>
		</Page>
	);
}

export default withRouter(EditAccount);