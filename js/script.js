'use strict';


var output = document.getElementById('output');
var result = document.getElementById('result');

var wins = 0;
var losses = 0;
var draws = 0;
var rounds = 0;

//declaring variables of a scoreboard
var winning = document.getElementById('wins');
var losing = document.getElementById('losses');
var drawing = document.getElementById('draws');

//variables of a given icon
var rockButton = document.getElementById('rock-button');
var paperButton = document.getElementById('paper-button');
var scissorsButton = document.getElementById('scissors-button');

//listening to clear and new game buttons
//document.getElementById("clear").addEventListener("click", clear);
document.getElementById('newGame').addEventListener('click', newGame);

//disabling icons
var disabledButtons = function (isDisabled) {
    rockButton.disabled = isDisabled;
    paperButton.disabled = isDisabled;
    scissorsButton.disabled = isDisabled;
};

//buttons disabled before the beginning of a game
disabledButtons(true);

//starting a new game
function newGame() {
    clear();
    rounds = window.prompt('How many wins end the game?');
    if (isNaN(rounds) || rounds === '' || rounds === null || rounds < 1) {
        return result.innerHTML = 'Wrong Value. Try one more time' + '<br>';
    }
    result.innerHTML = ('We play to ' + rounds + ' wins' + '<br>');
};

// clear scores
function clear() {
    disabledButtons(false);
    document.getElementById('wins').innerHTML = "0";
    document.getElementById('draws').innerHTML = "0";
    document.getElementById('losses').innerHTML = "0";
    wins = 0;
    losses = 0;
    draws = 0;
    rounds = 0;
    output.innerHTML = '';
    result.innerHTML = '';
    // zrobić z remove, być może przez to że nie ma spana i że to nie podmienia tylko ciągle dodaje nowe linijki patrz. vitories draws and defeat, zrobić spana na całośc ale aktywować tylko przy clearu mam nadzieje ze zrozumiesz pozniej
};

//listening to rock-paper-scissors buttons/icons when being clicked/chosen
var rockButtonClick = rockButton.addEventListener('click', function () {
    var userChoice = 'rock';
    output.innerHTML = ('<br>' + 'You have chosen ' + userChoice + '<br><br>');
    playerMove(userChoice);
});
var paperButtonClick = paperButton.addEventListener('click', function () {
    var userChoice = 'paper';
    output.innerHTML = ('<br>' + 'You have chosen ' + userChoice + '<br><br>');
    playerMove(userChoice);
});
var scissorsButtonClick = scissorsButton.addEventListener('click', function () {
    var userChoice = 'scissors';
    output.innerHTML = ('<br>' + 'You have chosen ' + userChoice + '<br><br>');
    playerMove(userChoice);
});

//stops the game and disables buttons/icons when the number of wins/losses equals the number of wins/losses limits input by prompt at the beginning of a game
var scores = function () {
    if (wins == rounds) {
        result.innerHTML = ('YOU WON THE ENTIRE GAME!!!' + '<br>');
        disabledButtons(true);
    } else if (losses == rounds) {
        result.innerHTML = ('YOU LOST THE ENTIRE GAME!!!' + '<br>');
        disabledButtons(true);
    }
};

//sequence of actions afer userChoice, it triggers the function that compares results between choices of user and computer adn then it checks if the limit of games is equal to wins/losses
var playerMove = function (userChoice) {
    compare(userChoice, computerChoice());
    scores();
};

//computer random choice
var computerChoice = function () { 
    var random = Math.floor(Math.random() * 3) + 1; // returns a random integer from 1 to 3
    if (random === 1) {
        random = 'rock';
    } else if (random === 2) {
        random = 'paper';
    } else {
        random = 'scissors';
    }
    output.innerHTML = ('<br><br>' + 'Computer choice is ' + random);
    return random;
};

//compares results between choices of user and computer
var compare = function (choice1, choice2, rounds) {
    if (choice1 === choice2) {
        output.innerHTML = ('It is a tie!');
        draws++;
        drawing.textContent = draws;
    } else if (choice1 === 'rock') {
        if (choice2 === 'scissors') {
            // rock wins
            output.innerHTML = ('You won: you played ROCK, computer played SCISSORS');
            wins++;
            winning.textContent = wins;
        } else {
            // paper wins
            output.innerHTML = ('You lost: you played ROCK, computer played PAPER');
            losses++;
            losing.textContent = losses;
        }
    } else if (choice1 === 'paper') {
        if (choice2 === 'rock') {
            // paper wins
            output.innerHTML = ('You won: you played PAPER, computer played ROCK');
            wins++;
            winning.textContent = wins;
        } else {
            // scissors wins
            output.innerHTML = ('You lost: you played PAPER, computer played SCISSORS');
            losses++;
            losing.textContent = losses;
        }
    } else if (choice1 === 'scissors') {
        if (choice2 === 'rock') {
            // rock wins
            output.innerHTML = ('You lost: you played SCISSORS, computer played ROCK');
            losses++;
            losing.textContent = losses;
        } else {
            // scissors wins
            output.innerHTML = ('You won: you played SCISSORS, computer played PAPER');
            wins++;
            winning.textContent = wins;
        }
    }
};