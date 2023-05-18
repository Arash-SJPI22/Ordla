export default function checkGuess(guess, answer) {
	// Have them comme in in uppercase , or leave it for error misstakes just in case
	guess = guess.toUpperCase().split("");
	answer = answer.toUpperCase().split("");
    
    const result = [];

	for (let i = 0; i < guess.length; i++) {

		if (guess[i] === answer[i]) {

			result.push(addObject(guess[i], "correct"));

		} else {

			if (answer.includes(guess[i])) {

				// If numbers the letters has more instances in the answer then the guess, its missplaced
				if (numbersOfX(guess[i], answer) >= numbersOfX(guess[i], guess)) {

					result.push(addObject(guess[i], "misplaced"));

					// There are more instances of the letter in guess then in the answer. Must be determened if they are misplaced or incorrect.
					// It is misplaced if the instance is one the instances that is fewer or equal to the number of instance of the letter in the guess then the answer
				} else {

					let numberOfRightLetters = 0;

					for (let j = 0; j < answer.length; j++) {
						if (answer[j] == guess[i] && answer[j] == guess[j]) numberOfRightLetters++;
					}

					// If there are equal numbers of the letter in the right place in the asnwer and guess then all other instances of the letter in the guess are incorrect
					if (numberOfRightLetters == numbersOfX(guess[i], answer)) {

						result.push(addObject(guess[i], "incorrect"));

					// If the numbers of letters in the rightplace and number of already misplaced letters are fewer then instances of the letter in the answer its misplaced.
					} else if (
                        numberOfRightLetters + numbersOfX(guess[i], result, true) <
						numbersOfX(guess[i], answer)) {

						result.push(addObject(guess[i], "misplaced"));
                        
					} else {

						result.push(addObject(guess[i], "incorrect"));
					}
				}
			} else {

				result.push(addObject(guess[i], "incorrect"));
			}
		}
	}

	return result;
}

function addObject(lett, res) {

	return { letter: lett, result: res };
}

function numbersOfX(letter, comparison, isObject = false) {

	let recurrence = 0;

	comparison.forEach((l) => {

		if (isObject) {

			if (l.letter == letter && l.result == "misplaced") 
                recurrence++;
		
            } else {

			if (l == letter) 
                recurrence++;
		}
	});

	return recurrence;
}