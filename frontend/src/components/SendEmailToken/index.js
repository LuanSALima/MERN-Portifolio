import React, { useState, useRef } from 'react';

import api from "../../services/api";

import { Container, Text, Button  } from './styles';

import { SucessMessage, ErrorMessage, ProgressBar } from '../../styles/default';

import { useTranslation } from 'react-i18next';

function SendEmailToken() {

	const [message, setMessage] = useState("");
	const [isSuccess, setIsSuccess] = useState(null);
	const [loading, setLoading] = useState(false);

	const { t } = useTranslation();

	const btnRef = useRef();

	const sendEmail = async (e) => {
		e.preventDefault();

		if(btnRef.current){
			btnRef.current.setAttribute("disabled", "disabled");
		}

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
                		setMessage(t('Error.sendemail'));
                	}
                }
			})
			.catch(error => {
				setIsSuccess(false);
				
				if(btnRef.current){
					btnRef.current.removeAttribute("disabled");
				}

				if(error.response.data.message) {
                    setMessage(error.response.data.message);
                } else {
                    setMessage(t('Error.unexpected'));
                }
			});

		setLoading(false);
	}

	return (
		<Container>
			<Text>{t('SendEmailToken.message_text')}</Text>
			<Button ref={btnRef} onClick={sendEmail}>{t('SendEmailToken.button_text')}</Button>

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