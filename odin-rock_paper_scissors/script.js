function getComputerChoice() {
    const choices = ["rock", "paper", "scissors"];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function getHumanChoice() {
    const choice = prompt("Enter Rock, Paper, or Scissors:").toLowerCase();
    return choice;
}

let humanScore = 0;
let computerScore = 0;

function playRound(humanChoice, computerChoice) {
    humanChoice = humanChoice.toLowerCase();

    if (humanChoice === computerChoice) {
        console.log(`It's a tie! You both chose ${humanChoice}.`);
        return;
    }

    if (
        (humanChoice === "rock" && computerChoice === "scissors") ||
        (humanChoice === "paper" && computerChoice === "rock") ||
        (humanChoice === "scissors" && computerChoice === "paper")
    ) {
        humanScore++;
        console.log(`You win! ${humanChoice} beats ${computerChoice}.`);
    } else {
        computerScore++;
        console.log(`You lose! ${computerChoice} beats ${humanChoice}.`);
    }
}

function playGame() {
    humanScore = 0;
    computerScore = 0;

    for (let i = 1; i <= 5; i++) {
        const humanSelection = getHumanChoice();
        const computerSelection = getComputerChoice();

        console.log(`\nRound ${i}:`);
        playRound(humanSelection, computerSelection);
        console.log(`Score => You: ${humanScore}, Computer: ${computerScore}`);
    }

    console.log("\nFinal Results:");
    if (humanScore > computerScore) {
        console.log("🎉 You win the game!");
    } else if (computerScore > humanScore) {
        console.log("💻 Computer wins the game!");
    } else {
        console.log("🤝 It's a tie game!");
    }
}

playGame();