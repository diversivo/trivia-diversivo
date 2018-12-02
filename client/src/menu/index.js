"use strict";
import svgLogo from "../assets/img/diversivo-v2.svg";


class Menu{
	constructor(){
		this._title = this._createTitle();
		//playButton: is a DocumentFragment containing the Play! button element of the menu
		this._playButton = this._createPlayButton();
	}

	/**
	 * Generates a DIV containing the application title
	 */
	_createTitle(){
		//Container DIV for all elements: a DIV with image inside, and a DIV with text inside
		const title = document.createElement("div");
		title.setAttribute("id", "title");
		title.style.alignItems = "center";
		title.style.marginTop = "12%";
		title.classList.add("menu-title");

		//Image for first DIV - Diversivo's logo with shadow
		const titleImage = new DOMParser().parseFromString(svgLogo, "application/xml"); //Loading the SVG

		//Inserting the shadow into the SVG
		titleImage.getElementsByTagName("defs")[0].innerHTML = 
			"<filter id = \"i1\" width = \"150%\" height = \"150%\"> \
				<feOffset result = \"offOut\" in = \"SourceAlpha\" dx = \"3\" dy = \"3\"/> \
				<feBlend in = \"SourceGraphic\" in2 = \"offOut\" mode = \"normal\"/> \
			</filter>"; //Surely there is a better way to do this (specially for the absence of parsing, maybe with parsing and nodes), but for now, it works
		titleImage.getElementById("Layer_1").setAttribute("filter", "url(#i1)");

		//First DIV containing Diversivo's logo
		const titleImageContainer = document.createElement("div");
		titleImageContainer.classList.add("menu-title", "menu-title-img");
		titleImageContainer.appendChild(titleImageContainer.ownerDocument.importNode(titleImage.documentElement, true));
		titleImageContainer.style.padding = "0 25%";
		//Changing Diversivo's logo color from black to other color, also is possible do it adding the "fill" attribute to each path, but this is quicker
		titleImageContainer.style.fill = "#1f3e93";
		//TODO solve Diversivo's logo shadow being cut at S and O

		//Second DIV containing the "Trivia" word
		const titleTextContainer = document.createElement("div");
		titleTextContainer.classList.add("menu-title", "menu-title-text");
		titleTextContainer.appendChild(document.createTextNode("TRIVIA"));
		titleTextContainer.style.textAlign = "center";
		titleTextContainer.style.fontFamily = "sans-serif"; //TODO title text style, better font
		titleTextContainer.style.fontSize = "125px";
		titleTextContainer.style.fontWeight = "1000";
		titleTextContainer.style.color = "white";
		titleTextContainer.style.textShadow = "2px 2px #ff6011";


		//Apending both DIVs to the container DIV and returning it
		title.appendChild(titleImageContainer);
		title.appendChild(titleTextContainer);
		return title;
		//TODO proper title style
	}

	/**
     * Creates the main button of the menu - the Play! button
	 * inside a DIV container
     */
	_createPlayButton() {
		//Creating the button
		const playButton = document.createElement("button");
		playButton.setAttribute("type","button");
		playButton.setAttribute("id","play-button");
		playButton.textContent = "¡Jugar!";
		//Creating the button container - a DIV
		const playButtonContainer = document.createElement("div");
		playButtonContainer.appendChild(playButton);
		return playButtonContainer;
	}

	/**
     * Creates the menu and displays it
     */
	displayMenu(){
		const menuFragment = document.createDocumentFragment();
		menuFragment.appendChild(this._title);
		menuFragment.appendChild(this._playButton);
		document.body.appendChild(menuFragment);
		//TODO animation of menu creation (fade-in?)
	}

	/**
	 * Deletes all menu elements.
	 * Use this before displaying the elements of the next screen.
	 */
	destroyMenu(){
		document.getElementById("title").parentNode.removeChild(document.getElementById("title"));
		document.getElementById("play-button").parentNode.removeChild(document.getElementById("play-button"));
		//TODO animation of menu destruction (fade-out?)
	}
}

export {Menu};