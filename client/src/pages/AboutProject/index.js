import React, { Component } from 'react';

import Navbar from "../../components/Navbar";

import { Accordion, Card } from 'react-bootstrap';

import { Page, CenterContent, Title } from '../../styles/default';

import { Text, PackageTitle, AccordionHeader, AccordionBody, AccordionSubHeader } from './styles';

export default class AboutProject extends Component {

	render() {
		return (
			<Page>
			    <Navbar />
				<CenterContent>
					<Title>Sobre o Projeto</Title>

					<Accordion>
						<Card>
							<Accordion.Toggle as={AccordionHeader} eventKey="0">
                                O que é MERN
                            </Accordion.Toggle>

                            <Accordion.Collapse eventKey="0">
                                <AccordionBody>
									<Text>
								    	MERN é uma das várias variações da pilha MEAN (MongoDB, Express, Angular, Node), onde a estrutura de front-end tradicional Angular.js é substituída por React.js. Outras variantes incluem MEVN (MongoDB, Express, Vue, Node) e realmente qualquer estrutura de front-end JavaScript pode funcionar.
								    </Text>
								    <Text>
										Express e Node constituem a camada intermediária (aplicativo). Express.js é uma estrutura da web do lado do servidor e Node.js a plataforma de servidor JavaScript popular e poderosa. Independentemente de qual variante você escolher, ME (RVA) N é a abordagem ideal para trabalhar com JavaScript e JSON, o tempo todo.
								    </Text>
								    <Text>
								    	A arquitetura MERN permite que você construa facilmente uma arquitetura de 3 camadas (front-end, back-end, banco de dados) inteiramente usando JavaScript e JSON.
									</Text>
									<p className="text-right">Texto Original em inglês: <a href="https://www.mongodb.com/mern-stack" target="_blank" rel="noreferrer">MongoDB Oficial WebSite</a></p>
                                </AccordionBody>
                            </Accordion.Collapse>
						</Card>
						
                        <Card>
							<Accordion.Toggle as={AccordionHeader} eventKey="1">
                                Pacotes/Bibliotecas Usadas
                            </Accordion.Toggle>

                            <Accordion.Collapse eventKey="1">
                                <Accordion>
                                	<Card>
			                            <Accordion.Toggle as={AccordionSubHeader} eventKey="1">
			                                Front-end
			                            </Accordion.Toggle>

			                            <Accordion.Collapse eventKey="1">
			                                <AccordionBody>
		                                		<div className="container">
			                                		<PackageTitle>React</PackageTitle>
			                                		<a href="https://www.npmjs.com/package/react" target="_blank" rel="noreferrer">Página no npmjs.com</a> - <a href="https://pt-br.reactjs.org/docs/getting-started.html" target="_blank" rel="noreferrer">Documentação</a>
			                                	</div>
			                                	<br />
			                                	<div className="container">
			                                		<PackageTitle>React Bootstrap</PackageTitle>
			                                		<a href="https://www.npmjs.com/package/react-bootstrap" target="_blank" rel="noreferrer">Página no npmjs.com</a> - <a href="https://react-bootstrap.github.io/" target="_blank" rel="noreferrer">Documentação</a>
			                                	</div>
			                                	<br />
			                                	<div className="container">
			                                		<PackageTitle>Axios</PackageTitle>
			                                		<a href="https://www.npmjs.com/package/axios" target="_blank" rel="noreferrer">Página no npmjs.com</a> - <a href="https://axios-http.com/docs/intro" target="_blank" rel="noreferrer">Documentação</a>
			                                	</div>
			                                	<br />
			                                	<div className="container">
			                                		<PackageTitle>Bootstrap</PackageTitle>
			                                		<a href="https://www.npmjs.com/package/bootstrap" target="_blank" rel="noreferrer">Página no npmjs.com</a> - <a href="https://getbootstrap.com/docs/5.0/getting-started/introduction/" target="_blank" rel="noreferrer">Documentação</a>
			                                	</div>
			                                	<br />
			                                	<div className="container">
			                                		<PackageTitle>Styled Components</PackageTitle>
			                                		<a href="https://www.npmjs.com/package/styled-components" target="_blank" rel="noreferrer">Página no npmjs.com</a> - <a href="https://styled-components.com/docs" target="_blank" rel="noreferrer">Documentação</a>
			                                	</div>
			                                	<br />
			                                	<div className="container">
			                                		<PackageTitle>React i18next</PackageTitle>
			                                		<a href="https://www.npmjs.com/package/react-i18next" target="_blank" rel="noreferrer">Página no npmjs.com</a> - <a href="https://react.i18next.com/" target="_blank" rel="noreferrer">Documentação</a>
			                                	</div>
			                                </AccordionBody>
			                            </Accordion.Collapse>
			                        </Card>

                                	<Card>
			                            <Accordion.Toggle as={AccordionSubHeader} eventKey="0">
			                                Back-end
			                            </Accordion.Toggle>

			                            <Accordion.Collapse eventKey="0">
			                                <AccordionBody>
											    <div className="container">
			                                		<PackageTitle>Express</PackageTitle>
			                                		<a href="https://www.npmjs.com/package/express" target="_blank" rel="noreferrer">Página no npmjs.com</a> - <a href="https://expressjs.com/pt-br/starter/hello-world.html" target="_blank" rel="noreferrer">Documentação</a>
			                                	</div>
			                                	<br />
			                                	<div className="container">
			                                		<PackageTitle>Mongoose</PackageTitle>
			                                		<a href="https://www.npmjs.com/package/mongoose" target="_blank" rel="noreferrer">Página no npmjs.com</a> - <a href="https://mongoosejs.com/docs/index.html" target="_blank" rel="noreferrer">Documentação</a>
			                                	</div>
			                                	<br />
			                                	<div className="container">
			                                		<PackageTitle>Cors</PackageTitle>
			                                		<a href="https://www.npmjs.com/package/cors" target="_blank" rel="noreferrer">Página no npmjs.com</a> - <a href="http://expressjs.com/en/resources/middleware/cors.html" target="_blank" rel="noreferrer">Documentação</a>
			                                	</div>
			                                	<br />
			                                	<div className="container">
			                                		<PackageTitle>JsonWebToken</PackageTitle>
			                                		<a href="https://www.npmjs.com/package/jsonwebtoken" target="_blank" rel="noreferrer">Página no npmjs.com</a> - <a href="https://github.com/auth0/node-jsonwebtoken" target="_blank" rel="noreferrer">Página no GitHub</a>
			                                	</div>
			                                	<br />
			                                	<div className="container">
			                                		<PackageTitle>Nodemailer</PackageTitle>
			                                		<a href="https://www.npmjs.com/package/nodemailer" target="_blank" rel="noreferrer">Página no npmjs.com</a> - <a href="https://nodemailer.com/" target="_blank" rel="noreferrer">Página Oficial</a>
			                                	</div>
			                                	<br />
			                                	<div className="container">
			                                		<PackageTitle>Nodemailer Express Handlebars</PackageTitle>
			                                		<a href="https://www.npmjs.com/package/nodemailer-express-handlebars" target="_blank" rel="noreferrer">Página no npmjs.com</a> - <a href="https://github.com/yads/nodemailer-express-handlebars" target="_blank" rel="noreferrer">Página no GitHub</a>
			                                	</div>
			                                	<br />
			                                	<div className="container">
			                                		<PackageTitle>Bcryptjs</PackageTitle>
			                                		<a href="https://www.npmjs.com/package/bcryptjs" target="_blank" rel="noreferrer">Página no npmjs.com</a> - <a href="https://github.com/dcodeIO/bcrypt.js" target="_blank" rel="noreferrer">Página no GitHub</a>
			                                	</div>
			                                	<br />
			                                </AccordionBody>
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