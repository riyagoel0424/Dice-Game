// variables define
var activePlayer;
var scores;
var roundScore;

init(); //init function for initialisation

//Roll dice button
document.querySelector(".roll-dice-button").addEventListener("click", () => {
  if (gamePlaying) {
    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;

    document.getElementById("dice-1").style.display = "block";
    document.getElementById("dice-2").style.display = "block";

    document.getElementById("dice-1").src = "dice-" + dice1 + ".png";
    document.getElementById("dice-2").src = "dice-" + dice2 + ".png";

    if (dice1 !== 1 && dice2 !== 1) {
      roundScore += dice1 + dice2;
      document.querySelector("#current-score-" + activePlayer).textContent =
        roundScore;
    } else {
      nextPlayer();
    }
  }
});

//Hold button

document.querySelector(".hold-button").addEventListener("click", () => {
  if (gamePlaying) {
    scores[activePlayer] = scores[activePlayer] + roundScore;
    document.querySelector("#total-score-" + activePlayer).textContent =
      scores[activePlayer];
    var input = document.querySelector("#target-score").value;
    var winningScore;
    if (input) {
      winningScore = input;
    } else {
      winningScore = 100;
    }
    if (scores[activePlayer] >= winningScore) {
      document.getElementById("player-name-" + activePlayer).textContent =
        "WINNER!";
      document.getElementById("dice-1").style.display = "none";
      document.getElementById("dice-2").style.display = "none";
      document
        .querySelector(".player-box-" + activePlayer)
        .classList.add("winner");
      document
        .querySelector(".player-box-" + activePlayer)
        .classList.remove("active");
      gamePlaying = false;
    } else {
      nextPlayer();
    }
  }
});

// nextPlayer function
function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  document.getElementById("current-score-0").textContent = "0";
  document.getElementById("current-score-1").textContent = "0";

  document.querySelector(".player-box-0").classList.toggle("active");
  document.querySelector(".player-box-1").classList.toggle("active");

  document.getElementById("dice-1").style.display = "none";
  document.getElementById("dice-2").style.display = "none";
}

// New game button
document.querySelector(".new-button").addEventListener("click", init);

function init() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  //initially both the dices will be hidden
  document.getElementById("dice-1").style.display = "none";
  document.getElementById("dice-2").style.display = "none";

  // Initially total scores will be 0 for both the players
  document.getElementById("total-score-0").textContent = "0";
  document.getElementById("total-score-1").textContent = "0";
  // Initially current scores will be 0 for both the players
  document.getElementById("current-score-0").textContent = "0";
  document.getElementById("current-score-1").textContent = "0";
  document.getElementById("player-name-0").textContent = "PLAYER 1";
  document.getElementById("player-name-1").textContent = "PLAYER 2";

  document.querySelector(".player-box-0").classList.remove("winner");
  document.querySelector(".player-box-1").classList.remove("winner");
  document.querySelector(".player-box-0").classList.remove("active");
  document.querySelector(".player-box-1").classList.remove("active");
  document.querySelector(".player-box-0").classList.add("active");

  //Input field will be empty initially
  document.querySelector("#target-score").value = " ";
  gamePlaying = true;
}
