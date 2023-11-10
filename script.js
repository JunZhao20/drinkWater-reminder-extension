// Elements
const infoIcon = document.querySelector(".info");
const hide = document.querySelector(".hide");
const infoOverlay = document.querySelector(".info-overlay");
const infoBox = document.querySelector(".info-box");
const drinkNum = document.querySelector(".drink-num");
const resetBtn = document.querySelector(".resetBtn");
const btn = document.querySelector(".btn");
const inputField = document.querySelector("#field-time");
const timer = document.querySelector(".countDown");

// Variables
var inputValue = inputField.value;
let hours = 0;
let minutes = 0;
let seconds = 0;

// Event Listener

// Info hover listeners
infoIcon.addEventListener("mouseover", () => {
  hide.style.opacity = "1";
  infoOverlay.style.transition = "opacity 0.3s ease";
});

infoIcon.addEventListener("mouseout", () => {
  hide.style.opacity = "0";
});

// Timer input field listener
inputField.addEventListener("input", (e) => {
  inputValue = e.target.value;
});

// Set timer listener
btn.addEventListener("click", () => {
  hours = inputValue.slice(0, 2);
  minutes = inputValue.slice(3, 5);
  console.log(Number(hours), Number(minutes));
  formattedTimer = timer.textContent = `
${timerFormat(Number(hours))}:${timerFormat(Number(minutes))}:${timerFormat(
    Number(seconds)
  )}
`;
});

//Timer

const timerFormat = function (time) {
  return time < 10 ? `0${time}` : time;
};

let formattedTimer = (timer.textContent = `
${timerFormat(Number(hours))}:${timerFormat(Number(minutes))}:${timerFormat(
  Number(seconds)
)}
`);
console.log(...formattedTimer);
