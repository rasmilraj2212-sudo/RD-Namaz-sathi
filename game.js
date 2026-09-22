// RD Namaz Saathi
// Main app functionality

document.addEventListener("DOMContentLoaded", () => {

  // -------------------------
  // SCREEN NAVIGATION
  // -------------------------

  const screens = document.querySelectorAll(".screen");
  const navigationButtons = document.querySelectorAll("[data-screen]");

  function showScreen(screenId) {

    screens.forEach(screen => {
      screen.classList.remove("active");
    });

    const selected = document.getElementById(screenId);

    if (selected) {
      selected.classList.add("active");
      window.scrollTo(0, 0);
    }
  }

  navigationButtons.forEach(button => {

    button.addEventListener("click", () => {

      const screen = button.dataset.screen;

      showScreen(screen);

    });

  });


  // -------------------------
  // NAMAZ
  // -------------------------

  const prayerInfo = document.getElementById("prayerInfo");

  document.querySelectorAll(".lesson").forEach(button => {

    button.addEventListener("click", () => {

      const prayer = button.dataset.prayer;

      prayerInfo.innerHTML = `
        <h3>${prayer}</h3>
        <p>
          এইটো নামাজ শিকাৰ lesson। 
          ইয়াত verified step-by-step Islamic learning content যোগ কৰিব পাৰি।
        </p>
        <button onclick="speakText('${prayer}')">
          🔊 শুনক
        </button>
      `;

    });

  });


  // -------------------------
  // WUDU
  // -------------------------

  const wuduSteps = [

    {
      title: "অজুৰ নিয়ত",
      text: "অজু কৰাৰ বাবে নিয়ত কৰক।"
    },

    {
      title: "হাত ধোৱা",
      text: "দুয়োখন হাত কব্জিলৈকে ধোৱা।"
    },

    {
      title: "মুখ কুলি কৰা",
      text: "মুখ ভালদৰে কুলি কৰা।"
    },

    {
      title: "নাক পৰিষ্কাৰ কৰা",
      text: "নাকত পানী দি পৰিষ্কাৰ কৰা।"
    },

    {
      title: "মুখ ধোৱা",
      text: "মুখ ভালদৰে ধোৱা।"
    },

    {
      title: "হাত কনুইলৈকে ধোৱা",
      text: "দুয়োখন হাত কনুইসহ ধোৱা।"
    },

    {
      title: "মূৰত মছেহ",
      text: "মূৰত মছেহ কৰা।"
    },

    {
      title: "কাণ মছেহ",
      text: "কাণত মছেহ কৰা।"
    },

    {
      title: "ভৰি ধোৱা",
      text: "দুয়োখন ভৰি গোৰোহাসহ ধোৱা।"
    }

  ];

  let currentWudu = 0;

  const wuduContainer = document.getElementById("wuduSteps");
  const counter = document.getElementById("wuduCounter");

  function renderWudu() {

    const step = wuduSteps[currentWudu];

    wuduContainer.innerHTML = `
      <div class="wudu-step">

        <div class="wudu-number">
          💧 ${currentWudu + 1}
        </div>

        <h3>${step.title}</h3>

        <p>${step.text}</p>

        <br>

        <button onclick="speakText('${step.text}')">
          🔊 শুনক
        </button>

      </div>
    `;

    counter.textContent =
      `${currentWudu + 1} / ${wuduSteps.length}`;

  }

  document.getElementById("nextWudu").addEventListener("click", () => {

    if (currentWudu < wuduSteps.length - 1) {
      currentWudu++;
      renderWudu();
    }

  });

  document.getElementById("prevWudu").addEventListener("click", () => {

    if (currentWudu > 0) {
      currentWudu--;
      renderWudu();
    }

  });

  renderWudu();


  // -------------------------
  // VOICE
  // -------------------------

  window.speakText = function(text) {

    if (!("speechSynthesis" in window)) {
      alert("আপোনাৰ browser-এ voice support নকৰে।");
      return;
    }

    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(text);

    speech.lang = "as-IN";
    speech.rate = 0.85;

    window.speechSynthesis.speak(speech);

  };


  const voiceBtn = document.getElementById("voiceBtn");

  voiceBtn.addEventListener("click", () => {

    speakText(
      "আস্‌ছালামু আলাইকুম। RD Namaz Saathi লৈ স্বাগতম।"
    );

  });


  // -------------------------
  // AI DEMO CHAT
  // -------------------------

  const askBtn = document.getElementById("askBtn");
  const questionInput = document.getElementById("questionInput");
  const chatBox = document.getElementById("chatBox");

  askBtn.addEventListener("click", () => {

    const question = questionInput.value.trim();

    if (!question) {
      return;
    }

    const userMessage = document.createElement("div");

    userMessage.className = "user-message";
    userMessage.textContent = question;

    chatBox.appendChild(userMessage);

    questionInput.value = "";

    const botMessage = document.createElement("div");

    botMessage.className = "bot-message";

    botMessage.textContent =
      "এইটো demo AI response। বাস্তৱ AI ব্যৱহাৰ কৰিবলৈ secure backend/API যোগ কৰিব লাগিব।";

    chatBox.appendChild(botMessage);

    chatBox.scrollTop = chatBox.scrollHeight;

  });


  // -------------------------
  // LARGE TEXT
  // -------------------------

  const largeText = document.getElementById("largeText");

  largeText.addEventListener("change", () => {

    document.body.classList.toggle(
      "large-text",
      largeText.checked
    );

  });


  // -------------------------
  // DARK MODE
  // -------------------------

  const darkMode = document.getElementById("darkMode");

  darkMode.addEventListener("change", () => {

    document.body.classList.toggle(
      "dark",
      darkMode.checked
    );

  });

});// game.js — state, game loop, resize, and boot
// draw() is defined in render.js; input listeners are set up in input.js

var COLS = 20;
var ROWS = 20;
var FPS  = 9;
var CELL; // pixels per cell, computed in resize()

// ── State ─────────────────────────────────────────────────────────────────

var snake, dir, nextDir, food, score, best, phase, loopTimer;
// phase: 'idle' | 'running' | 'dead'

function init() {
  snake   = [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }];
  dir     = { x: 1, y: 0 };
  nextDir = { x: 1, y: 0 };
  score   = 0;
  placeFood();
}

function placeFood() {
  do {
    food = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) };
  } while (snake.some(function(s) { return s.x === food.x && s.y === food.y; }));
}

function start() {
  if (loopTimer) clearInterval(loopTimer);
  init();
  phase     = 'running';
  loopTimer = setInterval(tick, 1000 / FPS);
}

// ── Game loop ──────────────────────────────────────────────────────────────

function tick() {
  dir = nextDir;

  var head = { x: (snake[0].x + dir.x + COLS) % COLS,
               y: (snake[0].y + dir.y + ROWS) % ROWS };

  if (snake.some(function(s) { return s.x === head.x && s.y === head.y; })) {
    phase = 'dead';
    best  = Math.max(best, score);
    clearInterval(loopTimer);
    draw();
    return;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;
    placeFood();
  } else {
    snake.pop();
  }

  draw();
}

// ── Resize ────────────────────────────────────────────────────────────────

function resize() {
  var size  = Math.min(window.innerWidth, window.innerHeight);
  CELL      = Math.floor(size / COLS);
  var px    = CELL * COLS;
  canvas.width  = px;
  canvas.height = px;
  draw();
}

window.addEventListener('resize', resize);

// ── Boot ──────────────────────────────────────────────────────────────────

best  = 0;
phase = 'idle';
init();
resize();
