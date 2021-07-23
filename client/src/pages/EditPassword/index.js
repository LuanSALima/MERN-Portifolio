import React, { useState } from "react";
import { withRouter } from "react-router-dom";

import Navbar from "../../components/navbar.component";

import api from "../../services/api";

import { Page, CenterContent, Title } from '../../styles/default';

function EditAccount(props){

    const [actualPassword, setActualPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    const [errorMessage, setErrorMessage] = useState("");
    const [errorNewPassword, setErrorNewPassword] = useState("");
    const [errorConfirmNewPassword, setErrorConfirmNewPassword] = useState("");

    const handleEditPassword = e => {
        e.preventDefault();
        
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
    }

	return (
		<Page>
		    <Navbar />
			<CenterContent>
                <Title>Alterar Senha</Title>

				<span className="alert-danger text-center">{errorMessage}</span>

                <form onSubmit={handleEditPassword}>
                    <div className="form-group">
                        <label>Senha Atual: </label>
                        <input  type="password"
                                required
                                className="form-control"
                                value={actualPassword}
                                onChange={e => setActualPassword(e.target.value)}
                                />
                    </div>

                    <div className="form-group">
                        <label>Nova Senha: </label>
                        <input  type="password"
                                required
                                className="form-control"
                                value={newPassword}
                                onChange={e => setNewPassword(e.target.value)}
                                />
                        <span className="text-danger">{errorNewPassword}</span>
                    </div>

                    <div className="form-group">
                        <label>Confirmar Nova Senha: </label>
                        <input  type="password"
                                required
                                className="form-control"
                                value={confirmNewPassword}
                                onChange={e => setConfirmNewPassword(e.target.value)}
                                />
                        <span className="text-danger">{errorConfirmNewPassword}</span>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Alterar" className="btn btn-primary" />
                    </div>
                </form>
			</CenterContent>
		</Page>
	);
}

export default withRouter(EditAccount);