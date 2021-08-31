import React, { Component } from 'react';

import { withRouter } from "react-router-dom";

import Navbar from "../../components/Navbar";

import Footer from '../../components/Footer';

import { Page, CenterContent, Title } from '../../styles/default';

import { withTranslation } from 'react-i18next';

class Unauthorized extends Component {

	componentDidMount(){
		const { t } = this.props;
		document.title = 'MERN - ' + t('Unauthorized.title');
	}

	render() {
		const { t } = this.props;

		return (
			<Page>
			    <Navbar />
				<CenterContent>
					<Title>{t('Unauthorized.title')}</Title>
				</CenterContent>
				<Footer i18nT={t}/>
			</Page>
		);
	}
}

export default withTranslation()(withRouter(Unauthorized));