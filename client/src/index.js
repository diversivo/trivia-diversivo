import css from './assets/sass/index.scss';
import svgLogo from './assets/img/diversivo-v2.svg';
import menu from './menu';
//import questions from "../assets/questions.json"; //The file with questions, represented by a JSON array of Question objects



console.log(menu.msg);

const logo = new DOMParser().parseFromString(svgLogo, 'application/xml');
const screen =  document.createElement("DIV");
const box = document.createElement("DIV");
const div =  document.createElement("DIV");


//div.appendChild(div.ownerDocument.importNode(logo.documentElement, true))

var cardsFragment = document.createDocumentFragment();
var i;
for(i=0;i<5;i++){
    const card = document.createElement("DIV");
    card.classList.add('card');
    cardsFragment.appendChild(card);
    console.log(i);
}
document.body.appendChild(cardsFragment);
box.classList.add('box');
