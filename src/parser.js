//import roman numeral conversion
const roman = require('./roman_numeral');

//set not valid message
const notValidMsg = 'I have no idea what you are talking about\n';

parseInput = userInput => {
	let dirtMap = new Map();
	
	let metalMap = new Map();
	let metalCredit = 0;
	let dirtList = '';
	
	let tempArray = [];
	let question = '';
	
	let indexOfIs = 0;
	let indexOfCredits = 0;
	let indexOfHowMuch = 0;
	let indexOfHowMany = 0;
	let hasQuestionMark = false;
	
	let rows = userInput.split('\n');
	let output = '';
	
	//iterate user inputs
	rows.forEach((row) => {	
		indexOfIs = row.search(/\bis\b/); //get index of is
		indexOfCredits = row.search(/\bcredits\b/); //get index of credits
		indexOfHowMuch = row.search(/\bhow much\b/); //get index of how much
		indexOfHowMany = row.search(/\bhow many credits\b/); //get index of how many credits
		hasQuestionMark = row.slice(row.length-1) === '?'; //check has '?' at the end of row
		
		//handle question of 'how much' & 'how many Credits'	
		if (indexOfHowMuch === 0 || indexOfHowMany === 0){
			if (indexOfIs !== -1 && hasQuestionMark) {
				dirtList = '';
				question = '';
				
				//cuts off words from index 'is' till the last word
				tempArray = row.slice(indexOfIs).split(' ');
				
				tempArray.shift(); //delete 'is'
				tempArray.pop(); //delete '?'
				
				tempArray.forEach((word, index, array) => {
					if (dirtMap.get(word) && question != notValidMsg){ //append roman to dirtList
						dirtList += dirtMap.get(word);
						question += word + ' ';
					} else if(index === (array.length - 1) && indexOfHowMany === 0 && question != notValidMsg) {
						//last word is the metal name & 'how many'
						//check whether the metal name exists in the list
						if(metalMap.get(word)){
							//capitalise the first character of the metal name
							question += word.charAt(0).toUpperCase() + word.slice(1) + ' ';
						} else { question = notValidMsg; }
						
					} else { question = notValidMsg; }
				});
				
				//if the roman numeral is invalid, return invalid msg
				if (dirtList !== '' && getNumberFromRoman(dirtList) === -1){
					question = notValidMsg;
				}
				
				//it is not valid when there's no word in between 'is' and '?'
				//when the question is notvalid, also return not valid
				if (question === notValidMsg || tempArray.length === 0){
					output += notValidMsg;
				} else if (indexOfHowMuch === 0){ //this is to handle how much question
					output += question + 'is ' + getNumberFromRoman(dirtList) + '\n';
				} else { // this is to handle how many Credits question
					output += question + 'is ' + (getNumberFromRoman(dirtList)*metalMap.get(tempArray[tempArray.length-1])) + ' Credits\n';
				}
			} else {output += notValidMsg}
		}
		
		//initialise metal value
		else if (indexOfIs !== -1 && indexOfCredits !== -1){
			//assumption is in one row, there's only one metal
			//everything before 'is' is the dirt and one metal name
			dirtList = '';
			
			//cuts off words from index 0 until before 'is'
			tempArray = row.substring(0, indexOfIs - 1).split(' ');
			tempArray.forEach((word, index, array) => {
				if (dirtMap.get(word)){ //append roman to dirtList
					dirtList += dirtMap.get(word);
				} else if(index === array.length - 1) { //last word is the metal name
					//['is', '1234', ' ']
					metalCredit = row.substring(indexOfIs, indexOfCredits).split(' ')[1];
					
					if (getNumberFromRoman(dirtList) !== -1) {
						metalMap.set(word, metalCredit/getNumberFromRoman(dirtList));
					} else {
						output += dirtList + ' is not a valid Roman numerals\n'
					}
				} else {
					output += notValidMsg;
				}
			});
		}
		
		//initialise dirt value
		else if(indexOfIs !== -1){
			//assumption: dirt is initialised with only one word
			//e.g. prok is V
			//split row by whitespace
			tempArray = row.split(' ');
			
			//set dirt name and dirt value
			dirtMap.set(tempArray[0], tempArray[2].toUpperCase());
		}
	});
	
	console.log(dirtMap);
	console.log(metalMap);
	
	return output;
};

module.exports.get = parseInput;