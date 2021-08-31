import React, { Component } from 'react';

import Navbar from "../../components/Navbar";

import Footer from '../../components/Footer';

import { Card } from 'react-bootstrap';

import { Page, CenterContent, Title, SucessMessage, /*ErrorMessage*/ } from '../../styles/default';

import { withTranslation } from 'react-i18next';

import { ReactComponent as OkCheckMark } from '../../assets/okcheckmark.svg';
//import { ReactComponent as FalseCheckMark } from '../../assets/falsecheckmark.svg';

class PlansProject extends Component {

	componentDidMount(){
		const { t } = this.props;
		document.title = 'MERN - ' + t('PlansProject.title');
	}

	render() {
		const { t } = this.props;

		return (
			<Page>
			    <Navbar />
				<CenterContent>
					<Title>{t('PlansProject.title')}</Title>
					
					<Card>
						<Card.Body>
							<SucessMessage>
								<OkCheckMark /> {t('PlansProject.plan1')}
							</SucessMessage>
							<br />
							<SucessMessage>
								<OkCheckMark /> {t('PlansProject.plan2')}
							</SucessMessage>
							<br />
							<SucessMessage>
								<OkCheckMark /> {t('PlansProject.plan3')}
							</SucessMessage>
							<br />
							<SucessMessage>
								<OkCheckMark /> {t('PlansProject.plan4')}
							</SucessMessage>
							<br />
							<SucessMessage>
								<OkCheckMark /> {t('PlansProject.plan5')}
							</SucessMessage>
							<br />
							<SucessMessage>
								<OkCheckMark /> {t('PlansProject.plan6')}
							</SucessMessage>
						</Card.Body>
					</Card>
				</CenterContent>
				<Footer i18nT={t}/>
			</Page>
		)
	}
}

export default withTranslation()(PlansProject);