import React, { useState } from 'react';

import api from "../services/api";

function SendEmailToken() {

	const [message, setMessage] = useState("");

	const sendEmail = async (e) => {
		e.preventDefault();

		api.get('/api/users/send-email-token')
			.then(response => {
				if (response.data.success) {
                	if(response.data.message) {
                		setMessage(response.data.message);
                	}
                } else {
                    if(response.data.message) {
                		setMessage(response.data.message);
                	} else {
                		setMessage('Ocorreu um erro ao enviar o e-mail');
                	}
                }
			})
			.catch(error => {
				if(error.response.data.message) {
                    setMessage(error.response.data.message);
                } else {
                    alert("Ocorreu um erro Inesperado :(");
                }
			});
	}

	return (
		<div>
			<span>Confirme seu e-mail para receber acesso as funcionalidades de Admin</span>
			<button onClick={sendEmail}>Enviar E-mail</button>

			<br/>
			<span>{message}</span>
		</div>
	);
}

export default SendEmailToken;