import React, { Component } from 'react';
import { Grid, Jumbotron } from 'react-bootstrap';

import Intro from './components/Intro';
import InputForm from './components/InputForm';
import Results from './components/Results';

class App extends Component {
	state = {
		userInput: '',
		response: ''
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
	
	//on user input change
	onInputChange = e =>
		this.setState({ userInput: e.target.value });
	
	//on user input form submission
	onInputSubmit = e => {
		e.preventDefault();
		
		if (this.state.userInput) {
			this.callAPI({
				userInput: this.state.userInput
			}).then(res => this.setState({ response: res.output }))
			  .catch(err => console.log(err));
		} else {
			this.setState({ response: 'Type or paste your input before clicking Submit button' });
		}
		
	};

	render() {
		return (
		  <div>
			<Jumbotron>
			  <Grid>
				<Intro />
				<InputForm 
					userInput={this.state.userInput}
					onInputChange={this.onInputChange}
					onInputSubmit={this.onInputSubmit}
				/>
			  </Grid>
			</Jumbotron>
			<Results output={this.state.response} />
		  </div>
		);
	}
}

export default App;