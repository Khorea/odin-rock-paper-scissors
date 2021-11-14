const choices = {
    rock: 0,
    paper: 1,
    scissors: 2,
};

const choiceWord = new Array("Rock", "Paper", "Scissors");

const roundResult = {
    tie: 0,
    playerWins: 1,
    computerWins: 2,
};

let gameState = {
    playerChoices: new Array(),
    computerChoices: new Array(),
    playerScore: 0,
    computerScore: 0,
}

function getCpuChoice() {
    return cpuChoice = Math.floor(Math.random() * 3);
}

function getPlayerChoice(playerChoice) {
    if (playerChoice.toLowerCase() == "rock") {
        return choices.rock;
    }
    else if (playerChoice.toLowerCase() === "paper") {
        return choices.paper;
    }
    else if (playerChoice.toLowerCase() === "scissors") {
        return choices.scissors;
    }
}

function determineRoundWinner(playerChoice, cpuChoice) {
    if (playerChoice === cpuChoice) {
        return roundResult.tie;
    }
    else if (playerChoice === choices.rock) {
        if (cpuChoice === choices.paper) {
            return roundResult.computerWins;
        }
        else if (cpuChoice == choices.scissors) {
            return roundResult.playerWins;
        }
    }
    else if (playerChoice === choices.paper) {
        if (cpuChoice === choices.rock) {
            return roundResult.playerWins;
        }
        else if (cpuChoice === choices.scissors) {
            return roundResult.computerWins;
        }
    }
    else if (playerChoice === choices.scissors) {
        if (cpuChoice === choices.rock) {
            return roundResult.computerWins;
        }
        else if (cpuChoice === choices.paper) {
            return roundResult.playerWins;
        }
    }
    // Input error
    return -1;
}

function resetGameState() {
    gameState.playerChoices = new Array();
    gameState.computerChoices = new Array();
    gameState.playerScore = 0;
    gameState.computerScore = 0;
}

function updateGameState(winner, playerChoice, computerChoice) {
    gameState.playerChoices.push(choiceWord[playerChoice]);
    gameState.computerChoices.push(choiceWord[computerChoice]);
    if (winner === roundResult.playerWins) {
        gameState.playerScore++;
    }
    else if (winner === roundResult.computerWins) {
        gameState.computerScore++;
    }
}

function logGameState(roundWinner, roundNumber) {
    console.group("Round " + roundNumber);
    let computerChoice = gameState.computerChoices[gameState.computerChoices.length - 1];
    let message = "";
    if (roundWinner === roundResult.playerWins) {
        message = `Computer chose ${computerChoice}\nYou win this round!`;
    }
    else if (roundWinner === roundResult.computerWins) {
        message = `Computer chose ${computerChoice}\nYou lose this round!`;
    }
    else {
        message = `Computer chose ${computerChoice}\nIt's a tie!`;
    }
    message = message + `\nCurrent score: Player ${gameState.playerScore} |  Computer ${gameState.computerScore}`;
    console.log(message);
    console.log("Player   choices: " + gameState.playerChoices);
    console.log("Computer choices: " + gameState.computerChoices);
    console.groupEnd("Round " + roundNumber);
}

function updateScoreboard(roundWinner) {
    const scoreboardText = document.querySelector('.scoreboard-text');
    const playerScoreText = document.querySelector('.player-score p');
    const computerScoreText = document.querySelector('.computer-score p');
    const playerChoiceImage = document.querySelector('.player-score img');
    const computerChoiceImage = document.querySelector('.computer-score img');
    playerScoreText.textContent = "Player: " + gameState.playerScore;
    computerScoreText.textContent = "Computer: " + gameState.computerScore;

    if (roundWinner === roundResult.tie) {
        scoreboardText.textContent = "It's a tie!";
    }
    else if (roundWinner === roundResult.playerWins) {
        scoreboardText.textContent = "You win this round!";
    }
    else if (roundWinner === roundResult.computerWins) {
        scoreboardText.textContent = "Computer wins this round!"
    }
    else {
        scoreboardText.textContent = "Make your choice"
        playerChoiceImage.setAttribute('src', 'imgs/rock.png');
        computerChoiceImage.setAttribute('src', 'imgs/rock.png');
        return;
    }

    const pChoice = gameState.playerChoices[gameState.playerChoices.length - 1];
    const cChoice = gameState.computerChoices[gameState.computerChoices.length - 1];

    if (pChoice === 'Rock') {
        playerChoiceImage.setAttribute('src', 'imgs/rock.png');
    }
    else if (pChoice === 'Paper') {
        playerChoiceImage.setAttribute('src', 'imgs/paper.png');
    }
    else {
        playerChoiceImage.setAttribute('src', 'imgs/scissors.png');
    }

    if (cChoice === 'Rock') {
        computerChoiceImage.setAttribute('src', 'imgs/rock.png');
    }
    else if (cChoice === 'Paper') {
        computerChoiceImage.setAttribute('src', 'imgs/paper.png');
    }
    else {
        computerChoiceImage.setAttribute('src', 'imgs/scissors.png');
    }
}

function playRound(playerChoice) {
    playerChoice = getPlayerChoice(playerChoice);
    let cpuChoice = getCpuChoice();
    let roundWinner = determineRoundWinner(playerChoice, cpuChoice);
    updateGameState(roundWinner, playerChoice, cpuChoice);
    updateScoreboard(roundWinner);

    if (gameState.playerScore == 5 || gameState.computerScore == 5) {
        let message = (roundWinner === roundResult.playerWins) ? "Congratulations, you won!" : "Computer won!";
        alert(message);
        resetGameState();
        updateScoreboard(-1);
        console.clear();
    }
}

const buttons = document.querySelectorAll('.choices button');
buttons.forEach((button) => button.addEventListener('click', () => playRound(button.parentElement.className)));