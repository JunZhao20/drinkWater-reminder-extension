// Elements
const infoIcon = document.querySelector(".info");
const hide = document.querySelector(".hide");
const infoOverlay = document.querySelector(".info-overlay");
const infoBox = document.querySelector(".info-box");
const drinkNum = document.querySelector(".drink-num");
const resetBtn = document.querySelector(".resetBtn");
const btn = document.querySelector(".btn");
const inputField = document.querySelector("#field-time");
const time = document.querySelector(".countDown");

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

let updateTimer = function () {
  chrome.storage.local.get(["timer"], (res) => {
    time.textContent = `
    ${timerFormat(Number(hours))}:${timerFormat(res.timer)}:${timerFormat(
      Number(seconds)
    )}
    `;
  });
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
  chrome.storage.local.get(["timer"], (res) => {
    chrome.storage.local.set({
      timer: +inputValue,
    });
  });
});

// Set timer listener and formatting

btn.addEventListener("click", () => {
  hours = inputValue.slice(0, 2);
  minutes = inputValue.slice(3, 5);
  time.textContent = `
  ${timerFormat(Number(hours))}:${timerFormat(Number(minutes))}:${timerFormat(
    Number(seconds)
  )}
  `;
  if (inputValue === inputField.defaultValue) {
    chrome.storage.local.set({
      isRunning: false,
    });
    alert("Please input time");
  } else {
    chrome.storage.local.set({
      isRunning: true,
    });
  }
});

// Reset timer

resetBtn.addEventListener("click", () => {
  chrome.storage.local.set(
    {
      timer: 0,
      isRunning: false,
    },
    () => {
      time.textContent = "00:00:00";
      inputField.value = inputField.defaultValue;
    }
  );
});

////////////////////////////////////////////
updateTimer();
setInterval(updateTimer, 1000);
