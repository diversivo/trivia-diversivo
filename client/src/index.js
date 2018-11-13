import css from './assets/sass/index.scss';
import svgLogo from './assets/img/diversivo-v2.svg';
import menu from './menu';

console.log(menu.msg);

const logo = new DOMParser().parseFromString(svgLogo, 'application/xml');
const screen =  document.createElement("DIV");
const box = document.createElement("DIV");
const div =  document.createElement("DIV");
div.appendChild(div.ownerDocument.importNode(logo.documentElement, true))
box.appendChild(div);
box.classList.add('box');
document.body.appendChild(box);