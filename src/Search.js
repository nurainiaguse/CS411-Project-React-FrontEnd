import React, {Component} from 'react';
import axios from 'axios'


function Item(props){ 
	const noPokemon = Object.entries(props.item).length === 0;
     if (noPokemon){
     	return(
     		<div>
     		
     		</div>
     	)
     }
    else{
		return (
			<div>
				<h3>Name: {props.item.name}</h3>
				<h3>Rating: {props.item.id}</h3>
			</div>

		)
	}
}

class Search extends Component {
	constructor(){
		super();

		this.state = {
			query: '',
			item: {},
		};

		this.baseUrl = 'https://pokeapi.co/api/v2/pokemon/';
		this.inputChangeHandler = this.inputChangeHandler.bind(this);
		this.onClickHandler = this.onClickHandler.bind(this);
	}

	inputChangeHandler(event) {
		this.setState({ query: event.target.value })
	}

	onClickHandler() {
		let url = `${this.baseUrl}${this.state.query}`;

		axios.get(url).then((response) => {
			this.setState({
				item: response.data
			});

		}).catch((error) => {
			console.log(error);
		});
	}

	render(){
		return(
			<div className='page'>
				<h1 className='title'>Search for your favorite restaurant!</h1>
				<form>
			       <input
			         placeholder="Restaurant name..."
			         onChange={this.inputChangeHandler}
			         value={this.state.query}
			       />
			      
			     </form>
			     <button onClick={this.onClickHandler}>Search</button>
			     <Item item={this.state.item}/>
			</div>


		)
	}

}

export default Search