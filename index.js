// Define variables

let currentPlayer = 0;
let scores = [0, 0];
let isGameOver = false;
let acceptingAnswers = false;
let questions, removeQuestions, currentQuestion;

function $(selector) {
  return document.querySelector(selector);
}

function $$(selector) {
  return document.querySelectorAll(selector);
}

// Fetch the trivia questions from a JSON file

function loadQuestion() {
  loadQuestionsRequest().then(data => {
    questions = data;
    startGame();
    console.log(questions);
  });
}

function startGame() {
  $("#question-container").classList.add("hidden");

  $("#StartGame-btn").addEventListener("click", () => {
    $(".panels").style.display = "flex";

    $("#question-container").classList.remove("hidden");

    $("#StartGame-btn").classList.add("hidden");

    $("#next-question-btn").classList.remove("hidden");

    $("#reset-btn").classList.remove("hidden");

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
  $("#question").innerText = currentQuestion.question;

  removeQuestions = questions.indexOf(currentQuestion);

  displayAnswer();

  console.log(questions);
}

// Display the answer options
function displayAnswer() {
  $$(".answer-option").forEach(option => {
    let number = option.dataset["number"];

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

  let correctAnswer = new Audio("songs/open-new-level-143027.mp3");
  let wrongAnswer = new Audio("songs/buzzer-or-wrong-answer-20582.mp3");

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

    $("#player2-panel").classList.toggle("active");
    $("#player1-panel").classList.toggle("active");
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
  $("#next-question-btn").addEventListener("click", () => {
    if (questions.length === 0) {
      $("#next-question-btn").classList.add("hidden");
    } else {
      displayQuestion();
    }
  });
}

function winner() {
  const winnerText = $("#winnerText");

  if (scores[0] === scores[1]) {
    winnerText.innerText = "🤝It's a tie!🤝";
  } else if (scores[0] > scores[1]) {
    winnerText.innerText = " 🥇Player 1 Wins!🥇";
  } else {
    winnerText.innerText = "🥇Player 2 Wins!🥇";
  }
  $("#question-container").classList.add("hidden");
  $("#next-question-btn").classList.add("hidden");
}

function restartGame() {
  $("#reset-btn").addEventListener("click", () => {
    window.location.reload();
  });
}
loadQuestion();
