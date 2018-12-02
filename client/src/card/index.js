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
		if(this._setQuestion(question) && this._setAnswer(answer)) return this._buildCard();
		else return null;
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

	_getQuestion(){
		return this._question;
	}

	_setAnswer(question){
		if((typeof question !== "string") && isNaN(question)){
			console.error("El valor " + question + " no es un texto ni un número, y por lo tanto, no se considera válido para ser usado como respuesta.");
			return false;
		} else {
			this._question = question;
			return true;
		}
	}

	_getAnswer(){
		return this._answer;
	}

	_nextState(){
		switch(this._state){
		case "COVERED":
			console.log("Next state for the card with id " +  this._id +  " is \"" + "QUESTION\".");
			this._state = "QUESTION";
			break;
		case "QUESTION":
			console.log("Next state for the card with id " +  this._id +  " is \"" + "ANSWER\".");
			this._state = "ANSWER";
			break;
		case "ANSWER":
			console.log("There is no new state for the card with id " +  this._id +  " because \"ANSWER\" is the last state.");
			break;
		default: //Catch-all if for some mistake the former state was setup incorrectly
			console.error("Unrecognizable current card state for card id " + this._id + ": \"" + this._state + "\".");
		}
	}

	/**
	 * Generates the documentFragment corresponding to the individual card to be added by the Game class, also including the corresponding eventListener for the click event
	 */
	_buildCard(){
		const cardFragment = document.createDocumentFragment();
		const cardDiv = document.createElement("div");
		cardDiv.classList.add("card");
		cardDiv.style.height = "250px";
		cardDiv.style.width = "500px";
		cardDiv.style.display = "inline-block";
		cardDiv.style.border = "3px solid blue";
		cardDiv.style.backgroundColor = "orange";
		//TODO complete the card

		cardDiv.addEventListener("click", () => {
			console.log("Card with id " + this._id + " has been clicked.");
			//TODO change card state with click
		});

		cardFragment.appendChild(cardDiv);
		return cardFragment;
	}
}

export {Card};