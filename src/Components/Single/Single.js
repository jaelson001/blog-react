import './style.css';
import React from 'react';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';

export default class Single extends React.Component {
	constructor(){
		super();
	}
	render(){
		return (
			<div className="session">
				<h3>{this.props.title}</h3>
				<p className="except">
					<i>{ this.props.except? this.props.except.slice(0,100) + '...' : ""}<br />
						{this.props.except
							? <Link className="link" to={"/post/"+this.props.id} >Ler mais</Link>
							: null
						}
					</i>
				</p>
				<p>{this.props.content || ""}</p>
				{ this.props.content? <Link className="link" to="/">Voltar</Link> : "" }
				
			</div>
		);
	}
}