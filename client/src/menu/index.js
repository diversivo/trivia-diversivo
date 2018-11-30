import { appState } from "../index"; //TODO undo this circular reference - is used to change state with the Play button

class Menu{
    constructor(){
        this._title = this._createTitle();
        //playButton: is a DocumentFragment containing the Play! button element of the menu
        this._playButton = this._createPlayButton();
    }

    _createTitle(){
        const title = document.createElement("div");
        title.classList.add("menu_title");
        title.appendChild(document.createTextNode("Diversivo Trivia"));
        return title;
        //TODO title style
    }

    /**
     * Creates the main button of the menu - the Play! button
     */
    _createPlayButton() {
        const playButton = document.createElement("button");
        playButton.setAttribute("type","button");
        playButton.setAttribute("id","playButton");
        playButton.textContent = "¡Jugar!";
        playButton.addEventListener("click", () => {
            appState.currentState = "GAME_LOOP";
            console.log("Current state is GAME_LOOP");
        });
        return playButton;
        //TODO button style
    }

    /**
     * Creates the menu and displays it
     */
    displayMenu(){
        const menuFragment = document.createDocumentFragment();
        //...
        //TODO make the DIVs for the menu
        //TODO make basic styles for the menu and menu elements (button, title, etc)
        menuFragment.appendChild(this._title);
        menuFragment.appendChild(this._playButton);
        document.body.appendChild(menuFragment);
    }
}

export {Menu};