import React, { Component } from 'react';

import { withRouter, Link } from "react-router-dom";

import Navbar from "../../components/Navbar";

import api from "../../services/api";

import { Table } from "react-bootstrap";

import { Page, CenterContent, Title, ErrorMessage, ProgressBar } from '../../styles/default';

class Dashboard extends Component {

	constructor(props) {
		super(props);

		/*Fazendo a bind para que o 'this' usado nas funções façam referencia a classe*/
		this.handleUserList = this.handleUserList.bind(this);
		this.mountTable = this.mountTable.bind(this);

		this.state = {
			error: "",
			dataType: "",
			tableColumns: [],
			tableData: [],
			loading: false
		}
	}

	handleUserList = async => {

		this.setState({loading: true});

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
                	this.setState({dataType: 'users'});
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
		
		this.setState({loading: false});
	}

	mountTable() {
		return (
			<Table striped bordered hover responsive>
				<thead>
					<tr>
						{this.state.tableColumns.map((column, index) => {
							return <th key={index}>{column}</th>;
						})}
					</tr>
				</thead>
				<tbody>
					{this.state.tableData.map((data, index) => {

						const removeItem = async e => {
							e.preventDefault();

							api.delete("api/" + this.state.dataType + "/" + data['_id'])
								.then(response => {
									if (response.data.success) {
										let array = this.state.tableData; //Array com todos os itens da tabela

										//Procurando o índice que possui o item que foi excluido para remover da váriavel 'array'
										for(let contentIndex=0 ; contentIndex < array.length ; contentIndex++) {
											if (array[contentIndex]._id === data['_id']) {
											  array.splice(contentIndex, 1);

											  this.setState({tableData: []}); //Utilizo isto para limpar o state e depois popular o state com a array atualizada
											  this.setState({tableData: array}); //Alterando o State para a matriz que agora não possui o item que foi excluído
											  break;
											}
										}
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

						return (
							<tr key={index}>
								{this.state.tableColumns.map((column, index) => {
									return <td key={index}>{data[column]}</td>
								})}
								<td>
									<Link to={this.state.dataType + "/editar/" + data['_id']} style={{ color: "green" }}>
						            	Editar
						            </Link>
								</td>
								<td>
									<a href="#remover" onClick={removeItem} style={{ color: "red" }}>
						            	Remover
						            </a>
								</td>
							</tr>
						);
					})}
				</tbody>
			</Table>
		)
	}

	render() {
		return (
			<Page>
			    <Navbar />
				<CenterContent>
					<Title>Dashboard</Title>

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

							{(this.state.loading === true) && 
		                        <ProgressBar />
		                    }

							{this.state.error.length > 0 && 
								<ErrorMessage>{this.state.error}</ErrorMessage>
							}

							{(this.state.tableColumns && this.state.tableData) && 
								this.mountTable()
							}
						</div>
					</div>
				</CenterContent>
			</Page>
		);
	}
}

export default withRouter(Dashboard);