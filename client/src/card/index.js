"use strict";
//TODO load questions into cards in random manner (using a static question ids list?), but limited to max level in the config, make sure there exists at least cardsPerLevel questions of each level
//TODO set a click event listener which toggles between card states
//TODO define if a card could be displayed or not if levels are enabled based on the question level
//TODO define an internal method for a card to transition to its next state


/*
	IMPORTANT: Some TODOs defined by dquinteros - they modify the app behavior, so consider editing the documentation
*/

//TODO center all cards respective of the screen (1 card, center of the screen, 2 cards, center row, etc)
//TODO if a card in the grid is clicked even only once, the rest of the cards are automatically disabled and can not be flipped (only one card can be flipped per screen)
//TODO the game must show the number of cards set in the configuration respective of each case (with or without levels enabled)
//TODO the game must only load a random question when the card is clicked (so game/createDeck must be refactored and bring its functionality to nextState(question))
//TODO if levels are disabled, pick any question from the pool
//TODO translate all console messages to English

const CARD_STATES = ["COVERED","QUESTION","ANSWER"];
let new_card_id = 0;
class Card{

	constructor(question,answer){
		this._id = new_card_id;
		new_card_id++;
		this._state = "COVERED";
		this._question;
		this._answer;
		this._setQuestion(question);
		this._setAnswer(answer);
		this._nextState = this._nextState.bind(this);
		this._transitionToQuestion = this._transitionToQuestion.bind(this);
		this._transitionToAnswer = this._transitionToAnswer.bind(this);
		this._noTransition = this._noTransition.bind(this);
		this._unknownTranstion = this._unknownTranstion.bind(this);
	}

	_setQuestion(question){
		if(typeof question !== "string"){
			console.error("El valor " + question + " no es un texto, y por lo tanto, no se considera válido para ser usado como pregunta.");
			return false;
		} else {
			this._question = question;
			return true;
		}
	}

	getQuestion(){
		return this._question;
	}

	_setAnswer(answer){
		if((typeof answer !== "string") && isNaN(answer)){
			console.error("El valor " + answer + " no es un texto ni un número, y por lo tanto, no se considera válido para ser usado como respuesta.");
			return false;
		} else {
			this._answer = answer;
			return true;
		}
	}

	getAnswer(){
		return this._answer;
	}

	_nextState(){
		console.log(this);
		const switcherObj = {
			"COVERED": this._transitionToQuestion,
			"QUESTION": this._transitionToAnswer,
			"ANSWER": this._noTransition,
			default: this._unknownTranstion
		};
		(switcherObj[this._state] || switcherObj.default)();
	}

	//Start of state transition functions - valid for this._nextState() only

	_transitionToQuestion(){
		console.log("Next state for the card with id " +  this._id +  " is \"" + "QUESTION\".");
		this._state = "QUESTION";

		//Adding the question inside the card
		const questionElement = document.createElement("span");
		questionElement.setAttribute("id","question-" + this._id);
		console.log(this.getQuestion());
		questionElement.textContent = this.getQuestion();
		document.getElementById("card" + this._id).appendChild(questionElement);
		console.log(document.getElementById("card" + this._id));
		//Update the class of the card so the style could change if CSS is defined for it
		document.getElementById("card" + this._id).classList.add("question");
	}

	_transitionToAnswer(){
		console.log("Next state for the card with id " +  this._id +  " is \"" + "ANSWER\".");
		this._state = "ANSWER";
		//Removing the question
		document.getElementById("card" + this._id).removeChild(document.getElementById("question-" + this._id));
		//Adding the answer
		const answerElement = document.createElement("span");
		answerElement.classList.add("answer");
		//answerElement.setAttribute("id","answer-" + this._id);
		answerElement.textContent = this.getAnswer();
		document.getElementById("card"+ this._id).appendChild(answerElement);

		//Update the class of the card so the style could change if CSS is defined for it
		document.getElementById("card" + this._id).classList.remove("question");
		document.getElementById("card" + this._id).classList.add("answer");

		//Remove the click event listener for the card since no further event processing is required - the card will ignore any clicks on the card from now on - in theory, if this works, the "ANSWER" case of this switch statement must never be reached
		document.getElementById("card" + this._id).removeEventListener("click",this._nextState);
	}

	_noTransition(){
		console.log("There is no new state for the card with id " +  this._id +  " because \"ANSWER\" is the last state.");
	}

	_unknownTranstion(){
		console.error("Unrecognizable current card state for card id " + this._id + ": \"" + this._state + "\".");
	}

	//End of state transition functions - valid for this._nextState() only


	/**
	 * Generates the container DIV corresponding to the individual card to be added by the Game class, also including the corresponding eventListener for the click event
	 */
	buildCard(){
		const cardDiv = document.createElement("div");
		cardDiv.classList.add("card");
		cardDiv.setAttribute("id","card" + this._id);
		cardDiv.style.height = "250px";
		cardDiv.style.width = "500px";
		cardDiv.style.display = "inline-block";
		cardDiv.style.border = "3px solid blue";
		cardDiv.style.backgroundColor = "orange";
		//TODO complete the card - 

		cardDiv.addEventListener("click",this._nextState); //TODO try to avoid arrow function in order to be able to remove the event listener, but as for now, if the function is called directly, this = div, not the class instance - ask dquinteros
		
		return cardDiv;
	}
}

export {Card};