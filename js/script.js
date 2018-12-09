'use strict';


var output = document.getElementById('output');
var result = document.getElementById('result');
var playerMoveElements = document.querySelectorAll('.player-move');
var modals = document.querySelectorAll('.modal');
var overlay = document.querySelector('.overlay');
var btnClose = document.querySelector('.close');
var tableBody = document.querySelector('.table-body');


//declaring variables of a scoreboard
var winning = document.getElementById('wins');
var losing = document.getElementById('losses');
var drawing = document.getElementById('draws');

//variables of a given icon
var rockButton = document.getElementById('rock-button');
var paperButton = document.getElementById('paper-button');
var scissorsButton = document.getElementById('scissors-button');

//objects and functions
var params = {
    wins: 0,
    losses: 0,
    draws: 0,
    rounds: 0,
    gamePossible: false,
    progress: [],
    tableRow: [],
    currentRound: 0,
    nthInit: false,
}

//listening to clear and new game buttons
document.getElementById('newGame').addEventListener('click', newGame);
btnClose.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

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
    output.classList.remove('hide');
    output.innerHTML = '';
    result.innerHTML = '';
    params.gamePossible = true;
    params.tableRow = [];
    params.progress = [];
    tableBody.innerHTML = '';
    params.currentRound = 0;
    params.nthInit = true;

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
    if (params.wins == params.rounds) {
        result.innerHTML = ('YOU WON THE ENTIRE GAME!!!' + '<br>');
        disabledButtons(true);
        hideRockPaperScissorsIcons();
        unhideWinnerIcon();
        unhideHowToStartGameAfterOne();
        hideAnimationHowToStartNewGame();
        params.gamePossible = false;
        showEndGameTable();
    } else if (params.losses == params.rounds) {
        result.innerHTML = ('YOU LOST THE ENTIRE GAME!!!' + '<br>');
        disabledButtons(true);
        hideRockPaperScissorsIcons();
        unhideLoserIcon();
        unhideHowToStartGameAfterOne();
        hideAnimationHowToStartNewGame();
        params.gamePossible = false;
        showEndGameTable();
    }
};

// listeners for player moves
for (var i = 0; i < playerMoveElements.length; i++) {
    playerMoveElements[i].addEventListener('click', function () {
      if (params.gamePossible === true) {
        compare(this.getAttribute('data-move'));
      }
    });
  }
// listeners for modal
var buttons = document.querySelectorAll('.buttonIcon');
for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function () {
    if (params.gamePossible === false & params.nthInit == true) {
      //output.classList.add('hide'); // znika pole output
      showModal();
    }
  });
}

function showEndGameTable() {
    for (var i = 0; i < params.progress.length; i++) {
      params.tableRow.push('<tr><td>' + params.progress[i].rounds + '</td><td>' + params.progress[i].plMove + '</td><td>' + params.progress[i].cpMove + '</td><td>' + params.progress[i].roundResult + '</td><td>' + params.progress[i].gameResult + '</td></tr>');
      tableBody.innerHTML += params.tableRow[i];
    }
  }

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
        params.draws++;
        drawing.textContent = params.draws;
        roundResult = '0 : 0';
    } else if (choice1 === 'rock') {
        if (choice2 === 'scissors') {
            // rock wins
            output.innerHTML = ('You won: you played ROCK, computer played SCISSORS');
            params.wins++;
            winning.textContent = params.wins;
            roundResult = '1 : 0';
        } else {
            // paper wins
            output.innerHTML = ('You lost: you played ROCK, computer played PAPER');
            params.losses++;
            losing.textContent = params.losses;
            roundResult = '0 : 1';
        }
    } else if (choice1 === 'paper') {
        if (choice2 === 'rock') {
            // paper wins
            output.innerHTML = ('You won: you played PAPER, computer played ROCK');
            params.wins++;
            winning.textContent = params.wins;
            roundResult = '1 : 0';
        } else {
            // scissors wins
            output.innerHTML = ('You lost: you played PAPER, computer played SCISSORS');
            params.losses++;
            losing.textContent = params.losses;
            roundResult = '0 : 1';
        }
    } else if (choice1 === 'scissors') {
        if (choice2 === 'rock') {
            // rock wins
            output.innerHTML = ('You lost: you played SCISSORS, computer played ROCK');
            params.losses++;
            losing.textContent = params.losses;
            roundResult = '0 : 1';
        } else {
            // scissors wins
            output.innerHTML = ('You won: you played SCISSORS, computer played PAPER');
            params.wins++;
            winning.textContent = params.wins;
            roundResult = '1 : 0';
        }
    }
    params.currentRound++;
    params.progress.push({
        rounds: params.currentRound,
        plMove: userChoice,
        cpMove: random,
        roundResult: roundResult,
        gameResult: params.wins + ' : ' + params.losses
      });
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



// modal

function showModal() {
    overlay.classList.add('show');
    modals[0].classList.add('show');
  };
  
  function closeModal(event) {
    event.stopPropagation();
    overlay.classList.remove('show');
    modals[0].classList.remove('show');
  }
 
  (function delPropagation() {
    for (var i = 0; i < modals.length; i++) {
      modals[i].addEventListener('click', function (event) {
        event.stopPropagation();
      })
    };
  })();