import React, { Component } from 'react';

import { withRouter } from "react-router-dom";

import Navbar from "../../components/navbar.component";

class Dashboard extends Component {

	render() {
		return (
			<div>
			    <Navbar />
				<div className="container-fluid">
					<div className="row mt-3">
						<div className="sidebar-sticky p-4">
							<h5 className="sidebar-heading justify-content-center align-items-center">Menu</h5>
							<ul className="nav flex-column justify-content-center align-items-center">
								<li className="nav-item">
									<span>Listar Usuários</span>
								</li>
							</ul>
						</div>
						<div className="container">
							<h1>Dashboard</h1>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(Dashboard);