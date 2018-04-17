import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
	Form,
	FormGroup,
	FormControl,
	Button
} from 'react-bootstrap';

export default class InputForm extends Component {
	
	static propTypes: {
		onGetResult: PropTypes.func.isRequired,
	};
  
	state = {
		userInput: ''
	};
	
	//call API to post user input
	callAPI = async (content) => {
		const response = await fetch('/api/submitInput', {
			method: 'POST',
			body: JSON.stringify(content),
			headers: {'Content-Type': 'application/json'}
		});
		
		const body = await response.json();
		return body;	  
	};
	
	//on user input form submission
	onInputSubmit = e => {
		e.preventDefault();
		
		if (this.state.userInput) {
			//if the input doesn't contain keyword of 'how much is' and 'how many credits is', 
			//then prompt error message
			if (this.state.userInput.toLowerCase().indexOf('how much is') === -1 && this.state.userInput.toLowerCase().indexOf('how many credits is') === -1){
				this.props.onGetResult('Question is not found in the input');
			} else {
				this.callAPI({
					userInput: this.state.userInput
				}).then(res => this.props.onGetResult(res.output))
				  .catch(err => console.log(err));
			}
		} else {
			this.props.onGetResult('Type or paste your input before clicking Submit button');
		}
		
	};
	
	//on user input change
	onInputChange = e =>
		this.setState({ userInput: e.target.value });
		
	render() {
		return (
			<Form onSubmit={this.onInputSubmit}>
				<FormGroup>
					<FormControl 
						componentClass="textarea" 
						rows="3" 
						value={this.state.userInput} 
						placeholder="Type or paste your input here..."
						onChange={this.onInputChange} />
				</FormGroup>
				<Button bsStyle="primary" type="submit">
					Submit
				</Button>		
			</Form>
		);
	}
}