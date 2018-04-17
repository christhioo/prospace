import React, { Component } from 'react';
import { Grid, Jumbotron } from 'react-bootstrap';

import Intro from './components/Intro';
import InputForm from './components/InputForm';
import Results from './components/Results';

class App extends Component {
	state = {
		result: ''
	};

	onGetResult = (userInput) => {
		this.setState({ result: userInput });
	};
  
	render() {
		return (
		  <div>
			<Jumbotron>
			  <Grid>
				<Intro />
				<InputForm 
					onGetResult={this.onGetResult}
				/>
			  </Grid>
			</Jumbotron>
			<Results output={this.state.result} />
		  </div>
		);
	}
}

export default App;