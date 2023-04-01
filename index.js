const player1Score = document.getElementById("score-0");
const player2Score = document.getElementById("score-1");
const player1Panel = document.getElementById("player1-panel");
const player2Panel = document.getElementById("player2-panel");
const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerOptions = document.getElementById("answer-options");
const answerElements = Array.from(
  document.getElementsByClassName("answer-option")
);
const nextQuestionButton = document.getElementById("next-question-btn");
const restartBtn = document.getElementById("reset-btn");
const newGame = document.getElementById("StartGame-btn");
const winnerText = document.getElementById("winnerText");

// Define variables
let currentPlayer = 0;
let currentQuestion = 0;
let scores = [0, 0];
let isGameOver = false;
let acceptingAnswers = false;
let questions = [];
let removeQuestions = [];
let Wrong = new Audio("laser_falling-104772.mp3");
let Corect = new Audio("happy-logoversion-3-13398.mp3");
// Fetch the trivia questions from a JSON file

function loadQuestion() {
  fetch("questions.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("problem ");
      }
      return response.json();
    })
    .then((data) => {
      questions = data;
      startGame();
      console.log(data);
    })
    .catch((error) => {
      console.error(" problem ", error);
    });
}

function startGame() {
  questionContainer.classList.add("hidden");

  newGame.addEventListener("click", () => {
    questionContainer.classList.remove("hidden");

    newGame.classList.add("hidden");

    nextQuestionButton.classList.remove("hidden");

    restartBtn.classList.remove("hidden");

    displayQuestion();

    nextBtnAndRestartBtn();
  });
}

function displayQuestion() {
  // Get a random question from the questions array
  const questionIndex = questions[Math.floor(Math.random() * questions.length)];
  currentQuestion = questionIndex;
  // Display the question
  questionElement.innerText = currentQuestion.question;

  removeQuestions = questions.indexOf(questionIndex);

  console.log(questions);
  acceptingAnswers = true;

  displayAnswer();
}

// Display question and answer options

// Display the answer options
function displayAnswer() {
  answerElements.forEach((option) => {
    number = option.dataset["number"];
    option.innerText = currentQuestion["option" + number];

    option.addEventListener("click", (e) => {
      if (!acceptingAnswers) return;
      checkAnswer(e.target);
    });
  });
}

function checkAnswer(selectedOption) {
  acceptingAnswers = false;
  const selectedAnswer = selectedOption.dataset["number"];
  const classToApply =
    selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

  // If the answer is correct, add a point to the current player's score
  if (classToApply === "correct") {
    Corect.play();
    scores[currentPlayer]++;

    document.getElementById(`score-${currentPlayer}`).textContent =
      scores[currentPlayer];

    // Remove the question from the questions array

    questions.splice(removeQuestions, 1);
    console.log("point added");
  } else {
    // If the answer is incorrect, switch to the other player's turn
    Wrong.play();
    currentPlayer = currentPlayer === 0 ? 1 : 0;
    player2Panel.classList.toggle("active");
    player1Panel.classList.toggle("active");
  }
  selectedOption.classList.add(classToApply); // add color of answer

  // If there are no more questions, end the game
  if (questions.length === 0) {
    isGameOver = true;
    winner();
    return;
  }

  // Otherwise, display the next question after a delay
  setTimeout(() => {
    displayQuestion();
    selectedOption.classList.remove(classToApply);
  }, 5000);
}

function nextBtnAndRestartBtn() {
  nextQuestionButton.addEventListener("click", () => {
    if (questions.length === 0) {
      nextQuestionButton.classList.add("hidden");
    } else {
      displayQuestion();
    }
  });
}

function winner() {
  if (scores[0] === scores[1]) {
    winnerText.innerText = "It's a tie!";
  } else if (scores[0] > scores[1]) {
    winnerText.innerText = "Player 1 Wins!";
  } else {
    winnerText.innerText = "Player 2 Wins!";
  }
  questionContainer.classList.add("hidden");
  nextQuestionButton.classList.add("hidden");
}

function restartGame() {
  window.location.reload();
}
restartBtn.addEventListener("click", () => {
  restartGame();
});

loadQuestion();
