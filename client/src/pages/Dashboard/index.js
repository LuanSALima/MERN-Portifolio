import React, { Component } from 'react';

import { withRouter } from "react-router-dom";

import Navbar from "../../components/navbar.component";

import api from "../../services/api";

import { Table } from "react-bootstrap";

class Dashboard extends Component {

	constructor(props) {
		super(props);

		/*Fazendo a bind para que o 'this' usado nas funções façam referencia a classe*/
		this.handleUserList = this.handleUserList.bind(this);
		this.mountTable = this.mountTable.bind(this);

		this.state = {
			error: "",
			tableColumns: [],
			tableData: []
		}
	}

	handleUserList = async => {

		api.get("/api/users/list")
            .then(response => {
                if (response.data.success) {
                	if(typeof(response.data.users) === 'object') {

                		let uniqueColumns = [];

                		//Each Item of the list
                		Object.keys(response.data.users).forEach((index) => {

                			//Each key of the object
                			Object.keys(response.data.users[index]).forEach((key) => {
                				if(uniqueColumns.indexOf(key) === -1) {
                					uniqueColumns.push(key);
                				}
                			});
                		});

                		this.setState({tableColumns: uniqueColumns});
                	}
                    this.setState({tableData: response.data.users});
                } else {
                    this.setState({error: response.data.message});
                }
            })
            .catch(error => {
            	if(error.response.data.message) {
                    this.setState({error: error.response.data.message});
                } else {
                    alert("Ocorreu um erro Inesperado :(");
                }
            });
		
	}

	mountTable() {
		return (
			<Table striped bordered hover>
				<thead>
					<tr>
						{this.state.tableColumns.map((column, index) => {
							return <th key={index}>{column}</th>;
						})}
					</tr>
				</thead>
				<tbody>
					{this.state.tableData.map((data, index) => {
						return (
							<tr key={index}>
								{this.state.tableColumns.map((column, index) => {
									return <td key={index}>{data[column]}</td>
								})}
							</tr>
						);
					})}
				</tbody>
			</Table>
		)
	}

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
									<span onClick={this.handleUserList}>Listar Usuários</span>
								</li>
							</ul>
						</div>
						<div className="container">
							<h1>Dashboard</h1>

							{this.state.error.length > 0 && 
								<span className="alert-danger text-center">{this.state.error}</span>
							}

							{(this.state.tableColumns && this.state.tableData) && 
								this.mountTable()
							}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(Dashboard);