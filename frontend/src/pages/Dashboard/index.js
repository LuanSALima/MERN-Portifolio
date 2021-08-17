import React, { Component } from 'react';

import { withRouter, Link } from "react-router-dom";

import Navbar from "../../components/Navbar";

import Footer from '../../components/Footer';

import api from "../../services/api";

import { Table } from "react-bootstrap";

import { Page, Content, Title, ErrorMessage, ProgressBar } from '../../styles/default';

import { withTranslation } from 'react-i18next';

import { Container, Menu, MenuItem, MenuCollapse, MenuToggle, TableContainer } from './style';

class Dashboard extends Component {

	constructor(props) {
		super(props);

		/*Fazendo a bind para que o 'this' usado nas funções façam referencia a classe*/
		this.handleUserList = this.handleUserList.bind(this);
		this.mountTable = this.mountTable.bind(this);
		this.showSideBar = this.showSideBar.bind(this);

		this.state = {
			error: "",
			dataType: "",
			tableColumns: [],
			tableData: [],
			loading: false,
			showSideBar: false
		}
	}

	componentDidMount(){
		const { t } = this.props;
		document.title = 'MERN - ' + t('Dashboard.title');
	}

	handleUserList = async => {

		const { t } = this.props;

		this.setState({loading: true, showSideBar: false});

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
                    this.setState({error: t('Error.unexpected')});
                }
            });
		
		this.setState({loading: false});
	}

	mountTable() {
		const { t } = this.props;

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

							api.delete("api/" + this.state.dataType + "/" + data['id'])
								.then(response => {
									if (response.data.success) {
										let array = this.state.tableData; //Array com todos os itens da tabela

										//Procurando o índice que possui o item que foi excluido para remover da váriavel 'array'
										for(let contentIndex=0 ; contentIndex < array.length ; contentIndex++) {
											if (array[contentIndex].id === data['id']) {
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
					                    this.setState({error: t('Error.unexpected')});
					                }
								});
						}

						return (
							<tr key={index}>
								{this.state.tableColumns.map((column, index) => {
									return <td key={index}>{data[column]}</td>
								})}
								<td>
									<Link to={this.state.dataType + "/editar/" + data['id']} style={{ color: "green" }}>
						            	{t('Dashboard.tableedit')}
						            </Link>
								</td>
								<td>
									<a href="#remover" onClick={removeItem} style={{ color: "red" }}>
						            	{t('Dashboard.tableremove')}
						            </a>
								</td>
							</tr>
						);
					})}
				</tbody>
			</Table>
		)
	}

	showSideBar() {
		this.setState({showSideBar: !this.state.showSideBar});
	}

	render() {
		const { t } = this.props;

		return (
			<Page>
			    <Navbar />
				<Content>
					<Container>
						<Menu show={this.state.showSideBar}>
							<MenuToggle onClick={this.showSideBar}>
								<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" viewBox="0 0 16 16">
								  <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
								</svg>
							</MenuToggle>
							<MenuCollapse show={this.state.showSideBar}>
								<h5 className="sidebar-heading justify-content-center align-items-center">{t('Dashboard.menu_title')}</h5>
								<ul className="nav flex-column justify-content-center align-items-center">
									<li className="nav-item">
										<MenuItem onClick={this.handleUserList}>{t('Dashboard.menu_item1')}</MenuItem>
									</li>
								</ul>
							</MenuCollapse>
						</Menu>
						<TableContainer>
							<Title>{t('Dashboard.title')}</Title>
							{(this.state.loading === true) && 
		                        <ProgressBar />
		                    }

							{this.state.error.length > 0 && 
								<ErrorMessage>{this.state.error}</ErrorMessage>
							}

							{(this.state.tableColumns && this.state.tableData) && 
								this.mountTable()
							}
						</TableContainer>
					</Container>
				</Content>
				<Footer />
			</Page>
		);
	}
}

export default withTranslation()(withRouter(Dashboard));