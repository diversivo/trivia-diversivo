import css from './assets/sass/index.scss';
import svgLogo from './assets/img/diversivo-v2.svg';
import menu from './menu';

//Constants
const allowedStates = [
    "MENU",
    "GAME_LOOP"
];

//Application state object
let appState = {
    currentState: "MENU",
    levelsEnabled: false,
    currentLevel: 0,
    cardsPerLevel: 3,
    cardsState: [
        {
            id:1,
            state: 'a, b, c'
        }
    ],
}

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
    //TODO: Add background to the app
    //TODO: [OPTIONAL] Add music
}

/**
 * Application's main function and execution entry point
 *
 */
function main(){
    initializeApp(); //Initial app state, background, etc.
    //Show menu and wait for user action
}



//Calling main in order to start execution
main();
