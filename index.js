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
    displayQuestion();
    console.log(data);
  })
  .catch((error) => {
    console.error(" problem ", error);
  });

// punem intrebarile si raspunsurile pe pagina
function displayQuestion() {
  //aduce intrebarile si pe punem pe pagina
  const QuestionIndex = Math.floor(Math.random() * questions.length);
  currentQuestion = questions[QuestionIndex];
  // console.log(currentQuestion);
  questionElement.innerText = currentQuestion.question;

  answerElements.forEach((option) => {
    const number = option.dataset["number"];
    option.innerText = currentQuestion["option" + number];
  });

  questions.splice(QuestionIndex, 1);
  acceptingAnswers = true;
}

answerElements.forEach((option) => {
  option.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedOption = e.target;
    const selectedAnswer = selectedOption.dataset["number"];
    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      console.log("bun");
    } else {
      currentPlayer = currentPlayer === 0 ? 1 : 0;
      document.querySelector("#player1-panel").classList.toggle("active");
      document.querySelector("#player2-panel").classList.toggle("active");
    }

    selectedOption.parentElement.classList.add(classToApply);
    setTimeout(() => {
      selectedOption.parentElement.classList.remove(classToApply);
      displayQuestion();
    }, 1000);
  });
});
