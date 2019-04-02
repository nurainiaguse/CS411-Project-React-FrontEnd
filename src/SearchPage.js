import React, {Component} from 'react';
import Search from './Search.js';
import {
Container,
Segment,
Header,
Menu,
} from 'semantic-ui-react'
import SearchSuggest from './Autosuggest.js';
import Restaurant from './RestaurantInfo/Restaurant.js'
import { Link } from 'react-router-dom'

import {search as SPCss, searchsegment, searchheader as SPHeader} from './searchpage.module.scss'

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
			visible: false,
			item: [],
			error: false,
			license:0
		}
		this.onSearchHandler = this.onSearchHandler.bind(this);
	}

	onSearchHandler(item, license){
		console.log("onsearchhandler item", item, license)
		if (item.length === 0){
			this.setState({
				error:true
			})
		}
		else{
			this.setState({
				visible: true,
				item: item,
				error:false,
				license: license
			})
		}
	}
 
	render(){
		return (
			<div className={SPCss}>
				<Segment vertical className={searchsegment}>
					<h1 className={SPHeader}>Search for your favorite restaurant!</h1>
					<SearchSuggest  onSearchHandler={(item, license) => this.onSearchHandler(item, license)}/>
					<Message error={this.state.error}/>
				</Segment>
				<div>
				{ this.state.visible ? <Restaurant name="test" license={this.state.license}/> : null }
	    		
	    	</div>

			</div>
	)
	}
	
	
}

export default SearchPage