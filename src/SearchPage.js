import React, {Component} from 'react';
import Search from './Search.js';
import {Container} from 'semantic-ui-react'
import SearchSuggest from './Autosuggest.js';
import RiskGraph from './RiskGraph.js'

class SearchPage extends Component{
	constructor(props){
		super(props);

		this.state = {
			graphvisible: false,
			item: [],
		}
		// this.inputChangeHandler = this.inputChangeHandler.bind(this);
		this.onSearchHandler = this.onSearchHandler.bind(this);
	}

	onSearchHandler(item){
		console.log("item passed to search handler", item)
		this.setState({
			graphvisible: true,
			item: item
		})
	}

	render(){
		return (<Container>
	<SearchSuggest onSearchHandler={(item) => this.onSearchHandler(item)}/>
	<RiskGraph visible={this.state.graphvisible} data={[{
        "name": "Ruby",
        "year": "2012",
        "count": "18117"
    }]}/>
	</Container>)
	}
	
	
}

export default SearchPage