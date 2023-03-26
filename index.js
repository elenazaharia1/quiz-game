// Get the HTML elements

const player1Score = document.getElementById("score-0");
const player2Score = document.getElementById("score-1");
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

var Wrong = new Audio("laser_falling-104772.mp3");
var Corect = new Audio("happy-logoversion-3-13398.mp3");
// Define variables
let currentPlayer = 0;
let currentQuestion = 0;
let scores = [0, 0];

let acceptingAnswers = false;
let questions = [];

// Fetch the trivia questions from a JSON file
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

// Display question and answer options
function displayQuestion() {
  // Get a random question from the questions array
  const questionIndex = Math.floor(Math.random() * questions.length);
  currentQuestion = questions[questionIndex];
  // Display the question
  questionElement.innerText = currentQuestion.question;
  // Remove the question from the questions array
  // questions.splice(questionIndex, 1);
  acceptingAnswers = true;

  displayAnswer();
}
// Display the answer options
function displayAnswer() {
  let optionChoice;
  answerElements.forEach((option) => {
    number = option.dataset["number"];
    option.innerText = currentQuestion["option" + number];
    optionChoice = option;

    // console.log(optionChoice);
  });
}

function Answer(option) {
  answerElements.forEach((option) => {
    option.addEventListener("click", (e) => {
      if (!acceptingAnswers) return;
      checkAnswer(e.target);
    });
  });
}
Answer();

// Check if the selected answer is correct or not
function checkAnswer(selectedOption) {
  acceptingAnswers = false;
  const selectedAnswer = selectedOption.dataset["number"];
  const classToApply =
    selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

  // If the answer is correct, add a point to the current player's score
  if (classToApply === "correct") {
    console.log("bun");

    Corect.play();
    scores[currentPlayer]++;
    document.getElementById(`score-${currentPlayer}`).textContent =
      scores[currentPlayer];
    console.log("point added");
  } else {
    // If the answer is incorrect, switch to the other player's turn
    Wrong.play();
    currentPlayer = currentPlayer === 0 ? 1 : 0;
    document.querySelector("#player1-panel").classList.toggle("active");
    document.querySelector("#player2-panel").classList.toggle("active");
  }

  // Display the selected answer as correct or incorrect
  selectedOption.parentElement.classList.add(classToApply);
  setTimeout(() => {
    selectedOption.parentElement.classList.remove(classToApply);
    currentQuestion++;
    displayQuestion(currentQuestion);
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
  currentPlayer[scores];
  if (scores[0] === scores[1]) {
    console.log("bun");
    winnerText.innerText = "Remiza";
  } else if (scores[0] < scores[1]) {
    console.log("p2Win");
    winnerText.innerText = "Player2 Win";
  } else {
    console.log("p1win");
    winnerText.innerText = "Player1 Win";
  }
}

function endQuiz() {
  restartBtn.addEventListener("click", () => {
    questionContainer.classList.add("hidden");
    window.location.reload();
  });
}
