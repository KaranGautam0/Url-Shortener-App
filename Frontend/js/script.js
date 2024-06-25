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

// * ==> shortUrlGeneratorbtn functionnality with MyAPI
const apiURL = "http://localhost:8000/url";

const errorMessage = document.querySelector(".message");
const outputDiv = document.querySelector("#outputDiv");
const shortUrlGeneratorbtn = document.querySelector("#short-Url-Generator-btn");

let myArray = [];
function showData(data) {
  let inputUrl = document.querySelector("#urlInput");
  if (data.message) {
    errorMessage.innerHTML = data.message;
    errorMessage.style.color = "green";
    inputUrl.style.borderColor = "green";

    // show data here..
    outputDiv.innerHTML = ` 
    <p>Short URL:- <a href="${apiURL}/${data.shortID}" target="_blank">${apiURL}/${data.shortID}</a></p>
    <button id="ShareButton">Share</button>`;

    /// push in myArray to save localStorege
    myArray.push(data.shortID);
    localStorage.setItem("myArray", JSON.stringify(myArray));
  } else if (data.error) {
    errorMessage.innerHTML = data.error;
    inputUrl.style.borderColor = "red";
    errorMessage.style.color = "red";
  }
}

shortUrlGeneratorbtn.addEventListener("click", () => {
  let inputValue = document.querySelector("#urlInput").value;

  fetch(`${apiURL}`, {
    method: "POST",
    body: JSON.stringify({
      url: `${inputValue}`,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((Response) => Response.json())
    .then((data) => showData(data));
});
