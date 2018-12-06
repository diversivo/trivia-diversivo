"use strict";
import { appStateNConfig } from "../index";
import { generateGameTitleLogo,generateGameTitleText } from "../utils";
import { Card } from "../card/index";
import questionsArray from "../assets/questions.json";
//TODO define Victory button
//TODO define Game Over button
//TODO define Next Level button if levels are enabled
//TODO define End game (or reset) button
//TODO set up the card grid
//TODO put cardsPerLevel cards in the grid if levels are enabled
//TODO put cardsIfNoLevel cards in the grid if levels are disabled (levelsEnabled: false)
//TODO put level indicator if levels are enabled

/**
 * Class which handles the game loop
 */
class Game{
	constructor(){
		this._titleBar; //Container div for the game logo, as a bar on the top of the page
		this._cardsDeck = []; //Array of the card instances on the screen
		this._cardsGrid; //DIV for the cards
		this._controlsBar; //DIV for the buttons for the operator (Next Level, Win, Lose, etc.)
		this._questionsSelectedIDs = []; //Array of the positions of selected questions in the current level relative to the whole question array
	}

	/**
	 * Generates a header DIV where the game logo will be placed
	 */
	_createTitleBar(){		
		//Calling the generation functions for logo and text
		const gameTitleLogo = generateGameTitleLogo();
		const gameTitleText = generateGameTitleText();

		//Fixing the logo & text to fit the design
		gameTitleLogo.style.height = "auto";
		gameTitleLogo.style.width = "30vw";
		gameTitleLogo.style.marginLeft = "2vw";
		gameTitleLogo.style.marginRight = "1vw";
		gameTitleLogo.style.display = "inline-block";

		gameTitleText.style.fontSize = "4vw";
		gameTitleText.style.display = "inline-block";

		//Creating the container DIV and appending the image and logo
		//TODO fix the top margin - Diversivo's logo is too close from the top of the page
		const titleDiv = document.createElement("div");
		titleDiv.style.boxShadow = "0 4px 25px 2px black";
		titleDiv.appendChild(gameTitleLogo);
		titleDiv.appendChild(gameTitleText);
		
		return titleDiv;
	}

	/**
	 * Generates a DIV where the game control buttons will be placed
	 */
	_createControlsBar(){

	}

	/**
	 * Creates the grid structure where the cards will be put
	 */
	_createCardsGrid(){
		//TODO make the card grid resize dynamically itself based on the viewport width (avoiding the need of horizontal scrolling)
		this._cardsGrid = document.createElement("div");
		this._cardsGrid.setAttribute("id","cards-grid");
		this._cardsGrid.style.display = "grid";
		this._cardsGrid.style.gridGap = "3vw";
		this._cardsGrid.style.justifyContent = "start";
		this._cardsGrid.style.gridTemplateColumns = "auto auto auto";
		return this._cardsGrid;
	}

	/**
	 * Put the cards of cardsDeck into the grid.  
	 */
	_populateCardsGrid(){
		const cardsFragment = document.createDocumentFragment();
		this._cardsDeck.forEach((card) => {cardsFragment.appendChild(card);});
		//console.log(this._cardsDeck);
		//cardsFragment.appendChild(this._cardsDeck[0]);
		//cardsFragment.appendChild(this._cardsDeck[1]);
		this._cardsGrid.appendChild(cardsFragment);
	}

	/**
	 * Creates an array of cards based in the current application state and configuration settings.
	 * Validation of the configuration is done in the initialization, so no checking code will be added here.
	 * The selection of the questions to be added to each card is performed here according to the following criteria:
	 * - If levelsEnabled is true, questions are chosen randomly from the questions which level is equal to appStateNConfig.currentLevel, until appStateNConfig.cardsPerLevel questions are selected or no more questions are available to select.
	 * - If levelsEnabled is disabled, questions are chosen randomly from the whole question pool until appStateNConfig.cardsIfNoLevel are selected or no more questions are available to select. That means questions of different difficulties could be present at the same time.
	 */
	_createCardsDeck(){
		//TODO add dynamically cards
		//TODO evaluate if this code can be refactored - there seems to be some redundant instructions that could be executed after the general IF statement, in particular the random selection of the questions
		//TODO better variable names - it can be confusing, they don't state their purpose very clearly

		//First step: choosing the questions. The result is setting questionsSelectedIDs, an array of the positions of the selected questions in the array. This is done to prevent working with several copies (complete or partial) of the questions array.
		let availableQuestions = 0;
		if(appStateNConfig.levelsEnabled){
			/*
				In this case, an array of available positions is generated first. The available positions corresponds to the questions that match the current level in the game, according to appStateNConfig.currentLevel. Then, the selected question positions are chosen randomly from that pool.
			*/
			let availableQuestionsIDs = [];
			questionsArray.questions_array.forEach((question)=>{
				if(question.difficulty === appStateNConfig.currentLevel) availableQuestionsIDs.push(questionsArray.questions_array.indexOf(question));
			});

			availableQuestions = availableQuestionsIDs.length;

			//Choose randomly from the filtered questions that match the difficulty
			let remainingQuestions = appStateNConfig.cardsPerLevel >= availableQuestions ? availableQuestions : appStateNConfig.cardsPerLevel;

			while(remainingQuestions > 0){
				let candidateQuestionPos = Math.floor(Math.random() * availableQuestions); //Integer between 0 and the total of available questions - 1
				if(!this._questionsSelectedIDs.includes(availableQuestionsIDs[candidateQuestionPos])){
					this._questionsSelectedIDs.push(availableQuestionsIDs[candidateQuestionPos]);
					remainingQuestions--;
				}
			}

		} else {
			/*
				In this case, just select randomly cardsIfNoLevel questions from the question pool.
			*/
			availableQuestions = questionsArray.questions_array.length;
			//Choose randomly from the question pool - no exclusions
			let remainingQuestions = appStateNConfig.cardsIfNoLevel >= availableQuestions ? availableQuestions : appStateNConfig.cardsIfNoLevel;
			while(remainingQuestions > 0){
				let candidateQuestionID = Math.floor(Math.random() * availableQuestions); //Integer between 0 and the total of available questions - 1
				if(!this._questionsSelectedIDs.includes(candidateQuestionID)){
					this._questionsSelectedIDs.push(candidateQuestionID);
					remainingQuestions--;
				}
			}
			
		}
		//Second step: build the card instances and add them to this._cardsDeck
		this._questionsSelectedIDs.forEach((id) => {
			this._cardsDeck.push(new Card(questionsArray.questions_array[id].question,questionsArray.questions_array[id].answer).buildCard());
		});
	}

	_createControlButtons(){

	}

	/**
	 * Updates the game screen with the new cards
	 */
	_nextLevel(){

	}

	/**
	 * Builds the game screen
	 */
	displayGameScreen(){
		//document.body.appendChild(document.createElement("div").appendChild(document.createTextNode("GAME")));
		const gameScreen = document.createDocumentFragment();
		gameScreen.appendChild(this._createTitleBar());
		gameScreen.appendChild(this._createCardsGrid());
		this._createCardsDeck();
		this._populateCardsGrid();

		//This just for testing
	//	this._cardsGrid.appendChild(new Card("hola","aloh"));
		//This just for testing

		document.body.appendChild(gameScreen);
	}

	/**
	 * Deletes game screen elements - exiting from the GAME state
	 */
	destroyGameScreen(){

	}

}

export {Game};