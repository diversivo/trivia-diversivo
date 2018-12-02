"use strict";

import { appStateNConfig } from "../index";
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
		this._cardDeck; //Array of the card instances on the screen
		this._controlsBar; //DIV for the buttons for the operator (Next Level, Win, Lose, etc.)
	}

	/**
	 * Generates a header DIV where the game logo will be placed
	 */
	_createTitleBar(){

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

	}

	/**
	 * Put the cards into the grid. 
	 * @param {Array} cardsArray 
	 */
	_populateCardsGrid(cardsArray){

	}

	/**
	 * Creates an array of cards
	 */
	_createCardsDeck(){

	}

	_createTitle(){

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

	}

}

export {Game};