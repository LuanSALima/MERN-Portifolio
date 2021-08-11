import React, { useEffect, useState, useRef } from "react";
import { withRouter } from "react-router-dom";

import Navbar from "../../components/Navbar";

import api from "../../services/api";

import jwt from "../../services/auth";

import { Page, CenterContent, Title, Form, FormGroup, ErrorMessage, ProgressBar } from '../../styles/default';

import { useTranslation } from 'react-i18next';

import { ConfirmContainer, AcceptButton, RejectButton } from './style';

function EditAccount(props){

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [errorUsername, setErrorUsername] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [bcdEmail, setBCDEmail] = useState("");
    const [changeEmail, setChangeEmail] = useState(false);

    const [loading, setLoading] = useState(false);

    const { t } = useTranslation();

    const btnRef = useRef();

    const handleEditAccount = e => {
        e.preventDefault();

        if(btnRef.current){
            btnRef.current.setAttribute("disabled", "disabled");
        }

        setLoading(true);

        if(email !== bcdEmail && changeEmail !== true) {
            setChangeEmail(true);
        } else {
            api.post("/api/users/account/update", {username, email})
                .then(response => {
                    if(response.data.success) {
                        let user = jwt.getUser();
                        user.username = username;
                        user.email = email;
                        
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
                            if(error.response.data.errors.username) {
                                setErrorUsername(error.response.data.errors.username)
                            }
                            if(error.response.data.errors.email) {
                                setErrorEmail(error.response.data.errors.email);
                            }
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
    }

    const confirmChangeEmail = e => {
        setChangeEmail(true);
        handleEditAccount(e);
    }

    const resetChangeEmail = e => {
        e.preventDefault();

        setEmail(bcdEmail);
        setChangeEmail(false);
    }

	useEffect(() => {
        api.get("/api/users/account")
            .then(response => {
                if (response.data.success) {
                    setUsername(response.data.user.username);
                    setEmail(response.data.user.email);
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

                    {(changeEmail === true)
                        ?
                        <ConfirmContainer>
                            <label>{t('EditAccount.emailedit_text')}</label>
                            <AcceptButton onClick={confirmChangeEmail}>{t('EditAccount.emailedit_accept')}</AcceptButton>
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