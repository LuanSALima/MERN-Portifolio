import React, { useState } from "react";
import { withRouter } from "react-router-dom";

import Navbar from "../../components/Navbar";

import api from "../../services/api";

import { Page, CenterContent, Title, Form, FormGroup, ErrorMessage, ProgressBar } from '../../styles/default';

function EditAccount(props){

    const [actualPassword, setActualPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    const [errorMessage, setErrorMessage] = useState("");
    const [errorNewPassword, setErrorNewPassword] = useState("");
    const [errorConfirmNewPassword, setErrorConfirmNewPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const handleEditPassword = e => {
        e.preventDefault();

        setLoading(true);
        
        if(newPassword !== confirmNewPassword) {
            setErrorConfirmNewPassword("As senhas não coincidem");
        } else {
            api.post("/api/users/password-update", {actualPassword, newPassword})
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
                        if(error.response.data.errors) {
                            if(error.response.data.errors.password) {
                                setErrorNewPassword(error.response.data.errors.password);
                            }
                        }
                    }
                    else{
                        setErrorMessage("Houve uma resposta inesperada do servidor");
                    }
                });
        }

        setLoading(false);
    }

	return (
		<Page>
		    <Navbar />
			<CenterContent>
                <Title>Alterar Senha</Title>

				<ErrorMessage>{errorMessage}</ErrorMessage>

                <Form onSubmit={handleEditPassword}>

                    {(loading === true) && 
                        <ProgressBar />
                    }

                    <FormGroup>
                        <label>Senha Atual: </label>
                        <input  type="password"
                                required
                                value={actualPassword}
                                onChange={e => setActualPassword(e.target.value)}
                                />
                    </FormGroup>

                    <FormGroup>
                        <label>Nova Senha: </label>
                        <input  type="password"
                                required
                                value={newPassword}
                                onChange={e => setNewPassword(e.target.value)}
                                />
                        <ErrorMessage>{errorNewPassword}</ErrorMessage>
                    </FormGroup>

                    <FormGroup>
                        <label>Confirmar Nova Senha: </label>
                        <input  type="password"
                                required
                                value={confirmNewPassword}
                                onChange={e => setConfirmNewPassword(e.target.value)}
                                />
                        <ErrorMessage>{errorConfirmNewPassword}</ErrorMessage>
                    </FormGroup>

                    <input type="submit" value="Alterar" />
                </Form>
			</CenterContent>
		</Page>
	);
}

export default withRouter(EditAccount);