var app = angular.module("AngularTraining",[]);

// https://stackoverflow.com/questions/17470790/how-to-use-a-keypress-event-in-angularjs
app.directive('myEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.myEnter);
                });

                event.preventDefault();
            }
        });
    };
});

// Assign controller
app.controller('PagesController', ['$rootScope', function($rootScope){
	var randomWords = ["rat","dog","three","four","animal"];
	
	var initGame = function () {
		$rootScope.incorrectLetters = [];
		$rootScope.correctLetters = [];
		$rootScope.maxGuesses = 6;
		$rootScope.guessesUsed = 0;
		$rootScope.displayWord = '';
		
		// Root scope
		$rootScope.input = {
			letter : ''
		}
	}


	// Select Random Word
	var selectRandomWord = function () {
		var index = Math.floor(Math.random() * randomWords.length);
		return randomWords[index];
	}

	// New game  
	var newGame = function () {
		initGame();
		var selectedWord = selectRandomWord();
		$rootScope.selectedWord = selectedWord;
		var tempWord = '';
		for (var i = selectedWord.length - 1; i >= 0; i--) {
			// selectedWord[i]
			tempWord += "*";
		}

		$rootScope.displayWord = tempWord;
	}

	// Click function in js
	$rootScope.letterChosen = function(){
		var guessEntered = $rootScope.input.letter;
		if($rootScope.displayWord == "Game Over"){
			return false;
		}

		// If letter is part of correct letters
		// return false
		if ($rootScope.correctLetters.includes(guessEntered)){
			return false;
		}

		// If the letter is part of incorrect letters
		// return false
		if ($rootScope.incorrectLetters.includes(guessEntered)){
			return false;
		}

		// If not check whether the letter is 
		// part of selectedWord
		if($rootScope.selectedWord.includes(guessEntered)){
			$rootScope.correctLetters.push(guessEntered);
		}else{
			$rootScope.incorrectLetters.push(guessEntered);
			$rootScope.maxGuesses -= 1;
			if($rootScope.maxGuesses <= 0){
				$rootScope.maxGuesses = 0;
				$rootScope.displayWord = "Game Over";
				return ;
			}
		}



		selectedWord = $rootScope.selectedWord;
		$rootScope.displayWord = '';
		for (var i = 0; i < selectedWord.length; i++) {
			if($rootScope.correctLetters.includes(selectedWord[i])){
				$rootScope.displayWord += selectedWord[i];
			}else{
				$rootScope.displayWord += '*';
			}
		}

		// clear word from text box
		$rootScope.input.letter = '';
	}

	newGame();
}])