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

////////////////////////////////////////////

// Variables
let inputValue = inputField.value;
let hours = 0;
let minutes = 0;
let seconds = 0;
let timerStopped = false;

////////////////////////////////////////////

// Functions

//Timer formatting
const timerFormat = function (time) {
  return time < 10 ? `0${time}` : time;
};

// timer
let startTimer = function (timerInput) {
  let countDown = setInterval(() => {
    console.log(timerInput--);
  }, timerInput);
};

////////////////////////////////////////////

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

// Set timer listener and formatting
btn.addEventListener("click", () => {
  hours = inputValue.slice(0, 2);
  minutes = inputValue.slice(3, 5);
  timer.textContent = `
${timerFormat(Number(hours))}:${timerFormat(Number(minutes))}:${timerFormat(
    Number(seconds)
  )}
`;
  // // Start timer
  // if (minutes !== 0 || minutes !== "0") {
  //   // Grabs seconds for minutes
  //   minutes = minutes * 100;
  // }
  // if (hours !== 0 || hours !== "0") {
  //   // Grabs seconds from hours
  //   hours = hours * 1000;
  // }
  // const totalTine = minutes + hours;
  // startTimer(totalTine);
});

// Reset timer

resetBtn.addEventListener("click", () => {
  timer.textContent = "00:00:00";
  inputField.value = inputField.defaultValue;
});

////////////////////////////////////////////
