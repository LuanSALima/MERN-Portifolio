import React, { Component } from 'react';

import Navbar from "../../components/Navbar";

import { Page, CenterContent, Title } from '../../styles/default';

import { withTranslation } from 'react-i18next';

import { Container, Content } from './style';

import { Link } from 'react-router-dom';

class Home extends Component {

	render() {
		const { t } = this.props;

		return (
			<Page>
			    <Navbar />
				<CenterContent>
					<Title>{t('Home.title')}</Title>

					<Container>
						<Content>
							<h1>{t('Home.create_account')}</h1>
							<p>
								{t('Home.create_account_text')}
							</p>
							<Link to="/registrar">{t('Home.create_account_link')}</Link>
						</Content>

						<Content>
							<h1>{t('Home.about_project')}</h1>
							<p>
								{t('Home.about_project_text')}
							</p>
							<Link to="/sobre-projeto">{t('Home.about_project_link')}</Link>
						</Content>

						<Content>
							<h1>{t('Home.plans_project')}</h1>
							<p>
								{t('Home.plans_project_text')}
							</p>
							<Link to="/planos-projeto">{t('Home.plans_project_link')}</Link>
						</Content>
					</Container>
				</CenterContent>
			</Page>
		)
	}
}

export default withTranslation()(Home);