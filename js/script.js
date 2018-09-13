'use strict';


var output = document.getElementById('output');
output.innerHTML = 'Click the button!' + '<br><br>' + output.innerHTML;

var result = document.getElementById('result');
result.innerHTML = '<br>' + result.innerHTML;

var wins = 0;
var losses = 0;
var draws = 0;
var rounds = 0;


var winning = document.getElementById('wins');
var losing = document.getElementById('losses');
var drawing = document.getElementById('draws');

document.getElementById("clear").addEventListener("click", clear);


document.getElementById('newGame').addEventListener('click', newGame);

var disabledButtons = function (isDisabled) {
    rockButton.disabled = isDisabled;
    paperButton.disabled = isDisabled;
    scissorsButton.disabled = isDisabled;
};

function newGame() {
    clear();
    rounds = window.prompt('How many wins end the game?');
    if (isNaN(rounds) || rounds === '' || rounds === null || rounds < 1) {
        return result.innerHTML = 'Wrong Value. Try one more time';
    }
    result.insertAdjacentHTML('afterEnd', 'We play to ' + rounds + ' wins' + '<br>');
};

var rockButton = document.getElementById('rock-button'); // variables of a given button
var paperButton = document.getElementById('paper-button');
var scissorsButton = document.getElementById('scissors-button');


function clear() { // clear scores
    disabledButtons(false);
    document.getElementById('wins').innerHTML = "0";
    document.getElementById('draws').innerHTML = "0";
    document.getElementById('losses').innerHTML = "0";
    wins = 0;
    losses = 0;
    draws = 0;
    rounds = 0;
    // zrobić z remove, być może przez to że nie ma spana i że to nie podmienia tylko ciągle dodaje nowe linijki patrz. vitories draws and defeat, zrobić spana na całośc ale aktywować tylko przy clearu mam nadzieje ze zrozumiesz pozniej
    output.innerHTML = 'Click the button!' + '<br><br>' + output.innerHTML;
    result.innerHTML = 'Lets begin' + '<br><br>' + result.innerHTML;
};

var rockButtonClick = rockButton.addEventListener('click', function () {
    var userChoice = 'rock';
    // output.html('').append('<br>' + 'You have chosen ' + userChoice + '<br><br>');
    output.insertAdjacentHTML('afterEnd', '<br>' + 'You have chosen ' + userChoice + '<br><br>');
    playerMove(userChoice);
});
var paperButtonClick = paperButton.addEventListener('click', function () {
    var userChoice = 'paper';
    // output.html('').append('<br>' + 'You have chosen ' + userChoice + '<br><br>');
    output.insertAdjacentHTML('afterEnd', '<br>' + 'You have chosen ' + userChoice + '<br><br>');
    playerMove(userChoice);
});
var scissorsButtonClick = scissorsButton.addEventListener('click', function () {
    var userChoice = 'scissors';
    // output.html('').append('<br>' + 'You have chosen ' + userChoice + '<br><br>');   
    output.insertAdjacentHTML('afterEnd', '<br>' + 'You have chosen ' + userChoice + '<br><br>');
    playerMove(userChoice);
});

var scores = function () {
    if (wins == rounds) {
        result.insertAdjacentHTML('afterEnd', 'YOU WON THE ENTIRE GAME!!!' + '<br>');
        disabledButtons(true);
    } else if (losses == rounds) {
        result.insertAdjacentHTML('afterEnd', 'YOU LOST THE ENTIRE GAME!!!' + '<br>');
        disabledButtons(true);
    }
};


var playerMove = function (userChoice, rounds) {
    compare(userChoice, computerChoice());
    scores();
};

var computerChoice = function () { //computer random choice
    var random = Math.floor(Math.random() * 3) + 1; // returns a random integer from 1 to 3
    if (random === 1) {
        random = 'rock';
    } else if (random === 2) {
        random = 'paper';
    } else {
        random = 'scissors';
    }
    output.insertAdjacentHTML('afterEnd', '<br><br>' + 'Computer choice is ' + random);
    return random;
};

//var results = function(){
var compare = function (choice1, choice2, rounds) {
    if (choice1 === choice2) {
        output.insertAdjacentHTML('afterEnd', 'It is a tie!');
        draws++;
        drawing.textContent = draws;
    } else if (choice1 === 'rock') {
        if (choice2 === 'scissors') {
            // rock wins
            output.insertAdjacentHTML('afterEnd', 'You won: you played ROCK, computer played SCISSORS');
            wins++;
            winning.textContent = wins;
        } else {
            // paper wins
            output.insertAdjacentHTML('afterEnd', 'You lost: you played ROCK, computer played PAPER');
            losses++;
            losing.textContent = losses;
        }
    } else if (choice1 === 'paper') {
        if (choice2 === 'rock') {
            // paper wins
            output.insertAdjacentHTML('afterEnd', 'You won: you played PAPER, computer played ROCK');
            wins++;
            winning.textContent = wins;
        } else {
            // scissors wins
            output.insertAdjacentHTML('afterEnd', 'You lost: you played PAPER, computer played SCISSORS');
            losses++;
            losing.textContent = losses;
        }
    } else if (choice1 === 'scissors') {
        if (choice2 === 'rock') {
            // rock wins
            output.insertAdjacentHTML('afterEnd', 'You lost: you played SCISSORS, computer played ROCK');
            losses++;
            losing.textContent = losses;
        } else {
            // scissors wins
            output.insertAdjacentHTML('afterEnd', 'You won: you played SCISSORS, computer played PAPER');
            wins++;
            winning.textContent = wins;
        }
    }
};