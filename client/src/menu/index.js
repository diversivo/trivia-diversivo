
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
        let temporaryFragment = document.createDocumentFragment();
        let playButton = this.temporaryFragment.createElement("button");
        playButton.setAttribute("type","button");
        playButton.setAttribute("id","playButton");
        temporaryFragment.getElementById("playButton").textContent = "¡Jugar!";
        return temporaryFragment;
        //TODO button style
    }

    /**
     * Creates the menu and displays it
     */
    displayMenu(){
        let menuFragment = document.createDocumentFragment();
        //...
        //TODO make the DIVs for the menu
        //TODO make basic styles for the menu and menu elements (button, title, etc)
        menuFragment.appendChild(this.playButton);
        document.body.appendChild(menuFragment);
    }
}