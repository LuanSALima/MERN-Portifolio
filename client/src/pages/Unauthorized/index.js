import React, { Component } from 'react';

import { withRouter } from "react-router-dom";

import Navbar from "../../components/Navbar";

import { Page, CenterContent, Title } from '../../styles/default';

class Unauthorized extends Component {

	render() {
		return (
			<Page>
			    <Navbar />
				<CenterContent>
					<Title>Você não tem permissão para acessar</Title>
				</CenterContent>
			</Page>
		);
	}
}

export default withRouter(Unauthorized);