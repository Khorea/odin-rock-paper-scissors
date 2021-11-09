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

const gameResult = {
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

function getPlayerChoice() {
    let playerChoice = -1;
    while (playerChoice === -1) {
        playerChoice = window.prompt("Rock, Paper or Scissors?")
        if (playerChoice.toLowerCase() == "rock") {
            playerChoice = choices.rock;
        }
        else if (playerChoice.toLowerCase() === "paper") {
            playerChoice = choices.paper;
        }
        else if (playerChoice.toLowerCase() === "scissors") {
            playerChoice = choices.scissors;
        }
        else {
            window.alert("Invalid choice!\nPlease choose between rock paper and scissors.")
            playerChoice = -1;
        }
    }
    return playerChoice;
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

function playRound() {
    let playerChoice = getPlayerChoice();
    let cpuChoice = getCpuChoice();
    let roundWinner = determineRoundWinner(playerChoice, cpuChoice);
    updateGameState(roundWinner, playerChoice, cpuChoice)
    return roundWinner;
}

function playGame(rounds = 5) {
    if (rounds % 2 === 0) {
        console.log("Number of rounds must be odd number!")
        return -1;
    }
    let playerScore = 0;
    let cpuScore = 0;
    for (i = 0; i < rounds; i++) {
        tie = true;
        while (tie)
        {
            let roundWinner = playRound();
            logGameState(roundWinner, i + 1);
            if (roundWinner != roundResult.tie) {
                tie = false;
            }
        }
        if ((playerScore > Math.floor(rounds / 2)) || (cpuScore > Math.floor(rounds / 2))) {
            break;
        }
    }

    let gameWinner = (playerScore > cpuScore) ? gameResult.playerWins : gameResult.computerWins;
    return gameWinner;
}

let play = true;
while (play)
{
    let gameWinner = playGame(1);
    let message = (gameWinner === gameResult.playerWins) ? "Congratulations, you won!" : "Computer won!";
    message = message.concat("\nDo you wish to play again?(y/n)");
    let playAgain = window.prompt(message);
    if (playAgain != "y") {
        play = false;
    }
    else {
        resetGameState();
        console.clear();
    }
}