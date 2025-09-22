const breathText = document.getElementById("breath-text");
let breathePhase = 0;

setInterval(() => {
  if (breathePhase === 0) {
    breathText.textContent = "Inhale..";
    breathePhase = 1;
  } else if (breathePhase === 1) {
    breathText.textContent = "Hold..";
    breathePhase = 2;
  } else {
    breathText.textContent = "Exhale..";
    breathePhase = 0;
  }
}, 3400);

// Timer Tool 
const timeDisplay = document.getElementById("time");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");

let timer;
let totalTime = 25 * 60; // 25 min default
let timeLeft = totalTime;
let isRunning = false;

function updateDisplay() {
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  timeDisplay.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

function startTimer() {
  if (!isRunning) {
    isRunning = true;
    timer = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        updateDisplay();
      } else {
        clearInterval(timer);
        isRunning = false;
        addSession(); // log completed session
        timeLeft = totalTime;
        updateDisplay();
      }
    }, 1000);
  }
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  timeLeft = totalTime;
  updateDisplay();
}

startBtn.addEventListener("click", startTimer);
resetBtn.addEventListener("click", resetTimer);
updateDisplay();

//  Ambient Sounds
const soundBtns = document.querySelectorAll(".sound-btn");
let currentAudio = null;

soundBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    let soundId = btn.dataset.sound;
    let audio = document.getElementById(soundId);

    if (currentAudio && currentAudio !== audio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }

    if (audio.paused) {
      audio.play();
      currentAudio = audio;
    } else {
      audio.pause();
      audio.currentTime = 0;
      currentAudio = null;
    }
  });
});

//Progress Tracking
const sessionCountEl = document.getElementById("sessionCount");

function loadSessions() {
  let count = localStorage.getItem("sessionCount");
  sessionCountEl.textContent = count ? count : "0";
}

function addSession() {
  let count = parseInt(localStorage.getItem("sessionCount") || "0");
  count++;
  localStorage.setItem("sessionCount", count);
  sessionCountEl.textContent = count;
}

loadSessions();


// HAMBURGER MENU (MOBILE)


// Get hamburger icon and nav menu
const hamburger = document.getElementById("hamburger");
const navMenu = document.querySelector(".nav-menu");

// Toggle mobile nav on click
hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("show");
});

// Optional: close menu when a link is clicked (mobile friendly)
navMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("show");
  });
});
