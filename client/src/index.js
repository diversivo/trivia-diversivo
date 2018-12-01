"use strict";
import css from "./assets/sass/index.scss";
import background from "./assets/img/questions1.png";
import { Menu } from "./menu/index";

//Constants
const allowedStates = [
	"MENU",
	"GAME_LOOP"
];

//Application state object
let appState = {
	currentState: "MENU",
	levelsEnabled: false,
	currentLevel: 1, //Starts at 1
	maxLevel: 3, //Basically, the number of levels
	cardsPerLevel: 3, //If levelsEnabled is true, show this number of cards per level
	cardsIfNoLevel: 10, //If levelsEnabled is false, show this number of cards
	cardsState: [
		{
			id:1,
			state: "a, b, c"
		} //Redefine this card state if neccesary
		//TODO evaluate if cardsState should pertain to appState or if it could be a property of each card instance
	],
};

//Functions
/*Some functions are defined with "traditional" function statements (mostly the larger/more important ones),
and the reasons are based on this article: https://medium.freecodecamp.org/constant-confusion-why-i-still-use-javascript-function-statements-984ece0b72fd ,
but the main is to help the editor and the programmer to differentiate and organize quickly the functions and values (constants and variables)
*/

/**
 * Evaluates if the current state of the application is valid.
 *
 */
function isCurrentStateValid() {
	if(allowedStates.includes(appState.currentState)){
		console.log("Hola");
	} else {
		console.error("Error: the current state of the application is not a valid state: " + appState.currentState + 
                      ". The accepted states are: " + allowedStates.toString() + ".");
	}
}

/**
 * Initializes the application before the execution
 *
 */
function initializeApp(){
	appState.currentState = "MENU";
	//TODO: Make sure application configurations are valid:
	// - No negative level numbers
	// - There should be at least cardsPerLevel questions for each level if levelsEnabled is true
	// - There should be at least cardsIfNoLevel questions if levelsEnabled is false
	// - Discount identical questions from the count (related to the two points above) 
	//TODO: load config from file (validate it previously, if not correct, throw alert and stop execution)
	//TODO: Add background to the app
	document.body.style.backgroundImage = "url(" + background + ")";
	document.body.style.backgroundRepeat = "repeat";
	//TODO: [OPTIONAL] Add music
}

/**
 * Application's main function and execution entry point
 *
 */
function main(){
	initializeApp(); //Initial app state, background, etc.
	const menu = new Menu();
	menu.displayMenu();
}



//Calling main in order to start execution
main();

export {appState};