import React, { Component } from 'react';

import { withRouter } from "react-router-dom";

import Navbar from "../../components/navbar.component";

class NotFound extends Component {

	render() {
		return (
			<div>
			    <Navbar />
				<div className="container">
					<h1>Página não encontrada :(</h1>
				</div>
			</div>
		);
	}
}

export default withRouter(NotFound);