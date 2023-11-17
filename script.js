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
const overlayAlert = document.getElementById("overlay-alert");
const customAlert = document.getElementById("custom-alert");
const alertCloseBtn = document.querySelector(".alert-close-btn");

////////////////////////////////////////////

// Variables
let inputValue = inputField.value;
let hours = 0;
let minutes = 0;
let seconds = 0;
let timerStopped = false;
let reset = false;
////////////////////////////////////////////

// Functions

//Timer formatting
const timerFormat = function (time) {
  return time < 10 ? `0${time}` : time;
};

let updateTimer = function () {
  chrome.storage.local.get(["timer"], (res) => {
    hours = inputValue.slice(0, 2);
    minutes = inputValue.slice(3, 5);
    minutes = Number(minutes) - Math.ceil(res.timer / 60);
    let seconds = "00";
    if (res.timer % 60 != 0) {
      seconds = 60 - (res.timer % 60);
    }
    if (reset === true) {
      time.textContent = "00:00:00";
    } else {
      time.textContent = `
        ${timerFormat(Number(hours))}:${timerFormat(minutes)}:${timerFormat(
        Number(seconds)
      )}
        `;
    }
  });
};

const showCustomAlert = function () {
  overlayAlert.style.display = "block";
  customAlert.style.display = "block";
};

const hideCustomAlert = function () {
  overlayAlert.style.display = "none";
  customAlert.style.display = "none";
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
  //   chrome.storage.local.get(["timer"], (res) => {
  //     chrome.storage.local.set({
  //       timer: +inputValue,
  //     });
  //   });
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
    showCustomAlert();
  } else {
    chrome.storage.local.set({
      isRunning: true,
    });
    reset = false;
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
      reset = true;
    }
  );
});

// Custom alert close btn
alertCloseBtn.addEventListener("click", () => {
  hideCustomAlert();
});

////////////////////////////////////////////
updateTimer();
setInterval(updateTimer, 1000);
