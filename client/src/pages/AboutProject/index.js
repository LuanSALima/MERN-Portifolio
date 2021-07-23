import React, { Component } from 'react';

import Navbar from "../../components/navbar.component";

import { Accordion, Card } from 'react-bootstrap';

import { Page, CenterContent, Title } from '../../styles/default';

export default class AboutProject extends Component {

	render() {
		return (
			<Page>
			    <Navbar />
				<CenterContent>
					<Title>Sobre o Projeto</Title>

					<Accordion>
						<Card>
							<Accordion.Toggle as={Card.Header} eventKey="0">
                                <h4>O que é MERN</h4>
                            </Accordion.Toggle>

                            <Accordion.Collapse eventKey="0">
                                <Card.Body className="px-5">
								    <p className="text-left">
								    	MERN é uma das várias variações da pilha MEAN (MongoDB, Express, Angular, Node), onde a estrutura de front-end tradicional Angular.js é substituída por React.js. Outras variantes incluem MEVN (MongoDB, Express, Vue, Node) e realmente qualquer estrutura de front-end JavaScript pode funcionar.
								    </p>
								    <p className="text-left">
										Express e Node constituem a camada intermediária (aplicativo). Express.js é uma estrutura da web do lado do servidor e Node.js a plataforma de servidor JavaScript popular e poderosa. Independentemente de qual variante você escolher, ME (RVA) N é a abordagem ideal para trabalhar com JavaScript e JSON, o tempo todo.
								    </p>
								    <p className="text-left">
								    	A arquitetura MERN permite que você construa facilmente uma arquitetura de 3 camadas (front-end, back-end, banco de dados) inteiramente usando JavaScript e JSON.
									</p>
									<p className="text-right">Texto Original em inglês: <a href="https://www.mongodb.com/mern-stack" target="_blank" rel="noreferrer">MongoDB Oficial WebSite</a></p>
                                </Card.Body>
                            </Accordion.Collapse>
						</Card>
						
                        <Card>
							<Accordion.Toggle as={Card.Header} eventKey="1">
                                <h4>Pacotes/Bibliotecas Usadas</h4>
                            </Accordion.Toggle>

                            <Accordion.Collapse eventKey="1">
                                <Accordion>
                                	<Card>
			                            <Accordion.Toggle as={Card.Header} eventKey="1">
			                                <h5>Front-end</h5>
			                            </Accordion.Toggle>

			                            <Accordion.Collapse eventKey="1">
			                                <Card.Body>
		                                		<div className="container">
			                                		<h5>React</h5>
			                                		<a href="https://www.npmjs.com/package/react" target="_blank" rel="noreferrer">Página no npmjs.com</a> - <a href="https://pt-br.reactjs.org/docs/getting-started.html" target="_blank" rel="noreferrer">Documentação</a>
			                                	</div>
			                                	<br />
			                                	<div className="container">
			                                		<h5>React Bootstrap</h5>
			                                		<a href="https://www.npmjs.com/package/react-bootstrap" target="_blank" rel="noreferrer">Página no npmjs.com</a> - <a href="https://react-bootstrap.github.io/" target="_blank" rel="noreferrer">Documentação</a>
			                                	</div>
			                                	<br />
			                                	<div className="container">
			                                		<h5>Axios</h5>
			                                		<a href="https://www.npmjs.com/package/axios" target="_blank" rel="noreferrer">Página no npmjs.com</a> - <a href="https://axios-http.com/docs/intro" target="_blank" rel="noreferrer">Documentação</a>
			                                	</div>
			                                	<br />
			                                	<div className="container">
			                                		<h5>Bootstrap</h5>
			                                		<a href="https://www.npmjs.com/package/bootstrap" target="_blank" rel="noreferrer">Página no npmjs.com</a> - <a href="https://getbootstrap.com/docs/5.0/getting-started/introduction/" target="_blank" rel="noreferrer">Documentação</a>
			                                	</div>
			                                	<br />
			                                	<div className="container">
			                                		<h5>Styled Components</h5>
			                                		<a href="https://www.npmjs.com/package/styled-components" target="_blank" rel="noreferrer">Página no npmjs.com</a> - <a href="https://styled-components.com/docs" target="_blank" rel="noreferrer">Documentação</a>
			                                	</div>
			                                </Card.Body>
			                            </Accordion.Collapse>
			                        </Card>

                                	<Card>
			                            <Accordion.Toggle as={Card.Header} eventKey="0">
			                                <h5>Back-end</h5>
			                            </Accordion.Toggle>

			                            <Accordion.Collapse eventKey="0">
			                                <Card.Body>
											    <div className="container">
			                                		<h5>Express</h5>
			                                		<a href="https://www.npmjs.com/package/express" target="_blank" rel="noreferrer">Página no npmjs.com</a> - <a href="https://expressjs.com/pt-br/starter/hello-world.html" target="_blank" rel="noreferrer">Documentação</a>
			                                	</div>
			                                	<br />
			                                	<div className="container">
			                                		<h5>Mongoose</h5>
			                                		<a href="https://www.npmjs.com/package/mongoose" target="_blank" rel="noreferrer">Página no npmjs.com</a> - <a href="https://mongoosejs.com/docs/index.html" target="_blank" rel="noreferrer">Documentação</a>
			                                	</div>
			                                	<br />
			                                	<div className="container">
			                                		<h5>Cors</h5>
			                                		<a href="https://www.npmjs.com/package/cors" target="_blank" rel="noreferrer">Página no npmjs.com</a> - <a href="http://expressjs.com/en/resources/middleware/cors.html" target="_blank" rel="noreferrer">Documentação</a>
			                                	</div>
			                                	<br />
			                                	<div className="container">
			                                		<h5>JsonWebToken</h5>
			                                		<a href="https://www.npmjs.com/package/jsonwebtoken" target="_blank" rel="noreferrer">Página no npmjs.com</a> - <a href="https://github.com/auth0/node-jsonwebtoken" target="_blank" rel="noreferrer">Página no GitHub</a>
			                                	</div>
			                                	<br />
			                                	<div className="container">
			                                		<h5>Nodemailer</h5>
			                                		<a href="https://www.npmjs.com/package/nodemailer" target="_blank" rel="noreferrer">Página no npmjs.com</a> - <a href="https://nodemailer.com/" target="_blank" rel="noreferrer">Página Oficial</a>
			                                	</div>
			                                	<br />
			                                	<div className="container">
			                                		<h5>Nodemailer Express Handlebars</h5>
			                                		<a href="https://www.npmjs.com/package/nodemailer-express-handlebars" target="_blank" rel="noreferrer">Página no npmjs.com</a> - <a href="https://github.com/yads/nodemailer-express-handlebars" target="_blank" rel="noreferrer">Página no GitHub</a>
			                                	</div>
			                                	<br />
			                                	<div className="container">
			                                		<h5>Bcryptjs</h5>
			                                		<a href="https://www.npmjs.com/package/bcryptjs" target="_blank" rel="noreferrer">Página no npmjs.com</a> - <a href="https://github.com/dcodeIO/bcrypt.js" target="_blank" rel="noreferrer">Página no GitHub</a>
			                                	</div>
			                                	<br />
			                                </Card.Body>
			                            </Accordion.Collapse>
			                        </Card>
                                </Accordion>
                            </Accordion.Collapse>
						</Card>
                    </Accordion>
				</CenterContent>
			</Page>
		)
	}
}