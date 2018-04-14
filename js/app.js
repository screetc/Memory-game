// array for the cards
let card = $(".card");
let cards = [...card]
console.log(cards);
// deck variable for the cards
const deck = document.getElementById("card-deck");
// move variables
let moves = 0;
//counter variable for moves
let counter = document.querySelector(".moves");
// star variable for stars
const stars = $(".fa-star");
// matchedCard variable
let matchedCard = document.getElementsByClassName("match");

let starsList = document.querySelectorAll(".stars");

let modal = document.getElementById("popup")
 // array for opened cards
let openedCards = [];
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
//startGame function when browsers load
window.onload = startGame();
// startGame function to start the game
function startGame() {
//deck of cards is shuffled
  let shuffleCards = shuffle(cards);
  for (let i = 0; i < shuffleCards.length; i++) {
    deck.innerHTML = "";
    [].forEach.call(cards, function(item) {
      deck.appendChild(item);
    });
    cards[i].classList.remove("show", "open", "match", "disabled");
    openedCards = [];
  }
// moves is set to 0
  moves = 0;
  counter.innerHTML = moves;
  for (let i = 0; i < stars.length; i++) {
    stars[i].style.color = "ffd700";
    stars[i].style.visibility = "visible";
  }
//timer is set to 0
  second = 0;
  minute = 0;
  hour = 0;
  let timer = document.querySelector(".timer");
  timer.innerHTML = "0 mins 0 secs";
  clearInterval(interval);
}
// moveCounter function counts the number of moves
function moveCounter() {
  moves++;
  counter.innerHTML = moves;
  if(moves == 1){
    second = 0;
    minute = 0;
    hour = 0;
    startTimer();
  }
// star rating changes depending on the number of moves
  if(moves>9 && moves <14) {
    for (let i = 0; i < 3; i++) {
      if(i>1) {
        stars[i].style.visibility = "collapse";
      }
    }
  }
  else if (moves> 16) {
    for (let i = 0; i < 3; i++) {
      if (i>0) {
        stars[i].style.visibility = "collapse";
      }
    }
  }
}
//timer parameters are set
var second = 0, minute = 0; hour = 0;
var timer = document.querySelector(".timer");
var interval;
function startTimer() {
  interval = setInterval(function() {
    timer.innerHTML = minute + " mins " + second + " secs";
    second++;
    if(second == 60) {
      minute++;
      second = 0;
    }
    if(minute == 60) {
      hour++;
      minute = 0;
    }
  },1000);
}
// toggle between open and show class to display open Cards
let displayCard = function() {
  this.classList.toggle("open");
  this.classList.toggle("show");
  this.classList.toggle("disabled");
};
// cardsFlipped function adds the selected cards to openCards array and checks if the cards are matched or not
function cardFlipped() {
  openedCards.push(this);
  let flips = openedCards.length;
  if(flips === 2 ) {
    moveCounter();
    if(openedCards[0].type === openedCards[1].type) {
      matched();
    } else {
      unmatched();
    }
  }
};
//function for 2 match card
function matched() {
  openedCards[0].classList.add("match", "disabled");
  openedCards[1].classList.add("match", "disabled");
  openedCards[0].classList.remove("show", "open", "no-event");
  openedCards[1].classList.remove("show", "open", "no-event");
  openedCards = [];
}
//function for cards that don't match + time show for that card
function unmatched() {
  openedCards[0].classList.add("unmatched");
  openedCards[1].classList.add("unmatched");
  disabled();
  setTimeout(function() {
  openedCards[0].classList.remove("show", "open", "no-event", "unmatched");
  openedCards[1].classList.remove("show", "open", "no-event", "unmatched");
  enable();
  openedCards = [];
},1000);
}
//cards are disabled temporarily
function disabled() {
  Array.prototype.filter.call(cards, function(card) {
    card.classList.add("disabled");
  });
}
//cards are enabled and matched cards are disabled
function enable() {
  Array.prototype.filter.call(cards, function(card) {
    card.classList.remove("disabled");
    for (let i = 0; i < matchedCard.length; i++) {
      matchedCard[i].classList.add("disabled");
    }
  });
}
//function closeModal is created so the modal can be closed and the game reset
function closeModal() {
  closeicon.addEventListener("click", function() {
    modal.classList.remove("show");
    startGame();
  });
}
// wellDone function is created when all the cards are flipped with the correct pairing
function wellDone() {
  if(matchedCard.length === 16) {
    clearInterval(interval);
    finalTime = timer.innerHTML;
// well done mode is shown
    modal.classList.add("show");
// variable starRate
    let starRate = document.querySelector(".stars").innerHTML;
    document.getElementById("endMove").innerHTML = moves;
    document.getElementById("starRate").innerHTML = starRate;
    document.getElementById("totalTime").innerHTML = finalTime;
    closeModal();
  };
}
// play again function
function playAgain() {
  modal.classList.remove("show");
  startGame();
}
// event listener is looped so each card has an event listener
for (let i = 0; i < cards.length; i++) {
  card = cards[i];
  card.addEventListener("click", displayCard);
  card.addEventListener("click", cardFlipped);
  card.addEventListener("click", wellDone);
};
