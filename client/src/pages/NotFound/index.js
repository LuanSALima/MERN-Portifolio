import React, { Component } from 'react';

import { withRouter } from "react-router-dom";

import Navbar from "../../components/Navbar";

import { Page, CenterContent, Title } from '../../styles/default';

class NotFound extends Component {

	render() {
		return (
			<Page>
			    <Navbar />
				<CenterContent>
					<Title>Página não encontrada :(</Title>
				</CenterContent>
			</Page>
		);
	}
}

export default withRouter(NotFound);