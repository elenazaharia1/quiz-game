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

var Wrong = new Audio("laser_falling-104772.mp3");
var Corect = new Audio("happy-logoversion-3-13398.mp3");
// Define variables
let currentPlayer = 0;
let currentQuestion = 0;
let scores = [0, 0];
let isGameOver = false;
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

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

// Display question and answer options

function displayQuestion() {
  // Shuffle the questions array
  const shuffledQuestions = shuffle(questions);

  // If there are no more questions, end the game
  if (shuffledQuestions.length === 0) {
    isGameOver = true;
    winner();
    return;
  }

  // Get a random question from the shuffled questions array
  const questionIndex = Math.floor(Math.random() * shuffledQuestions.length);
  currentQuestion = shuffledQuestions[questionIndex];

  // Display the question
  questionElement.innerText = currentQuestion.question;

  // Get the index of the current question in the original questions array
  const originalQuestionIndex = questions.indexOf(currentQuestion);

  // Do something with the index, e.g. log it to the console
  console.log(`Index of current question: ${originalQuestionIndex}`);

  // Remove the current question from the original questions array
  questions.splice(originalQuestionIndex, 1);

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
    selectedOption.classList.remove("correct");
    selectedOption.classList.remove("incorrect");
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
}

function restartGame() {
  window.location.reload();
}
restartBtn.addEventListener("click", () => {
  restartGame();
});
