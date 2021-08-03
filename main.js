import { getApplicationDiv } from "./lib.js";
import { getHelpText, validateTriangle } from "./validation.js";
import { isTriangle } from "./geometry.js";
import { getAnswerPhrase } from "./output.js";

const sides = [
  { sideName: "a", sideLength: 300 },
  { sideName: "b", sideLength: 400 },
  { sideName: "c", sideLength: 500 },
];

const lowerBound = 0;
const upperBound = 1000;

function renderErrorScreen(messages, helpText) {
  const fragment = new DocumentFragment();

  const errorListElement = document.createElement("ul");

  messages.forEach((message) => {
    const messageItem = document.createElement("li");
    messageItem.innerHTML = message;

    errorListElement.append(messageItem);
  });

  const helpTextElement = document.createElement("p");
  helpTextElement.innerHTML = helpText;

  fragment.append(errorListElement);
  fragment.append(helpTextElement);

  return fragment;
}

function renderAnswerScreen(answerPhrase, answer) {
  const answerElement = document.createElement("p");
  answerElement.innerHTML = answerPhrase;
  answerElement.style.color = answer ? "green" : "red";

  return answerElement;
}

function render(appRoot) {
  const validationResult = validateTriangle(sides, lowerBound, upperBound);

  if (!validationResult.isValid) {
    appRoot.append(
      renderErrorScreen(
        validationResult.errorMessages,
        getHelpText(lowerBound, upperBound)
      )
    );

    return;
  }

  const answer = isTriangle(sides);

  appRoot.append(renderAnswerScreen(getAnswerPhrase(sides, answer), answer));
}

function main() {
  const appDiv = getApplicationDiv("#app");

  if (appDiv !== null) {
    let p = prompt("Введите сторону А");

    console.log(p);

    render(appDiv);
  } else {
    console.log("App div not found");
  }
}

export { main };