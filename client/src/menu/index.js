"use strict";
import { generateGameTitleLogo, generateGameTitleText } from "../utils";


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

		//First DIV - Diversivo's logo with shadow
		const titleLogo = generateGameTitleLogo();
		titleLogo.style.padding = "0 25%";
		titleLogo.style.margin = "0 auto";

		//Second DIV containing the "Trivia" word
		const titleText = generateGameTitleText();
		titleText.style.fontSize = "10vw";




		//Apending both DIVs to the container DIV and returning it
		title.appendChild(titleLogo);
		title.appendChild(titleText);
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