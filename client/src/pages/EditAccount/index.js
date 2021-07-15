import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";

import Navbar from "../../components/navbar.component";

import api from "../../services/api";

import { updateUser } from "../../services/auth";

function EditAccount(props){

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [errorUsername, setErrorUsername] = useState("");
    const [errorEmail, setErrorEmail] = useState("");

    const handleEditAccount = e => {
        e.preventDefault();

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
		<div>
		    <Navbar />
			<div className="container">
                <h3>Editar Conta</h3>

				<span className="alert-danger text-center">{errorMessage}</span>

                <form onSubmit={handleEditAccount}>
                    <div className="form-group">
                        <label>Nome: </label>
                        <input  type="text"
                                required
                                className="form-control"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                />
                        <span className="text-danger">{errorUsername}</span>
                    </div>

                    <div className="form-group">
                        <label>Email: </label>
                        <input  type="email"
                                required
                                className="form-control"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                />
                        <span className="text-danger">{errorEmail}</span>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Alterar" className="btn btn-primary" />
                    </div>
                </form>
			</div>
		</div>
	);
}

export default withRouter(EditAccount);