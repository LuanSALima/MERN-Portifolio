import React, { Component } from 'react';

import Navbar from "../../components/Navbar";

import Footer from '../../components/Footer';

import { Accordion, Card } from 'react-bootstrap';

import { Page, CenterContent, Title } from '../../styles/default';

import { Text, PackageTitle, AccordionHeader, AccordionBody, AccordionSubHeader, TextContainer, PackageContainer } from './styles';

import { withTranslation } from 'react-i18next';

class AboutProject extends Component {

	componentDidMount(){
		const { t } = this.props;
		document.title = 'MERN - ' + t('AboutProject.title');
	}

	render() {
		const { t } = this.props;

		return (
			<Page>
			    <Navbar />
				<CenterContent>
					<Title>{t('AboutProject.title')}</Title>

					<Accordion>
						<Card>
							<Accordion.Toggle as={AccordionHeader} eventKey="0">
                                {t('AboutProject.accordion1_title')}
                            </Accordion.Toggle>

                            <Accordion.Collapse eventKey="0">
                                <AccordionBody>
                                	<TextContainer>
										<Text>
									    	{t('AboutProject.accordion1_text1')}
									    </Text>
									    <Text>
											{t('AboutProject.accordion1_text2')}
									    </Text>
									    <Text>
									    	{t('AboutProject.accordion1_text3')}
										</Text>
										<p className="text-right">{t('AboutProject.accordion1_linktext1')} <a href="https://www.mongodb.com/mern-stack" target="_blank" rel="noreferrer">{t('AboutProject.accordion1_link')}</a></p>
                                	</TextContainer>
                                </AccordionBody>
                            </Accordion.Collapse>
						</Card>

						<Card>
							<Accordion.Toggle as={AccordionHeader} eventKey="1">
                                {t('AboutProject.accordion2_title')}
                            </Accordion.Toggle>

                            <Accordion.Collapse eventKey="1">
                                <AccordionBody>
                                	<TextContainer>
										<Text>
									    	{t('AboutProject.accordion2_text1')}
									    </Text>
									    <p className="text-right">{t('AboutProject.accordion2_linktext1')} <a href="https://www.heroku.com/about" target="_blank" rel="noreferrer">{t('AboutProject.accordion2_link1')}</a></p>
								    </TextContainer>

								    <TextContainer>
									    <Text>
											{t('AboutProject.accordion2_text2')}
									    </Text>
									    <Text>
									    	{t('AboutProject.accordion2_text3')}
										</Text>
										<Text>
									    	{t('AboutProject.accordion2_text4')}
									    </Text>
									    <Text>
											{t('AboutProject.accordion2_text5')}
									    </Text>
									    <Text>
									    	{t('AboutProject.accordion2_text6')}
										</Text>
										<p className="text-right">{t('AboutProject.accordion2_linktext1')} <a href="https://devcenter.heroku.com/articles/how-heroku-works" target="_blank" rel="noreferrer">{t('AboutProject.accordion2_link1')}</a></p>
								    </TextContainer>

								    <TextContainer>
										<Text>
									    	{t('AboutProject.accordion2_text7')}
									    </Text>
									    <Text>
											{t('AboutProject.accordion2_text8')}
									    </Text>
										<p className="text-right">{t('AboutProject.accordion2_linktext2')} <a href="https://www.heroku.com/pricing" target="_blank" rel="noreferrer">{t('AboutProject.accordion2_link1')}</a></p>
                                	</TextContainer>
                                </AccordionBody>
                            </Accordion.Collapse>
						</Card>
						
                        <Card>
							<Accordion.Toggle as={AccordionHeader} eventKey="2">
                                {t('AboutProject.accordion3_title')}
                            </Accordion.Toggle>

                            <Accordion.Collapse eventKey="2">
                                <Accordion>
                                	<Card>
			                            <Accordion.Toggle as={AccordionSubHeader} eventKey="1">
			                                {t('AboutProject.accordion3_subtitle1')}
			                            </Accordion.Toggle>

			                            <Accordion.Collapse eventKey="1">
			                                <AccordionBody>
		                                		<PackageContainer>
			                                		<PackageTitle>React</PackageTitle>
			                                		<a href="https://www.npmjs.com/package/react" target="_blank" rel="noreferrer">{t('AboutProject.accordion3_npmjspage')}</a> - <a href="https://pt-br.reactjs.org/docs/getting-started.html" target="_blank" rel="noreferrer">{t('AboutProject.accordion3_documentation')}</a>
			                                	</PackageContainer>
			                                	
			                                	<PackageContainer>
			                                		<PackageTitle>React Bootstrap</PackageTitle>
			                                		<a href="https://www.npmjs.com/package/react-bootstrap" target="_blank" rel="noreferrer">{t('AboutProject.accordion3_npmjspage')}</a> - <a href="https://react-bootstrap.github.io/" target="_blank" rel="noreferrer">{t('AboutProject.accordion3_documentation')}</a>
			                                	</PackageContainer>
			                                	
			                                	<PackageContainer>
			                                		<PackageTitle>Axios</PackageTitle>
			                                		<a href="https://www.npmjs.com/package/axios" target="_blank" rel="noreferrer">{t('AboutProject.accordion3_npmjspage')}</a> - <a href="https://axios-http.com/docs/intro" target="_blank" rel="noreferrer">{t('AboutProject.accordion3_documentation')}</a>
			                                	</PackageContainer>
			                                	
			                                	<PackageContainer>
			                                		<PackageTitle>Bootstrap</PackageTitle>
			                                		<a href="https://www.npmjs.com/package/bootstrap" target="_blank" rel="noreferrer">{t('AboutProject.accordion3_npmjspage')}</a> - <a href="https://getbootstrap.com/docs/5.0/getting-started/introduction/" target="_blank" rel="noreferrer">{t('AboutProject.accordion3_documentation')}</a>
			                                	</PackageContainer>
			                                	
			                                	<PackageContainer>
			                                		<PackageTitle>Styled Components</PackageTitle>
			                                		<a href="https://www.npmjs.com/package/styled-components" target="_blank" rel="noreferrer">{t('AboutProject.accordion3_npmjspage')}</a> - <a href="https://styled-components.com/docs" target="_blank" rel="noreferrer">{t('AboutProject.accordion3_documentation')}</a>
			                                	</PackageContainer>
			                                	
			                                	<PackageContainer>
			                                		<PackageTitle>React i18next</PackageTitle>
			                                		<a href="https://www.npmjs.com/package/react-i18next" target="_blank" rel="noreferrer">{t('AboutProject.accordion3_npmjspage')}</a> - <a href="https://react.i18next.com/" target="_blank" rel="noreferrer">{t('AboutProject.accordion3_documentation')}</a>
			                                	</PackageContainer>

			                                	<PackageContainer>
			                                		<PackageTitle>Formik</PackageTitle>
			                                		<a href="https://www.npmjs.com/package/formik" target="_blank" rel="noreferrer">{t('AboutProject.accordion3_npmjspage')}</a> - <a href="https://formik.org/docs/overview" target="_blank" rel="noreferrer">{t('AboutProject.accordion3_documentation')}</a>
			                                	</PackageContainer>

			                                	<PackageContainer>
			                                		<PackageTitle>Yup</PackageTitle>
			                                		<a href="https://www.npmjs.com/package/yup" target="_blank" rel="noreferrer">{t('AboutProject.accordion3_npmjspage')}</a> - <a href="https://github.com/jquense/yup" target="_blank" rel="noreferrer">{t('AboutProject.accordion3_githubpage')}</a>
			                                	</PackageContainer>
			                                </AccordionBody>
			                            </Accordion.Collapse>
			                        </Card>

                                	<Card>
			                            <Accordion.Toggle as={AccordionSubHeader} eventKey="0">
			                                {t('AboutProject.accordion3_subtitle2')}
			                            </Accordion.Toggle>

			                            <Accordion.Collapse eventKey="0">
			                                <AccordionBody>
											    <PackageContainer>
			                                		<PackageTitle>Express</PackageTitle>
			                                		<a href="https://www.npmjs.com/package/express" target="_blank" rel="noreferrer">{t('AboutProject.accordion3_npmjspage')}</a> - <a href="https://expressjs.com/pt-br/starter/hello-world.html" target="_blank" rel="noreferrer">{t('AboutProject.accordion3_documentation')}</a>
			                                	</PackageContainer>
			                                	
			                                	<PackageContainer>
			                                		<PackageTitle>Mongoose</PackageTitle>
			                                		<a href="https://www.npmjs.com/package/mongoose" target="_blank" rel="noreferrer">{t('AboutProject.accordion3_npmjspage')}</a> - <a href="https://mongoosejs.com/docs/index.html" target="_blank" rel="noreferrer">{t('AboutProject.accordion3_documentation')}</a>
			                                	</PackageContainer>
			                                	
			                                	<PackageContainer>
			                                		<PackageTitle>Cors</PackageTitle>
			                                		<a href="https://www.npmjs.com/package/cors" target="_blank" rel="noreferrer">{t('AboutProject.accordion3_npmjspage')}</a> - <a href="http://expressjs.com/en/resources/middleware/cors.html" target="_blank" rel="noreferrer">{t('AboutProject.accordion3_documentation')}</a>
			                                	</PackageContainer>
			                                	
			                                	<PackageContainer>
			                                		<PackageTitle>JsonWebToken</PackageTitle>
			                                		<a href="https://www.npmjs.com/package/jsonwebtoken" target="_blank" rel="noreferrer">{t('AboutProject.accordion3_npmjspage')}</a> - <a href="https://github.com/auth0/node-jsonwebtoken" target="_blank" rel="noreferrer">{t('AboutProject.accordion3_githubpage')}</a>
			                                	</PackageContainer>
			                                	
			                                	<PackageContainer>
			                                		<PackageTitle>Nodemailer</PackageTitle>
			                                		<a href="https://www.npmjs.com/package/nodemailer" target="_blank" rel="noreferrer">{t('AboutProject.accordion3_npmjspage')}</a> - <a href="https://nodemailer.com/" target="_blank" rel="noreferrer">{t('AboutProject.accordion3_officialpage')}</a>
			                                	</PackageContainer>
			                                	
			                                	<PackageContainer>
			                                		<PackageTitle>Nodemailer Express Handlebars</PackageTitle>
			                                		<a href="https://www.npmjs.com/package/nodemailer-express-handlebars" target="_blank" rel="noreferrer">{t('AboutProject.accordion3_npmjspage')}</a> - <a href="https://github.com/yads/nodemailer-express-handlebars" target="_blank" rel="noreferrer">{t('AboutProject.accordion3_githubpage')}</a>
			                                	</PackageContainer>
			                                	
			                                	<PackageContainer>
			                                		<PackageTitle>Bcryptjs</PackageTitle>
			                                		<a href="https://www.npmjs.com/package/bcryptjs" target="_blank" rel="noreferrer">{t('AboutProject.accordion3_npmjspage')}</a> - <a href="https://github.com/dcodeIO/bcrypt.js" target="_blank" rel="noreferrer">{t('AboutProject.accordion3_githubpage')}</a>
			                                	</PackageContainer>
			                                	
			                                	<PackageContainer>
			                                		<PackageTitle>i18next</PackageTitle>
			                                		<a href="https://www.npmjs.com/package/i18next" target="_blank" rel="noreferrer">{t('AboutProject.accordion3_npmjspage')}</a> - <a href="https://www.i18next.com/" target="_blank" rel="noreferrer">{t('AboutProject.accordion3_documentation')}</a>
			                                	</PackageContainer>
			                                </AccordionBody>
			                            </Accordion.Collapse>
			                        </Card>
                                </Accordion>
                            </Accordion.Collapse>
						</Card>
                    </Accordion>
				</CenterContent>
				<Footer i18nT={t}/>
			</Page>
		)
	}
}

export default withTranslation()(AboutProject);