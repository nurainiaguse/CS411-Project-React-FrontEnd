import React, {Component} from 'react';
import axios from 'axios'
import {Grid, Form, Button, Container} from 'semantic-ui-react'


function Item(props){ 
	const noPokemon = Object.entries(props.item).length === 0;
     if (noPokemon){
     	return(
     		<div>
     		
     		</div>
     	)
     }
     else if(props.item == 'No results'){
     	return (
			<div>
				<h3>We couldn't find a restaurant with that name!</h3>
			</div>

		)
     }
    else{
		return (
			<div>
				<h3>We found: {props.item["DBA Name"]}</h3>

			</div>

		)
	}
}

function Suggestions(props){
  const options = props.results.map(r => (
    <li key={r.id}>
      {r.name}
    </li>
  ))
  return (<ul>{options}</ul>)
}

class Search extends Component {
	constructor(){
		super();

		this.state = {
			query: '',
			item: {},
			results: [],
		};

		this.baseUrl = 'http://localhost:5000/api/restaurant/';
		this.inputChangeHandler = this.inputChangeHandler.bind(this);
		this.onClickHandler = this.onClickHandler.bind(this);
	}

	inputChangeHandler(event) {
		this.setState({ query: event.target.value}, 
			() => {
				if (this.state.query.length %3 == 0 && this.state.query.length > 2){
					this.getInfo(this.state.query)
				}
				else if (this.state.query.length == 0){
					this.setState({
							results: []
						}, ()=>{console.log("query is empty, change results", this.state.results)})
				}
			}
		)
	}

	getInfo(q) {
			let url = `${this.baseUrl}${q}`;

			axios.get(url).then((response) => {
				this.setState({
					results: response.data
				}, console.log("in getinfo",q,response.data));
				
			}).catch((error) => {
				console.log(error);
			});
	}


	onClickHandler() {
		let url = `${this.baseUrl}${this.state.query}`;
		axios.get(url).then((response) => {
			this.setState({
				item: response.data
				
			});
			console.log(response.data);
		}).catch((error) => {
			console.log(error);
		});
	}

	render(){
		return(
			<div className='search'>
    <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
      <h1 className='title'>Search for your favorite restaurant!</h1>
		<Form onSubmit={this.onClickHandler}>      
			<Form.Input placeholder="Restaurant name..." value={this.state.query} onChange={this.inputChangeHandler} />
			<Form.Button content='Search'/>   
		</Form>	      
		<Item item={this.state.item}/>
		<Suggestions results={this.state.results} />
      </Grid.Column>
      </Grid>
      </div>

		)
	}

}



export default Search