import React, { Component } from 'react';

import { withRouter } from "react-router-dom";

import Navbar from "../../components/navbar.component";

class Unauthorized extends Component {

	render() {
		return (
			<div>
			    <Navbar />
				<div className="container">
					<h1>Você não tem permissão para acessar</h1>
				</div>
			</div>
		);
	}
}

export default withRouter(Unauthorized);