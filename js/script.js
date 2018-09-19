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
    unhideRockPaperScissorsIcons();
    unhideHowToStartGameText();
    hideWinnerIcon();
    hideLoserIcon();
    hideHowToStartGameAfterOne();
    unhideAnimationHowToStartNewGame();
    rounds = window.prompt('How many wins should end the game?');
    if (isNaN(rounds) || rounds === '' || rounds === null || rounds < 1) {
        disabledButtons(true);
       return result.innerHTML = 'Wrong Value. Try one more time' + '<br>';
    }
    result.innerHTML = ('We play to ' + rounds + ' wins' + '<br>');
    hideHowToStartGameText();
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
rockButton.addEventListener('click', function () {
    var userChoice = 'rock';
    output.innerHTML = ('<br>' + 'You have chosen ' + userChoice + '<br><br>');
    playerMove(userChoice);
});
paperButton.addEventListener('click', function () {
    var userChoice = 'paper';
    output.innerHTML = ('<br>' + 'You have chosen ' + userChoice + '<br><br>');
    playerMove(userChoice);
});
scissorsButton.addEventListener('click', function () {
    var userChoice = 'scissors';
    output.innerHTML = ('<br>' + 'You have chosen ' + userChoice + '<br><br>');
    playerMove(userChoice);
});

//stops the game and disables buttons/icons when the number of wins/losses equals the number of wins/losses limits input by prompt at the beginning of a game
var scores = function () {
    if (wins == rounds) {
        result.innerHTML = ('YOU WON THE ENTIRE GAME!!!' + '<br>');
        disabledButtons(true);
        hideRockPaperScissorsIcons();
        unhideWinnerIcon();
        unhideHowToStartGameAfterOne();
        hideAnimationHowToStartNewGame();
    } else if (losses == rounds) {
        result.innerHTML = ('YOU LOST THE ENTIRE GAME!!!' + '<br>');
        disabledButtons(true);
        hideRockPaperScissorsIcons();
        unhideLoserIcon();
        unhideHowToStartGameAfterOne();
        hideAnimationHowToStartNewGame();
    }
};

//sequence of actions afer userChoice, it triggers the function that compares results between choices of user and computer adn then it checks if the limit of games is equal to wins/losses
var playerMove = function (userChoice) {
    compare(userChoice, computerChoice());
    scores();
    hideHowToStartGameText();
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

//remove display none of Icons
function unhideRockPaperScissorsIcons() {
    var unhideRockPaperScissorsIcons = document.getElementById('buttonAll');
    unhideRockPaperScissorsIcons.classList.remove('displayNone');
};

//add display none of Icons
function hideRockPaperScissorsIcons() {
    var hideRockPaperScissorsIcons = document.getElementById('buttonAll');
    hideRockPaperScissorsIcons.classList.add('displayNone');
}

//remove and add display none of Icon of winning
function unhideWinnerIcon() {
    var unhideWinnerIcon = document.querySelectorAll('#laughWinkSadCry i:first-child');
    unhideWinnerIcon.classList.remove('displayNone');
};

function hideWinnerIcon() {
    var hideWinnerIcon = document.querySelectorAll('#laughWinkSadCry i:first-child');
    hideWinnerIcon.classList.add('displayNone');
};

//remove and add display none of Icon of losing
function unhideLoserIcon() {
    var unhideLoserIcon = document.querySelectorAll('#laughWinkSadCry i:nth-child(2)');
    unhideLoserIcon.classList.remove('displayNone');
};

function hideLoserIcon() {
    var hideLoserIcon = document.querySelectorAll('#laughWinkSadCry i:nth-child(2)');
    hideLoserIcon.classList.add('displayNone');
};

//remove and add display none of Choose text
function unhideHowToStartGameText() {
    var unhideHowToStartGameText = document.querySelector('#chooseText h3');
    unhideHowToStartGameText.classList.remove('displayNone');
};

function hideHowToStartGameText() {
    var hideHowToStartGameText = document.querySelector('#chooseText h3');
    hideHowToStartGameText.classList.add('displayNone');
};

//remove and add display none of Choose text
function unhideHowToStartGameAfterOne() {
    var unhideHowToStartGameAfterOne = document.querySelector('#tryAgain h3');
    unhideHowToStartGameAfterOne.classList.remove('displayNone');
};

function hideHowToStartGameAfterOne() {
    var hideHowToStartGameAfterOne = document.querySelector('#tryAgain h3');
    hideHowToStartGameAfterOne.classList.add('displayNone');
};

//remove and add animation to final result
function unhideAnimationHowToStartNewGame() {
    var unhideAnimationHowToStartNewGame = document.getElementById('result');
    unhideAnimationHowToStartNewGame.classList.remove('flicker-in-1');
};

function hideAnimationHowToStartNewGame() {
    var hideAnimationHowToStartNewGame = document.getElementById('result');
    hideAnimationHowToStartNewGame.classList.add('flicker-in-1');
};