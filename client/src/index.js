import css from './assets/sass/index.scss';
import svgLogo from './assets/img/diversivo-v2.svg';
import menu from './menu';

// var questionsReader = new FileReader();
// questionsReader.readAsText('./assets/questions.json');
// var questions = questionsReader.result; 
//console.log(questions);

let state = {
    gameState: 'menu, playing, over, win',
    cardsState: [
        {
            id:1,
            state: 'a, b, c'
        }
    ],
}

console.log(menu.msg);

const logo = new DOMParser().parseFromString(svgLogo, 'application/xml');
const screen =  document.createElement("DIV");
const box = document.createElement("DIV");
const div =  document.createElement("DIV");


const array = [1,2,3,4,5]

const cardsFragment = document.createDocumentFragment();
array.forEach(()=>{
    const card = document.createElement("DIV");
    card.classList.add('card');
    cardsFragment.appendChild(card);
})

//div.appendChild(div.ownerDocument.importNode(logo.documentElement, true))


document.body.appendChild(cardsFragment);
box.classList.add('box');
