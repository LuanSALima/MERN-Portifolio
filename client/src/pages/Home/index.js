import React, { Component } from 'react';

import Navbar from "../../components/navbar.component";

import { Page, CenterContent, Title } from '../../styles/default';

export default class Home extends Component {

	render() {
		return (
			<Page>
			    <Navbar />
				<CenterContent>
					<Title>Página Home</Title>
				</CenterContent>
			</Page>
		)
	}
}