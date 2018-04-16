import React from 'react';
import PropTypes from 'prop-types';
import {
	Form,
	FormGroup,
	FormControl,
	Button
} from 'react-bootstrap';

const InputForm = props => (
	<Form onSubmit={props.onInputSubmit}>
		<FormGroup controlId="inputFormTextarea">
			<FormControl 
				componentClass="textarea" 
				rows="3" 
				value={props.userInput} 
				placeholder="Type or paste your input here..."
				onChange={props.onInputChange} />
		</FormGroup>
		<Button bsStyle="primary" type="submit">
			Submit
		</Button>		
	</Form>
);

InputForm.propTypes = {
	userInput: PropTypes.string,
	onInputChange: PropTypes.func.isRequired,
	onInputSubmit: PropTypes.func.isRequired
};

export default InputForm;