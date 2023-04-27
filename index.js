const player1Score = $("#score-0");
const player2Score = $("#score-1");
const player1Panel = $("#player1-panel");
const player2Panel = $("#player2-panel");
const questionContainer = $("#question-container");
const questionElement = $("#question");
const answerOptions = $(".answer-options");
const answerElements = $$(".answer-option");
const nextQuestionButton = $("#next-question-btn");
const restartBtn = $("#reset-btn");
const newGame = $("#StartGame-btn");
const winnerText = $("#winnerText");
const panels = $(".panels");

function $(selector) {
  return document.querySelector(selector);
}

function $$(selector) {
  return document.querySelectorAll(selector);
}

// Define variables
let currentPlayer = 0;
let scores = [0, 0];
let isGameOver = false;
let acceptingAnswers = false;
let questions, removeQuestions, currentQuestion;

let AudioStart = new Audio("songs/french-jazz-music-142911.mp3");
let correctAnswer = new Audio("songs/open-new-level-143027.mp3");
let wrongAnswer = new Audio("songs/buzzer-or-wrong-answer-20582.mp3");
// Fetch the trivia questions from a JSON file

function loadQuestion() {
  fetch("questions.json")
    .then(response => {
      if (!response.ok) {
        throw new Error("problem ");
      }
      return response.json();
    })
    .then(data => {
      questions = data;
      startGame();
      console.log(questions);
    });
}

function startGame() {
  questionContainer.classList.add("hidden");

  newGame.addEventListener("click", () => {
    // AudioStart.play();
    panels.style.display = "flex";
    questionContainer.classList.remove("hidden");

    newGame.classList.add("hidden");

    nextQuestionButton.classList.remove("hidden");

    restartBtn.classList.remove("hidden");

    displayQuestion();
    restartGame();
    nextBtnAndRestartBtn();
  });
}

function displayQuestion() {
  acceptingAnswers = true;

  // Get a random question from the questions array
  currentQuestion = questions[Math.floor(Math.random() * questions.length)];

  // Display the question
  questionElement.innerText = currentQuestion.question;

  removeQuestions = questions.indexOf(currentQuestion);

  displayAnswer();

  console.log(questions);
}

// Display the answer options
function displayAnswer() {
  let number;
  answerElements.forEach(option => {
    number = option.dataset["number"];

    option.innerText = currentQuestion["option" + number];
    // console.log(number);
    option.addEventListener("click", e => {
      if (!acceptingAnswers) return;
      checkAnswer(e.target);
    });
  });
}

function checkAnswer(selectedOption) {
  acceptingAnswers = false;

  const selectedAnswer = selectedOption.dataset["number"];

  console.info(selectedAnswer);
  const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

  // If the answer is correct, add a point to the current player's score
  if (classToApply === "correct") {
    scores[currentPlayer]++;
    correctAnswer.play();
    document.getElementById(`score-${currentPlayer}`).textContent = scores[currentPlayer];

    // Remove the question from the questions array

    questions.splice(removeQuestions, 1);
    console.log("point added");
  } else {
    // If the answer is incorrect, switch to the other player's turn
    wrongAnswer.play();
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
  }, 3000);
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
    winnerText.innerText = "🤝It's a tie!🤝";
  } else if (scores[0] > scores[1]) {
    winnerText.innerText = " 🥇Player 1 Wins!🥇";
  } else {
    winnerText.innerText = "🥇Player 2 Wins!🥇";
  }
  questionContainer.classList.add("hidden");
  nextQuestionButton.classList.add("hidden");
}

function restartGame() {
  restartBtn.addEventListener("click", () => {
    window.location.reload();
  });
}

loadQuestion();
