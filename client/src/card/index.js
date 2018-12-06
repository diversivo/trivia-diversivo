"use strict";
//TODO load questions into cards in random manner (using a static question ids list?), but limited to max level in the config, make sure there exists at least cardsPerLevel questions of each level
//TODO set a click event listener which toggles between card states
//TODO define if a card could be displayed or not if levels are enabled based on the question level
//TODO define an internal method for a card to transition to its next state

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
		switch(this._state){
		case "COVERED":
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

			break;

		case "QUESTION":
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
			break;

		case "ANSWER":
			console.log("There is no new state for the card with id " +  this._id +  " because \"ANSWER\" is the last state.");
			break;

		default: //Catch-all if for some mistake the former state was setup incorrectly
			console.error("Unrecognizable current card state for card id " + this._id + ": \"" + this._state + "\".");
		}
	}

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

		cardDiv.addEventListener("click",() => this._nextState()); //TODO try to avoid arrow function in order to be able to remove the event listener, but as for now, if the function is called directly, this = div, not the class instance - ask dquinteros
		
		return cardDiv;
	}
}

export {Card};