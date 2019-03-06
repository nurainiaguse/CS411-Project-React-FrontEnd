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

class Search extends Component {
	constructor(){
		super();

		this.state = {
			query: '',
			item: {},
		};

		this.baseUrl = 'http://localhost:5000/api/restaurant/';
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
			console.log(response.data);
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