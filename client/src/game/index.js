"use strict";
import { appStateNConfig } from "../index";
import { generateGameTitleLogo,generateGameTitleText } from "../utils";
import { Card } from "../card/index";
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
		this._cardsGrid = document.createElement("div");
		this._cardsGrid.setAttribute("id","cards-grid");
		this._cardsGrid.style.display = "grid";
		this._cardsGrid.style.gridGap = "3vw";
		this._cardsGrid.style.justifyContent = "start";
		this._cardsGrid.style.gridTemplateColumns = "auto auto auto auto";
		return this._cardsGrid;
	}

	/**
	 * Put the cards of cardsDeck into the grid.  
	 */
	_populateCardsGrid(){
		const cardsFragment = document.createDocumentFragment();
		//this._cardsDeck.map((card) => {cardsFragment.appendChild(card);}); //TODO watch this line, apparently map does not work to append cards
		console.log(this._cardsDeck);
		cardsFragment.appendChild(this._cardsDeck[0]);
		cardsFragment.appendChild(this._cardsDeck[1]);
		this._cardsGrid.appendChild(cardsFragment);
	}

	/**
	 * Creates an array of cards
	 */
	_createCardsDeck(){
		//Adding one card, just for testing
		//TODO add dynamically cards
		this._cardsDeck.push(new Card("Q","A").buildCard());
		this._cardsDeck.push(new Card("Q2","B").buildCard());
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