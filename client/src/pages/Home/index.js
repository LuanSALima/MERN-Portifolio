import React, { Component } from 'react';

import Navbar from "../../components/navbar.component";

export default class Home extends Component {

	render() {
		return (
			<div>
			    <Navbar />
				<div className="container">
					<h3>Página Home</h3>
				</div>
			</div>
		)
	}
}