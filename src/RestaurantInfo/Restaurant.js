import React, {Component} from 'react';
import {
Container,
Segment,
Header,
Form,
Button,
TextArea,
Dimmer,
Loader
} from 'semantic-ui-react'
import axios from 'axios'

import UserComments from './UserComments/UserComments.js'

class Restaurant extends Component {
	constructor(props){
		super(props)
		this.state = {
			username:'',
			usercomment: '',
			userrating: '3',
			comments: [],
			inspections: [],
			isLoading: false
		}
	}
	componentWillMount() {
    	this.getComments();
  	}

	handleFormChange = (e, {name, value}) => this.setState({[name]: value})

	handleCommentSubmit = () => {
		let url = 'http://dwzhong2.web.illinois.edu/api/insert';
		console.log(this.state.username, this.state.usercomment, this.state.license);
		axios.post(url, {comment: this.state.usercomment, 
			rating: this.state.userrating,
			userid: this.state.username,
			dbaname: 'placeholder',
			license: this.props.license}).then((response) => {
			console.log(response.data);
			this.getComments();
			this.setState({
				username: '',
				usercomment:''
			});
		}).catch((error) => {
			console.log(error);
		})
	}

	getComments = () => {
		this.setState({isLoading: true});
		setTimeout(() => {
			let url = 'http://dwzhong2.web.illinois.edu/api/feedback/' + this.props.license;
			axios.get(url).then((response) => {
	        console.log("comments", response.data)
	        this.setState({
	          comments: response.data,
	          isLoading: false
	        });
	        
	      }).catch((error) => {
	        console.log(error);
	      });
		}, 300)
		
	}

	render (){
		const { username, usercomment } = this.state
		return(
			<Container>
				<Segment basic>
					{this.state.isLoading ? 
					<Dimmer active inverted>
				       <Loader inverted>Loading</Loader>
				     </Dimmer> : null
					}
				<UserComments comments={this.state.comments} />
				</Segment>
				<Form onSubmit={this.handleCommentSubmit}>
		          <Form.Group>
		          <Form.Input value={username} name="username" type="text" onChange={this.handleFormChange} placeholder='First Name' width={10}/>
		          </Form.Group>
		          <Form.Field control={TextArea} value={usercomment} name="usercomment" type="text" onChange={this.handleFormChange} placeholder='Comment'/>

		          <Button content='Add Comment' primary type='submit'/>
		        </Form>
			</Container>
		)

	}

}

export default Restaurant;