"use strict";
import svgLogo from "./assets/img/diversivo-v2.svg";

/**
 * Returns the application logo enclosed in a DIV with id "app-logo"
 */
export const generateGameTitleLogo = () => {
	//Importing Diversivo's logo
	const logo = new DOMParser().parseFromString(svgLogo, "application/xml"); //Loading the SVG - this line by dquinteros

	//Inserting shadow into the SVG
	logo.getElementsByTagName("defs")[0].innerHTML = 
		"<filter id = \"i1\" width = \"150%\" height = \"150%\"> \
			<feOffset result = \"offOut\" in = \"SourceAlpha\" dx = \"3\" dy = \"3\"/> \
			<feBlend in = \"SourceGraphic\" in2 = \"offOut\" mode = \"normal\"/> \
		</filter>"; //Surely there is a better way to do this (specially for the absence of parsing, maybe with parsing and nodes), but for now, it works
	logo.getElementById("Layer_1").setAttribute("filter", "url(#i1)");
	logo.documentElement.style.width = "auto";
	//First DIV containing Diversivo's logo
	const logoContainer = document.createElement("div");
	logoContainer.classList.add("game-title", "game-title-img");
	logoContainer.appendChild(logoContainer.ownerDocument.importNode(logo.documentElement, true));
	//Changing Diversivo's logo color from black to other color, also is possible do it adding the "fill" attribute to each path, but this is quicker
	logoContainer.style.fill = "#1f3e93";
	//TODO solve Diversivo's logo shadow being cut at S and O

	return logoContainer;
};

export const generateGameTitleText = () => {
	const titleTextContainer = document.createElement("div");
	titleTextContainer.classList.add("game-title", "game-title-text");
	titleTextContainer.appendChild(document.createTextNode("TRIVIA"));
	titleTextContainer.style.textAlign = "center";
	titleTextContainer.style.fontFamily = "sans-serif"; //TODO title text style, better font
	titleTextContainer.style.fontSize = "125px";
	titleTextContainer.style.fontWeight = "1000";
	titleTextContainer.style.color = "white";
	titleTextContainer.style.textShadow = "2px 2px #ff6011";
	return titleTextContainer;
};