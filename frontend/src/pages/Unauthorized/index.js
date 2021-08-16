import React, { Component } from 'react';

import { withRouter } from "react-router-dom";

import Navbar from "../../components/Navbar";

import { Page, CenterContent, Title } from '../../styles/default';

import { withTranslation } from 'react-i18next';

class Unauthorized extends Component {

	render() {
		const { t } = this.props;

		return (
			<Page>
			    <Navbar />
				<CenterContent>
					<Title>{t('Unauthorized.title')}</Title>
				</CenterContent>
			</Page>
		);
	}
}

export default withTranslation()(withRouter(Unauthorized));