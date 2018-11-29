import { appState } from "../index"; //TODO undo this circular reference - is used to change state with the Play button

class Menu{
    constructor(){
        // this._title = this._createTitle();
        //playButton: is a DocumentFragment containing the Play! button element of the menu
        this._playButton = this._createPlayButton();
    }

    _createTitle(){
        //TODO make title
    }

    /**
     * Creates the main button of the menu - the Play! button
     */
    _createPlayButton() {
        let playButton = document.createElement("button");
        playButton.setAttribute("type","button");
        playButton.setAttribute("id","playButton");
        playButton.textContent = "¡Jugar!";
        playButton.addEventListener("click", () => {
            appState.currentState = "GAME_LOOP";
            console.log("Current state is GAME_LOOP");
        });
        return playButton;
        //TODO button style
        //TODO button onclick event listener
    }

    /**
     * Creates the menu and displays it
     */
    displayMenu(){
        let menuFragment = document.createDocumentFragment();
        //...
        //TODO make the DIVs for the menu
        //TODO make basic styles for the menu and menu elements (button, title, etc)
        menuFragment.appendChild(this._playButton);
        document.body.appendChild(menuFragment);
    }
}

export {Menu};