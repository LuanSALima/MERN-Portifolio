import React, { useState } from 'react';

import api from "../../services/api";

import { Container, Text, Button, SucessMessage, ErrorMessage, ProgressBar } from './styles';

function SendEmailToken() {

	const [message, setMessage] = useState("");
	const [isSuccess, setIsSuccess] = useState(null);
	const [loading, setLoading] = useState(false);

	const sendEmail = async (e) => {
		e.preventDefault();

		setLoading(true);

		await api.get('/api/auth/send-email-token')
			.then(response => {
				if (response.data.success) {
					setIsSuccess(true);

                	if(response.data.message) {
                		setMessage(response.data.message);
                	}
                } else {
                	setIsSuccess(false);

                    if(response.data.message) {
                		setMessage(response.data.message);
                	} else {
                		setMessage('Ocorreu um erro ao enviar o e-mail');
                	}
                }
			})
			.catch(error => {
				setIsSuccess(false);

				if(error.response.data.message) {
                    setMessage(error.response.data.message);
                } else {
                    setMessage("Ocorreu um erro Inesperado :(");
                }
			});

		setLoading(false);
	}

	return (
		<Container>
			<Text>Confirme seu e-mail para receber acesso as funcionalidades de Admin</Text>
			<Button onClick={sendEmail}>Enviar E-mail</Button>

			{(isSuccess === true)
			?
				<SucessMessage>{message}</SucessMessage>
			:
				<ErrorMessage>{message}</ErrorMessage>
			}

			{(loading === true) && 
				<ProgressBar />
			}
		</Container>
	);
}

export default SendEmailToken;