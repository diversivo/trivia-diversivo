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
const isCurrentStateValid = () => {
    console.log(appState.currentState);
    console.log(allowedStates.includes(appState.currentState));
    allowedStates.includes(appState.currentState) ? () => console.log("Hola") : console.error("Error: the current state of the application is not a valid state: " + appState.currentState + 
        ". The accepted states are: " + allowedStates.toString() + ".");
    /* if(allowedStates.includes(appState.currentState)){
        console.log("Hola");
    } else {
        console.error("Error: the current state of the application is not a valid state: " + appState.currentState + 
                      ". The accepted states are: " + allowedStates.toString() + ".");
    } */
}


//MAIN 
appState.currentState = "ASDF";
isCurrentStateValid();
console.log('H');
