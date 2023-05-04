function loadQuestionsRequest() {
  return fetch("questions.json").then(response => response.json());
}
