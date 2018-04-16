//call packages
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const parser = require('./parser');

// configure app to use bodyParser()
// this will get the data from POST
app.use(bodyParser.json()); // to support JSON-encoded bodies

//set port
const port = process.env.PORT || 5000;
	
app.post('/api/submitInput', (req, res) => {
	if (!req.body.userInput) {
		res.json({output: 'Input is empty'});
	}
	
	const finalResult = parseInput(req.body.userInput.toLowerCase());
	
	res.json({ output: finalResult});
});

//start the server
app.listen(port, () => console.log(`Listening on port ${port}`));