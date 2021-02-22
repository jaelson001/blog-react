import './App.css';
import React from 'react';
import Single from "./Components/Single/Single.js";
import {BrowserRouter, Switch, Route} from 'react-router-dom';

export default class App extends React.Component{
	constructor() {
		super();
		this.state = {
			posts:""
		};
	}

	componentDidMount(){
		//carregando dados da api
		var api_url = "http://127.0.0.1:8000/api/posts";
		fetch(api_url)
		.then(result => result.json())
		.then((result) => {
			this.setState({posts: result});
		}).catch((error) =>{
			this.setState({posts: 'error'});
		});
	};

	renderPosts = () => {
		var singles =  this.state.posts;
		var array = Object.keys(singles).map(indice => singles[Number(indice)]);
		if(!singles){
			return(<div>Carregando...</div>);
		}
		if(singles == "error"){
			return(<div className="notFoundError">Erro ao conectar com a api</div>);
		}else{
			return array.map((single) => {
				return <Single key={single.id} title={single.title} except={single.content} id={single.id}  />
			});
		}
	};

	renderPost = (RouteProps) => {
		var id = RouteProps.match.params.id; // id passado na rota
		for(var i = 0; i< this.state.posts.length; i++){//encontra post com esse id
			if(this.state.posts[i].id == id ){
				return (<Single title={this.state.posts[i].title} content={this.state.posts[i].content} id={this.state.posts[i].id} />);//renderiza post
			}else{
				continue;
			}
		}
	}

	render(){
		return (
			<div className="App">
			  <header className="App-header">
			    <h1>Blog React</h1>
			    <BrowserRouter>
			    	<Route exact path="/">{this.renderPosts()}</Route>
		    		<Route exact path="/post/:id"  render={(props => this.renderPost(props))} />
			    </BrowserRouter>
			  </header>
			</div>
		);
	}
}

