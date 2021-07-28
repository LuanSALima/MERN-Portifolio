import React, { Component } from 'react';

import Navbar from "../../components/Navbar";

import { Page, CenterContent, Title } from '../../styles/default';

import { withTranslation } from 'react-i18next';

class Home extends Component {

	render() {
		const { t } = this.props;

		return (
			<Page>
			    <Navbar />
				<CenterContent>
					<Title>{t('Home.title')}</Title>
				</CenterContent>
			</Page>
		)
	}
}

export default withTranslation()(Home);