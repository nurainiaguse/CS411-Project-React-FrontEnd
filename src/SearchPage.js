import React, {Component} from 'react';
import Search from './Search.js';
import {
Container,
Segment,
Header,
} from 'semantic-ui-react'
import SearchSuggest from './Autosuggest.js';
import RiskGraph from './RiskGraph.js'
import Zipcodevis from './Zipcodevis.js'

function Message(props){
	if (props.error){
		return (
			<h1>Please select from the list of results!</h1>
			)
	}
	return (
	<div></div>
	)
}

class SearchPage extends Component{
	constructor(props){
		super(props);

		this.state = {
			graphvisible: false,
			item: [],
			error: false
		}
		// this.inputChangeHandler = this.inputChangeHandler.bind(this);
		this.onSearchHandler = this.onSearchHandler.bind(this);
	}

	onSearchHandler(item){
		console.log("onsearchhandler item", item)
		if (item.length === 0){
			this.setState({
				error:true
			})
		}
		else{
			this.setState({
				graphvisible: true,
				item: item,
				error:false
			})
		}
	}

	render(){
		return (
			<Container>
				<Segment style={{padding: '8em 0em'}} vertical textAlign='center'>
					<Header as='h1'>Search for your favorite restaurant!</Header>
					<SearchSuggest onSearchHandler={(item) => this.onSearchHandler(item)}/>
				</Segment>
				<Message error={this.state.error}/>
	<RiskGraph visible={this.state.graphvisible} data={[{
        "name": "Ruby",
        "year": "2012",
        "count": "18117"
    }]}/>
    <Zipcodevis/>
	</Container>
	)
	}
	
	
}

export default SearchPage