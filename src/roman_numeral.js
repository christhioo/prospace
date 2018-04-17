const number = [-1, 1000, 900, -1, 500,
				400, -1, 100, 90, -1, 
				50,	40, -1, 10, 9, 
				-1,	5, 4, -1, 1];
const roman = ['MMMM', 'M', 'CM', 'DD', 'D',
			   'CD', 'CCCC', 'C', 'XC', 'LL',
			   'L', 'XL', 'XXXX', 'X', 'IX', 
			   'VV', 'V', 'IV', 'IIII', 'I'];

getNumberFromRoman = symbol => {
	let result = 0;
	
	//loop array in descending order
	for (let i = 0; i < number.length; i++) {
	//	console.log(symbol + '_' + roman[i] + '_' + number[i]);
		while (symbol.indexOf(roman[i]) === 0) {
			//if number value is -1, it's invalid
			if(number[i] === -1) {
				result = -1;
				break;
			}
			result += number[i];
			prevNumber = number[i];
			//replace with empty string after adding up the value
			symbol = symbol.replace(roman[i], '');
		};
		if (result === -1) { break; }
		
		//if there is still remaining value in symbol string, then it's invalid
		//since the logic will traverse from higher to lower value
		//for instance: IXV is not valid
		if (symbol !== '' && i === number.length - 1) { result = -1 }
	};
	
	return result;
};

module.exports.get = getNumberFromRoman;