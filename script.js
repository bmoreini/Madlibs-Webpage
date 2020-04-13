// Code for madlibs.js
//document.getElementById("startGame").addEventListener("click", startGame);
// initialize variables
var sentence = [];
var whichWords = [];
var removeMarkup = null;
var replacements = null;

// initialize DOM (Document Object Model) variables for HTML elements
var inputArea = document.getElementById("input-area");
var playButton = document.getElementById("startGame");
var textBox = document.getElementById("theText");
var instructions = document.getElementById("theInstructions");

function startGame() {
  // change page now that we're playing
  inputArea.style.display = "block";
	instructions.innerHTML = "Author, enter a sentence below. Then, click Submit.";
	playButton.innerHTML = "Submit Text";
  /* user enters a sentence */
  playButton.removeEventListener("click", startGame);
  playButton.addEventListener("click", getText);
}

function getText() {
    let sentenceString = textBox.value;
		var sentence = sentenceString.split(" ");
    console.log("Sentence: "+sentence);
		instructions.innerHTML= "How many words to replace?";
    resetTextBox();
    playButton.innerHTML = "Enter Count";
    /* user enters a number */
    playButton.removeEventListener("click", getText);
    playButton.addEventListener("click", getNumber);
    /* WHY GETTEXT AGAIN? */
  }

	function getNumber(replacements) {
    replacements = textBox.value;
    console.log("Replacements = "+replacements);
    let newInstructs = "Great! You want to change "+replacements+ " words? Here are the words in your sentence, numbered: \n";
    newInstructs+=wordMenu(sentence);
		instructions.innerHTML= newInstructs;
    resetTextBox();
    playButton.innerHTML = "Specify Replacements";
    document.getElementById("startGame").addEventListener("click", replaceWhich);
	}

  function resetTextBox(){
    textBox.value = "";
  }

  function wordMenu(sentence){
    let numberedWords = "";
    for (let word=0; word<=sentence.length; word++) {
      numberedWords+=word+1+ " - " +sentence[word]+"\n";
    }
    return numberedWords;
  }

  function replaceWhich(){
		// Specify the replacements positions and parts of speech (author)
		for (word=0; word<replacements; word++) {
			whichWords[word] = (prompt("Which words? Word position: ")-1);
			sentence[whichWords[word]]=prompt("Part of speech of "+sentence[whichWords[word]]+"?");
    }
	}

	function restOfStuff(){
		alert("Author, you're done. Player, your turn!");
		for (word=0; word<replacements;word++) {
			sentence[whichWords[word]] = prompt("Enter a "+sentence[whichWords[word]]+": ");
		}

		alert(arraySentence(sentence));

		// Save sentence to file and end game
		var gameText = "Old: "+sentenceString+"\nNew: "+arraySentence(sentence);
		alert(gameText);
		saveText(gameText);
		}

  // Convert array to sentence function
  function arraySentence(myArray) {
    removeMarkup = myArray.join(" ");
    return removeMarkup;
  }


  function saveText(text) {
    alert("Clicking OK will save this game in downloads folder as madlib.txt");
    var filename = "madlib";
    var madlibs = new Blob([text], {type: "text/plain;charset=utf-8"});
    saveAs(madlibs, filename+".txt");
    }
