//===> nav bar button functionnality

const homeBtn = document.querySelector("#Home-btn");
const historyBtn = document.querySelector("#History-btn");
const showHistory = document.querySelector(".history");
const showHome = document.querySelector(".Home");

historyBtn.addEventListener("click", () => {
  showHistory.style.display = "block";
  showHome.style.display = "none";
});

homeBtn.addEventListener("click", () => {
  showHome.style.display = "block";
  showHistory.style.display = "none";
});

// done nav bar button functionnality <===\\