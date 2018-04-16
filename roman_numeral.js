const conversionLookup = new Map([
	['M', 1000], ['CM', 900],
	['D', 500], ['CD', 400],
	['C', 100], ['XC', 90],
	['L', 50], ['XL', 40],
	['X', 10], ['IX', 9],
	['V', 5], ['IV', 4],
	['I', 1]
]);

getNumberFromRoman = symbol => {
	let result = 0;
	
	//loop conversionlookup in descending order
	for (let [roman, number] of conversionLookup) {
		while (symbol.indexOf(roman) === 0) {
			result += number;
			//replace with empty string after adding up the value
			symbol = symbol.replace(roman, '');
		};
	};
	
	return result;
};

module.exports.get = getNumberFromRoman;