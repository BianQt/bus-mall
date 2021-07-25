'use strict';

let leftItemElement = document.getElementById('left-item');
let middleItemElement = document.getElementById('middle-item');
let rightItemElement = document.getElementById('right-item');

let attemptsNumber = 25;
let attemptsCounter = 0;
let items = [];
let leftItemIndex;
let middleItemIndex;
let rightItemIndex;


function Item(name, src){
    this.name = name;
    this.src = src;
    this.shown = 0;
    this.votes = 0;
    items.push(this);
}


new Item('Bag','img/bag.jpg');
new Item('Banana','img/banana.jpg');
new Item('Bathroom','img/bathroom.jpg');
new Item('Boots','img/boots.jpg');
new Item('Breakfast','img/breakfast.jpg');
new Item('BubbleGum','img/bubblegum.jpg');
new Item('Chair','img/chair.jpg');
new Item('Cthulhu','img/cthulhu.jpg');
new Item('Dog-Duck','img/dog-duck.jpg');
new Item('Dragon','img/dragon.jpg');
new Item('Pen','img/pen.jpg');
new Item('Pet-Sweep','img/pet-sweep.jpg');
new Item('Scissors','img/scissors.jpg');
new Item('Shark','img/shark.jpg');
new Item('Sweep','img/sweep.png');
new Item('Tauntaun','img/tauntaun.jpg');
new Item('Unicorn','img/unicorn.jpg');
new Item('Water-Can','img/water-can.jpg');
new Item('Wine-Glass','img/wine-glass.jpg');


function randomIndex(){
   return Math.floor(Math.random()*items.length);
}

function renderItems(){

    leftItemIndex = randomIndex();
    middleItemIndex = randomIndex();
    rightItemIndex = randomIndex();

    while ( (leftItemIndex == middleItemIndex) || (leftItemIndex == rightItemIndex) || (rightItemIndex == middleItemIndex)){
        middleItemIndex = randomIndex();
        rightItemIndex = randomIndex();
    }

    leftItemElement.src = items[leftItemIndex].src;
    middleItemElement.src = items[middleItemIndex].src;
    rightItemElement.src = items[rightItemIndex].src;
    items[leftItemIndex].shown++;
    items[middleItemIndex].shown++;
    items[rightItemIndex].shown++;

    //console.log (leftItemElement,rightItemElement,middleItemElement);

}

renderItems();

leftItemElement.addEventListener('click',itemClick);
middleItemElement.addEventListener('click',itemClick);
rightItemElement.addEventListener('click',itemClick);


function itemClick(event){

    attemptsCounter++;

    if (attemptsCounter < attemptsNumber){

        if ( event.target.id ==='left-item'){
            items[leftItemIndex].votes++;
        }
        else if ( event.target.id ==='middle-item'){
            items[middleItemIndex].votes++;
        }
        else {
            items[rightItemIndex].votes++;
        }

        renderItems();
    }

    else {
        

        let list = document.getElementById('results');
        let resultButton = document.createElement('button');
        list.appendChild(resultButton);
        resultButton.textContent ='Results';
        resultButton.addEventListener('click', resultClick);
        leftItemElement.removeEventListener('click',itemClick);
        middleItemElement.removeEventListener('click',itemClick);
        rightItemElement.removeEventListener('click',itemClick);

    }
}

function resultClick(){
    let list = document.getElementById('results');
    list.textContent=' ';

    for (let i = 0; i < items.length; i++) {
        let listItem = document.createElement('li');
        list.appendChild(listItem);
        listItem.textContent = `${items[i].name} had ${items[i].votes} votes, and was seen ${items[i].shown} times.`
        
    }
}
 