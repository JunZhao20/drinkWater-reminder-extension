const infoIcon = document.querySelector(".info");

console.log(infoIcon);

infoIcon.addEventListener("mouseover", () => {
  infoIcon.classList.add("hide", "info-overlay", "info-box");
});

infoIcon.addEventListener("mouseout", () => {
  infoIcon.classList.remove("hide", "info-overlay", "info-box");
});
