import React, { Component } from 'react';

import Navbar from "../../components/Navbar";

import { Card } from 'react-bootstrap';

import { Page, CenterContent, Title, SucessMessage, ErrorMessage } from '../../styles/default';

const OkCheckMark = () => {
	/*https://icons.getbootstrap.com/icons/check-lg/*/
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-lg" viewBox="0 0 16 16">
		  <path d="M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z"/>
		</svg>
	);
}

const FalseCheckMark = () => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
		  <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"/>
		</svg>
	);
}

export default class PlansProject extends Component {

	render() {
		return (
			<Page>
			    <Navbar />
				<CenterContent>
					<Title>Planos para o Projeto</Title>
					
					<Card>
						<Card.Body>
							<SucessMessage>
								<h4><OkCheckMark /> Sistema de Autenticação de Usuário</h4>
							</SucessMessage>
							<br />
							<SucessMessage>
								<h4><OkCheckMark /> Sistema de Permissão de Usuário</h4>
							</SucessMessage>
							<br />
							<SucessMessage>
								<h4><OkCheckMark /> Envio de E-mail e Confirmação de E-mail</h4>
							</SucessMessage>
							<br />
							<SucessMessage>
								<h4><OkCheckMark /> Criação de Estilo Próprio</h4>
							</SucessMessage>
							<br />
							<ErrorMessage>
								<h4><FalseCheckMark /> Tradução do Site para Inglês</h4>
							</ErrorMessage>

						</Card.Body>
					</Card>
				</CenterContent>
			</Page>
		)
	}
}