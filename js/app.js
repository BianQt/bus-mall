"use strict";

let itemsDivElement = document.getElementById("items");
let leftItemElement = document.getElementById("left-item");
let middleItemElement = document.getElementById("middle-item");
let rightItemElement = document.getElementById("right-item");
let attemptsNumber = 10;
let attemptsCounter = 0;
let randomArr = [];
let nameArr = [];
let shownArr = [];
let votesArr = [];
let storedVotes = [];
let storedshown = [];
let leftItemIndex;
let middleItemIndex;
let rightItemIndex;

function Item(name, src) {
  this.name = name;
  this.src = src;
  this.shown = 0;
  this.votes = 0;
  Item.itemsAll.push(this);
}
Item.itemsAll = [];

new Item("Bag", "img/bag.jpg");
new Item("Banana", "img/banana.jpg");
new Item("Bathroom", "img/bathroom.jpg");
new Item("Boots", "img/boots.jpg");
new Item("Breakfast", "img/breakfast.jpg");
new Item("BubbleGum", "img/bubblegum.jpg");
new Item("Chair", "img/chair.jpg");
new Item("Cthulhu", "img/cthulhu.jpg");
new Item("Dog-Duck", "img/dog-duck.jpg");
new Item("Dragon", "img/dragon.jpg");
new Item("Pen", "img/pen.jpg");
new Item("Pet-Sweep", "img/pet-sweep.jpg");
new Item("Scissors", "img/scissors.jpg");
new Item("Shark", "img/shark.jpg");
new Item("Sweep", "img/sweep.png");
new Item("Tauntaun", "img/tauntaun.jpg");
new Item("Unicorn", "img/unicorn.jpg");
new Item("Water-Can", "img/water-can.jpg");
new Item("Wine-Glass", "img/wine-glass.jpg");

function randomIndex() {
  return Math.floor(Math.random() * Item.itemsAll.length);
}

function renderitems() {
  leftItemIndex = randomIndex();
  middleItemIndex = randomIndex();
  rightItemIndex = randomIndex();

  // console.log("Previous Array", randomArr);

  while (
    randomArr.includes(leftItemIndex) ||
    randomArr.includes(middleItemIndex) ||
    randomArr.includes(rightItemIndex) ||
    leftItemIndex == middleItemIndex ||
    leftItemIndex == rightItemIndex ||
    rightItemIndex == middleItemIndex
  ) {
    leftItemIndex = randomIndex();
    middleItemIndex = randomIndex();
    rightItemIndex = randomIndex();
  }

  // console.log("new arr ", leftItemIndex, middleItemIndex, rightItemIndex);

  leftItemElement.src = Item.itemsAll[leftItemIndex].src;
  middleItemElement.src = Item.itemsAll[middleItemIndex].src;
  rightItemElement.src = Item.itemsAll[rightItemIndex].src;
  Item.itemsAll[leftItemIndex].shown++;
  Item.itemsAll[middleItemIndex].shown++;
  Item.itemsAll[rightItemIndex].shown++;

  randomArr[0] = leftItemIndex;
  randomArr[1] = middleItemIndex;
  randomArr[2] = rightItemIndex;
}

renderitems();

itemsDivElement.addEventListener("click", itemClick);

function itemClick(event) {
  attemptsCounter++;

  if (attemptsCounter < attemptsNumber) {
    if (event.target.id === "left-item") {
      Item.itemsAll[leftItemIndex].votes++;
      renderitems();
    } else if (event.target.id === "middle-item") {
      Item.itemsAll[middleItemIndex].votes++;
      renderitems();
    } else if (event.target.id === "right-item") {
      Item.itemsAll[rightItemIndex].votes++;
      renderitems();
    } else {
      alert("Please choose one of the three images.");
      attemptsCounter--;
    }
  } else {
    // let list = document.getElementById('results');
    let resultButton = document.createElement("button");
    itemsDivElement.appendChild(resultButton);
    resultButton.textContent = "Results";
    resultButton.addEventListener("click", resultClick);
    itemsDivElement.removeEventListener("click", itemClick);

    let newVotesArr = [];
    let newShownArr = [];

    for (let i = 0; i < Item.itemsAll.length; i++) {
      let totVotes;
      let totshown;

      if (storedVotes.length == 0 && storedshown.length == 0) {
        totVotes = Item.itemsAll[i].votes;
        totshown = Item.itemsAll[i].shown;
      } else {
        totVotes = Item.itemsAll[i].votes + storedVotes[i];
        totshown = Item.itemsAll[i].shown + storedshown[i];
      }
      nameArr.push(Item.itemsAll[i].name);
      shownArr.push(totshown);
      votesArr.push(totVotes);
      newVotesArr.push(Item.itemsAll[i].votes);
      newShownArr.push(Item.itemsAll[i].shown);
    }
    console.log("New Votes", newVotesArr);
    console.log("New Views", newShownArr);
    console.log("Total Votes", votesArr);
    console.log("Total Views", shownArr);

    // console.log(nameArr, shownArr, votesArr);
    storeData();
  }
}

function resultClick() {
  // let list = document.getElementById('results');
  // list.textContent=' ';
  // for (let i = 0; i < Item.itemsAll.length; i++) {
  //     let listItem = document.createElement('li');
  //     list.appendChild(listItem);
  //     listItem.textContent = `${Item.itemsAll[i].name} had ${Item.itemsAll[i].votes} votes, and was seen ${Item.itemsAll[i].shown} times.`

  // }

  showChart();
}

function storeData() {
  for (let o = 0; o < Item.itemsAll.length; o++) {
    let stringArr = JSON.stringify(Item.itemsAll[o]);
    //console.log(stringArr);
    localStorage.setItem(`Item ${o}`, stringArr);
  }
}

function getData() {
  for (let i = 0; i < Item.itemsAll.length; i++) {
    let data = localStorage.getItem(`Item ${i}`);
    // console.log(data);
    let parsedArr = JSON.parse(data);
    // console.log(parsedArr);
    if (parsedArr !== null) {
      storedVotes.push(parsedArr.votes);
      storedshown.push(parsedArr.shown);
    }
  }
}

function showChart() {
  const data = {
    labels: nameArr,
    datasets: [
      {
        label: "Votes",
        data: votesArr,
        backgroundColor: [
          "rgba(255, 99, 132)",
          "rgba(255, 159, 64 )",
          "rgba(255, 205, 86)",
          "rgba(75, 192, 192)",
          "rgba(54, 162, 235)",
          "rgba(153, 102, 255)",
          "rgba(201, 203, 207)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
      {
        label: "Shown",
        data: shownArr,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const config = {
    type: "bar",
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };

  var myChart = new Chart(document.getElementById("myChart"), config);
}

getData();
console.log("Stored Votes", storedVotes);
console.log("Stored Views", storedshown);
