import { appState } from "../index"; //TODO undo this circular reference - is used to change state with the Play button
import svgLogo from "../assets/img/diversivo-v2.svg";


class Menu{
	constructor(){
		this._title = this._createTitle();
		//playButton: is a DocumentFragment containing the Play! button element of the menu
		this._playButton = this._createPlayButton();
	}

	_createTitle(){
		//Container DIV for all elements: a DIV with image inside, and a DIV with text inside
		const title = document.createElement("div");
		title.style.alignItems = "center";
		title.style.marginTop = "12%";
		title.classList.add("menu_title");

		//Image for first DIV - Diversivo's logo with shadow
		const titleImage = new DOMParser().parseFromString(svgLogo, "application/xml"); //Loading the SVG
		console.log(titleImage);

		//Inserting the shadow into the SVG
		titleImage.getElementsByTagName("defs")[0].innerHTML = 
			"<filter id = \"i1\" width = \"150%\" height = \"150%\"> \
				<feOffset result = \"offOut\" in = \"SourceAlpha\" dx = \"3\" dy = \"3\"/> \
				<feBlend in = \"SourceGraphic\" in2 = \"offOut\" mode = \"normal\"/> \
			</filter>"; //Surely there is a better way to do this (specially for the absence of parsing, maybe with parsing and nodes), but for now, it works
		titleImage.getElementById("Layer_1").setAttribute("filter", "url(#i1)");

		//First DIV containing Diversivo's logo
		const titleImageContainer = document.createElement("div");
		titleImageContainer.classList.add("menu_title", "menu_title_img");
		titleImageContainer.appendChild(titleImageContainer.ownerDocument.importNode(titleImage.documentElement, true));
		titleImageContainer.style.padding = "0 25%";
		//Changing Diversivo's logo color from black to other color
		titleImageContainer.style.fill = "cadetblue";
		//TODO solve Diversivo's logo shadow being cut at S and O

		//Guide lines
		//TODO delete guide lines
		titleImageContainer.style.border = "5px solid blue";

		//Second DIV containing the "Trivia" word
		const titleTextContainer = document.createElement("div");
		titleTextContainer.classList.add("menu_title", "menu_title_text");
		titleTextContainer.appendChild(document.createTextNode("Trivia"));
		titleTextContainer.style.textAlign = "center";

		//Apending both DIVs to the containter DIV and returning it
		title.appendChild(titleImageContainer);
		title.appendChild(titleTextContainer);
		return title;
		//TODO proper title style
	}

	/**
     * Creates the main button of the menu - the Play! button
     */
	_createPlayButton() {
		const playButtonContainer = document.createElement("div");
		playButtonContainer.style.alignContent = "center";

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
		//TODO make basic styles for the menu and menu elements (button, title, etc)
		menuFragment.appendChild(this._title);
		menuFragment.appendChild(this._playButton);
		document.body.appendChild(menuFragment);
	}
}

export {Menu};