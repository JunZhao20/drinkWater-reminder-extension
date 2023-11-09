// Elements
const infoIcon = document.querySelector(".info");
const hide = document.querySelector(".hide");
const infoOverlay = document.querySelector(".info-overlay");
const infoBox = document.querySelector(".info-box");
const drinkNum = document.querySelector(".drink-num");
const resetBtn = document.querySelector(".resetBtn");
const btn = document.querySelector(".btn");
const inputField = document.querySelector("#field-time");

// Event Listener
infoIcon.addEventListener("mouseover", () => {
  hide.style.opacity = "1";
  infoOverlay.style.transition = "opacity 0.3s ease";
});

infoIcon.addEventListener("mouseout", () => {
  hide.style.opacity = "0";
});
