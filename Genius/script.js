let order = [];
let clickOrder = [];
let score = 0;


const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');


let shufflerOrder = () =>{

    let colorOrder = Math.floor(Math.random() * 4)
    order[order.length] = colorOrder;
    clickOrder = [];
}

