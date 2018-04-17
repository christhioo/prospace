# GALAXY MERCHANT TRADING GUIDE
You decided to give up on earth after the latest financial collapse left 99.99% of the earth's
population with 0.01% of the wealth. Luckily, with the scant sum of money that is left in your
account, you are able to afford to rent a spaceship, leave earth, and fly all over the galaxy to sell
common metals and dirt (which apparently is worth a lot). Buying and selling over the galaxy
requires you to convert numbers and units, and you decided to write a program to help you.The
numbers used for intergalactic transactions follows similar convention to the roman numerals and
you have painstakingly collected the appropriate translation between them.

Installation
------------
Install nodemon globally
```
npm i nodemon -g
```
Install server dependencies
```
npm install
```
Go to /client directory and install client dependencies
```
cd client
npm install
```

Running the App
---------------
From the project root directory run the following:
```
npm run dev
```
This will launch React app and server simultaneously.

System Design
-------------
This application consists of:
* React.js as the frontend user interface
* Node.js as the backend server

Front-end communicates with backend server by calling REST API url provided in Node.js.
User input will be submitted through POST method in json format to the server.
Server will receive the input, process it, and then response back to the frontend side.

### Brief Summary of Parsing Algorithm ###
The algorithm for the parsing program is as follows.
1) Split the input by newline
2) For each sentence, find keyword of 'is', 'credits', 'how much', 'how many credits', and '?'
3) If keyword 'how much is' and 'how many credits is' and 'credits' are not found in the sentence, obtain dirt name and value.
4) If keyword 'how much is' and 'how many credits is' are not found in the sentence, find keyword 'credits', obtain common metal name and value.
5) If the sentence contains keyword 'how much is' or 'how many credits is', process all words after the keyword and before '?'.
6) Process question based on the name and value obtained in step (4) and (5).

Assumptions
-----------
* Input should be submitted as a whole text. 
  It is expected to contain name and value of dirt and common metals, follow by question(s).
  Each statement and each question should end with newline.
* Keyword 'is' should be present in the input as the identifier for dirt and common metals.
* Dirt should only contain one word during initialisation.
* Dirt should not contain keyword 'Credits'.
* Dirt value should be in roman numerals.
* Common metals should contain keyword 'Credits'.
* Common metals value should be in numbers.
* All Questions should end with question mark (?), with the white space before '?'.
* Question should start with keyword 'how much is' to identify dirt value.
* Question should start with keyword 'how many Credits is' to identify common metal value.
* There should be only one metal name per statement or question.
* There should be at least one dirt name before common metal for each statement and question.

Test Input & Expected Output
----------------------------
### Test Input ###
glob is I  
prok is V  
pish is X  
tegj is L  
glob glob Silver is 34 Credits  
glob prok Gold is 57800 Credits  
pish pish Iron is 3910 Credits  
how much is pish tegj glob glob ?  
how many Credits is glob prok Silver ?  
how many Credits is glob prok Gold ?  
how many Credits is glob prok Iron ?  
how much wood could a woodchuck chuck if a woodchuck could chuck wood ?  

### Expected Output ###
pish tegj glob glob is 42  
glob prok Silver is 68 Credits  
glob prok Gold is 57800 Credits  
glob prok Iron is 782 Credits  
I have no idea what you are talking about  