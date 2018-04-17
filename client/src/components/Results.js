import React from 'react';
import PropTypes from 'prop-types';

import {
	Grid,
} from 'react-bootstrap';

const Results = props => {
	if (props.output){
		return (
			<Grid>
				<h2>Results</h2>
				<p className="result">{props.output}</p>
			</Grid>
		);
	}
	return(
		<span></span>
	);
};

Results.propTypes = {
	output: PropTypes.string.isRequired,
};

export default Results;