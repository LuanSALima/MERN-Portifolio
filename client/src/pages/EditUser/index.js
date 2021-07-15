import React, { Component } from 'react';

import api from "../../services/api";

import { withRouter } from "react-router-dom";

import Navbar from "../../components/navbar.component";

class EditUser extends Component {

	constructor(props) {
		super(props);

		/*Fazendo a bind para que o 'this' usado nas funções façam referencia a classe*/
		this.onChangeUsername = this.onChangeUsername.bind(this);
		this.onChangeEmail = this.onChangeEmail.bind(this);
		this.handleEditUser = this.handleEditUser.bind(this);

		this.state = {
			id: props.match.params.id,
			username: "",
			email: "",
			error: "",
			errorUsername: "",
		    errorEmail: "",
		}
	}

	onChangeUsername(e) {
		this.setState({
			username: e.target.value
		})
	}

	onChangeEmail(e) {
		this.setState({
			email: e.target.value
		})
	}

	componentDidMount() {

		api.get("/api/users/"+this.state.id)
			.then(response => {
				if(response.data.success) {
					this.setState({
						username: response.data.user.username,
						email: response.data.user.email
					})
				} else {
                    this.setState({error: response.data.message});
                }
			})
			.catch(error => {
                if(error.response.data) {
                     if(error.response.data.message) {
                        this.setState({error: error.response.data.message});
                    }
                    if (error.response.data.errors) {
                        if(error.response.data.errors.username) {
                            this.setState({errorUsername: error.response.data.errors.username});
                        }
                        if(error.response.data.errors.email) {
                            this.setState({errorEmail: error.response.data.errors.email});
                        }
                    }
                }
                else{
                    this.setState({error: "Houve uma resposta inesperada do servidor"});
                }
            });

	}

	handleEditUser = async e => {

		e.preventDefault();

		api.post("/api/users/update/"+this.state.id, {username: this.state.username, email: this.state.email})
            .then(response => {
                if(response.data.success) {
                    this.props.history.push("/dashboard");
                } else {
                    this.setState({error: response.data.message});
                }
            })
            .catch(error => {
                if(error.response.data) {
                     if(error.response.data.message) {
                        this.setState({error: error.response.data.message});
                    }
                    if (error.response.data.errors) {
                        if(error.response.data.errors.username) {
                            this.setState({errorUsername: error.response.data.errors.username});
                        }
                        if(error.response.data.errors.email) {
                            this.setState({errorEmail: error.response.data.errors.email});
                        }
                    }
                }
                else{ 
                    this.setState({error: "Houve uma resposta inesperada do servidor"});
                }
            });
	}

	render() {
		return (
			<div>
			    <Navbar />
				<div className="container">
					<h3>Editar Usuário</h3>
					<h5 className="text-danger">{this.state.error}</h5>
					<form onSubmit={this.handleEditUser}>
						<div className="form-group">
	                        <label>Nome: </label>
	                        <input  type="text"
	                                required
	                                className="form-control"
	                                value={this.state.username}
	                                onChange={this.onChangeUsername}
	                                />
	                        <span className="text-danger">{this.state.errorUsername}</span>
	                    </div>
						<div className="form-group">
							<label>Email: </label>
							<input	type="email"
									required
									className="form-control"
									value={this.state.email}
									onChange={this.onChangeEmail}
									/>
							<span className="text-danger">{this.state.errorEmail}</span>
						</div>
						<div className="form-group">
							<input type="submit" value="Editar" className="btn btn-primary" />
						</div>
					</form>
				</div>
			</div>
		);
	}
}

export default withRouter(EditUser);