'use strict';


var output = document.getElementById('output');
var result = document.getElementById('result');
var tbody = document.querySelector('tbody');

var params = {
    wins: 0,
    losses: 0,
    draws: 0,
    rounds: 0,
    tableRow: [],
    results: []
}



//declaring variables of a scoreboard
var winning = document.getElementById('wins');
var losing = document.getElementById('losses');
var drawing = document.getElementById('draws');

//variables of a given icon
var rockButton = document.getElementById('rock-button');
var paperButton = document.getElementById('paper-button');
var scissorsButton = document.getElementById('scissors-button');
var buttons = document.querySelectorAll('.buttonMove');

for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function () {
/*         console.log(buttons[i]);
        console.log(this); */
        var userChoice = this.getAttribute('data-move');
        output.innerHTML = ('<br>' + 'You have chosen ' + userChoice + '<br><br>');
        playerMove(userChoice);
    });
}

//listening to clear and new game buttons
//document.getElementById("clear").addEventListener("click", clear);
document.getElementById('newGame').addEventListener('click', newGame);

//disabling icons
var disabledButtons = function (isDisabled) {
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].disabled = isDisabled;
    }
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
    params.rounds = window.prompt('How many wins should end the game?');
    if (isNaN(params.rounds) || params.rounds === '' || params.rounds === null || params.rounds < 1) {
        disabledButtons(true);
       return result.innerHTML = 'Wrong Value. Try one more time' + '<br>';
    }
    result.innerHTML = ('We play to ' + params.rounds + ' wins' + '<br>');
    hideHowToStartGameText();
};

// clear scores
function clear() {
    disabledButtons(false);
    document.getElementById('wins').innerHTML = "0";
    document.getElementById('draws').innerHTML = "0";
    document.getElementById('losses').innerHTML = "0";
    params.wins = 0;
    params.losses = 0;
    params.draws = 0;
    params.rounds = 0;
    output.innerHTML = '';
    result.innerHTML = '';
    params.results = [];
    params.tableRow = [];
    tbody.innerHTML = '';
};


//stops the game and disables buttons/icons when the number of wins/losses equals the number of wins/losses limits input by prompt at the beginning of a game
var scores = function () {
    if (params.wins == params.rounds) {
        result.innerHTML = ('YOU WON THE ENTIRE GAME!!!' + '<br>');
        unhideWinnerIcon();
    } else if (params.losses == params.rounds) {
        result.innerHTML = ('YOU LOST THE ENTIRE GAME!!!' + '<br>');
        unhideLoserIcon();
    }
    
    if (params.wins == params.rounds || params.losses == params.rounds) {
        disabledButtons(true);
        hideRockPaperScissorsIcons();
        unhideHowToStartGameAfterOne();
        hideAnimationHowToStartNewGame();
        showModal(event);
        tableScore();
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
    var arr = ['rock', 'paper', 'scissors'];
    random = arr[random-1];
    output.innerHTML = ('<br><br>' + 'Computer choice is ' + random);
    return random;
};

//compares results between choices of user and computer
var compare = function (choice1, choice2) {
   var winner;
    
    if (choice1 === choice2) {
        output.innerHTML = ('It is a tie!');
        params.draws++;
        drawing.textContent = params.draws;
        winner = 'tie';
    } else if (choice1 === 'rock' && choice2 === 'scissors' || choice1 === 'paper' && choice2 === 'rock' || choice1 === 'scissors' && choice2 === 'paper') {
        output.innerHTML = ('You won: you played ' + choice1 + ' computer played ' + choice2);
        params.wins++;
        winning.textContent = params.wins;
        winner = 'user';
    } else if (choice1 === 'rock' && choice2 === 'paper' || choice1 === 'paper' && choice2 === 'scissors' || choice1 === 'scissors' && choice2 === 'rock'){
        output.innerHTML = ('You lost: you played ' + choice1 + ' computer played ' + choice2);
        params.losses++;
        losing.textContent = params.losses;
        winner = 'computer';
    }
    params.results.push({
        player: choice1,
        computer: choice2,
        winner: winner,
        gameResult: params.wins + ' : ' + params.losses
    })
};

//modal to show a table score

var showModal = function(event){
    event.preventDefault();
    var modals = document.querySelectorAll('.modal1');
    for (i=0; i < modals.length; i++ ) {
        modals[i].classList.remove('show');
    }
    
    document.querySelector('#modal-overlay1').classList.add('show');
    document.querySelector('.modal1').classList.add('show');
    
    };


var hideModal = function(event){
    event.preventDefault();
    document.querySelector('#modal-overlay1').classList.remove('show');
};

var closeButtons = document.querySelectorAll('.modal1 .close1');

for(var i = 0; i < closeButtons.length; i++){
    closeButtons[i].addEventListener('click', hideModal);
}

document.querySelector('#modal-overlay1').addEventListener('click', hideModal);

var modals = document.querySelectorAll('.modal1');
for(var i = 0; i < modals.length; i++){
    modals[i].addEventListener('click', function(event){
        event.stopPropagation();
    });
}


//table score
function tableScore(){
    for (var i = 0; i < params.results.length; i++) {
        var roundNumber = i + 1;
        params.tableRow.push('<tr><td>' + roundNumber + '</td><td>' + params.results[i].player + '</td><td>' + params.results[i].computer + '</td><td>' + params.results[i].winner + '</td><td>' + params.results[i].gameResult + '</td></tr>');
        tbody.innerHTML += params.tableRow[i];
    }
}



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
    unhideWinnerIcon[0].classList.remove('displayNone');
};

function hideWinnerIcon() {
    var hideWinnerIcon = document.querySelectorAll('#laughWinkSadCry i:first-child');
    hideWinnerIcon[0].classList.add('displayNone');
};

//remove and add display none of Icon of losing
function unhideLoserIcon() {
    var unhideLoserIcon = document.querySelectorAll('#laughWinkSadCry i:nth-child(2)');
    unhideLoserIcon[0].classList.remove('displayNone');
};

function hideLoserIcon() {
    var hideLoserIcon = document.querySelectorAll('#laughWinkSadCry i:nth-child(2)');
    hideLoserIcon[0].classList.add('displayNone');
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