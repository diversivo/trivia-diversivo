"use strict";
import css from "./assets/sass/index.scss";
import background from "./assets/img/questions1.png";
import { Menu } from "./menu/index";
import { Game } from "./game";

//Constants
const allowedStates = [
	"MENU",
	"GAME"
];

const menu = new Menu();
const game = new Game();


//Application state object, here's supplied with default parameters, then these values could be replaced from a configuration file
let appStateNConfig = {
	currentState: "MENU",
	levelsEnabled: true,
	currentLevel: 2, //Starts at 1
	maxLevel: 3, //Basically, the number of levels
	cardsPerLevel: 2, //If levelsEnabled is true, show this number of cards per level
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
	if(allowedStates.includes(appStateNConfig.currentState)){
		return true;
	} else {
		console.error("Error: the current state of the application is not a valid state: " + appStateNConfig.currentState + ". The accepted states are: " + allowedStates.toString() + ".");
		return false;
	}
}

function changeState(newState){
	if(typeof newState !== "string"){
		console.error("Error: the newState parameter should be a string");
		return false;
	} else {
		appStateNConfig.currentState = newState;
		if (isCurrentStateValid()){
			switch(appStateNConfig.currentState){
			case "MENU":
				menu.displayMenu();
				document.getElementById("play-button").addEventListener("click", () => {
					if(changeState("GAME") === false) return; //TODO check this line, it probably won't stop the program if changeState fails by now
					else menu.destroyMenu();
		
				});
				console.log("Current state is MENU");
				return true;

			case "GAME":
				game.displayGameScreen();
				console.log("Current state is GAME");
				return true;

			default:
				console.error("Error: the validation of the application state is not working properly, and now the application is in an unknown state.");
				return false;
			}
			
		} else return false;
	}
}

/**
 * Initializes the application before the execution
 *
 */
function initializeApp(){
	
	if (changeState("MENU") === false) return false;
	//TODO: Make sure application configurations are valid:
	// - No negative level numbers
	// - There should be at least cardsPerLevel questions for each level if levelsEnabled is true
	// - There should be at least cardsIfNoLevel questions if levelsEnabled is false
	// - Discount identical questions from the count (related to the two points above)
	//TODO: Delete identical questions from the questions pool
	//TODO: load config from file (validate it previously, if not correct, throw alert and stop execution)
	//TODO: Add background to the app
	document.body.style.backgroundImage = "url(" + background + ")";
	document.body.style.backgroundRepeat = "repeat";
	//TODO: [OPTIONAL] Add music
	return true;
}

/**
 * Application's main function and execution entry point
 *
 */
function main(){
	const initResult = initializeApp(); //Initial app state, background, etc.
	
	//If init had a problem, don't execute any code further
	if (initResult === false){
		console.error("The application has stopped because of an error during initialization.");
		return;
	}

}



//Calling main in order to start execution
window.banana = banana;
main();

//Easter egg
function banana(){
	console.log("A banana has been given to the developer. Thank you! 🍌");
}

export {appStateNConfig};