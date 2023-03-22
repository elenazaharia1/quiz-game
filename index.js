// Get the HTML elements
const player1Panel = document.getElementById("player1-panel");
const player2Panel = document.getElementById("player2-panel");
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

// Define variables
let currentPlayer = 0;
let currentQuestion = 0;
let scores = [0, 0];

let acceptingAnswers = false;
let isGameOver = false;
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
    displayQuestion();
    console.log(data);
  })
  .catch((error) => {
    console.error(" problem ", error);
  });
function startGame() {
  displayQuestion();

  checkAnswer(selectedOption);
}

// Display question and answer options
function displayQuestion() {
  // Get a random question from the questions array
  const questionIndex = Math.floor(Math.random() * questions.length);
  currentQuestion = questions[questionIndex];
  // Display the question
  questionElement.innerText = currentQuestion.question;

  // Display the answer options
  answerElements.forEach((option) => {
    const number = option.dataset["number"];
    option.innerText = currentQuestion["option" + number];
  });

  // Remove the question from the questions array
  questions.splice(questionIndex, 1);
  acceptingAnswers = true;
}

// Check if the selected answer is correct or not
function checkAnswer(selectedOption) {
  acceptingAnswers = false;
  const selectedAnswer = selectedOption.dataset["number"];
  const classToApply =
    selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

  // If the answer is correct, add a point to the current player's score
  if (classToApply === "correct") {
    console.log("bun");
    scores[currentPlayer]++;
    document.getElementById(`score-${currentPlayer}`).textContent =
      scores[currentPlayer];
    console.log("point added");
  } else {
    // If the answer is incorrect, switch to the other player's turn
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
  }, 1000);
}

// Event listener for answer option buttons

answerElements.forEach((option) => {
  option.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;
    checkAnswer(e.target);
  });
});

// Event listener for Next Question button
nextQuestionButton.addEventListener("click", () => {
  if (questions.length === 0) {
    // If there are no more questions left, end the game
    console.log("Game Over");
    nextQuestionButton.classList.add("hidden");
    restartBtn.classList.remove("hidden");
    questionContainer.classList.add("hidden");

    isGameOver = true;
  } else {
    displayQuestion();
  }
});

restartBtn.addEventListener("click", () => {
  window.location.reload();
});
