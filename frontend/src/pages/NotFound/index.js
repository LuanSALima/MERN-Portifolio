import React, { Component } from 'react';

import { withRouter } from "react-router-dom";

import Header from "../../components/Header";

import Footer from '../../components/Footer';

import { Page, CenterContent, Title } from '../../styles/default';

import { withTranslation } from 'react-i18next';

class NotFound extends Component {

	componentDidMount(){
		const { t } = this.props;
		document.title = 'MERN - ' + t('NotFound.title');
	}

	render() {
		const { t } = this.props;

		return (
			<Page>
			    <Header />
				<CenterContent>
					<Title>{t('NotFound.title')}</Title>
				</CenterContent>
				<Footer i18nT={t}/>
			</Page>
		);
	}
}

export default withTranslation()(withRouter(NotFound));