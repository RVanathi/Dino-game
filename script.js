import { updateGround } from "./ground.js";
import { updateDino, setupDino, getDinoRect, setDinoLose } from "./dino.js";
import { updateCactus, setupCactus, getCactusRects } from "./cactus.js";

const GAME_WIDTH = 100;
const GAME_HEIGHT = 25;
const SPEED_INCREASE = 0.00001;

const game = document.querySelector(".game");
const score = document.querySelector(".score");
const startMessage = document.querySelector(".start-message");
const gameOver = document.querySelector(".game-over");
const highScore = document.querySelector(".hi-score");

let startTime;
let speed;
let points;
let hiScore;

setGameScale();

window.addEventListener("resize", setGameScale);
document.addEventListener("keydown", handleStart, { once: true });

if (localStorage.getItem("highScore") == null) {
  localStorage.setItem("highScore", 0);
  hiScore = 0;
}

hiScore = localStorage.getItem("highScore");
highScore.innerHTML = `Hi-score: ${hiScore}`;

function setGameScale() {
  let gameScale;
  if (window.innerWidth / window.innerHeight < GAME_WIDTH / GAME_HEIGHT) {
    gameScale = window.innerWidth / GAME_WIDTH;
  } else {
    gameScale = window.innerHeight / GAME_HEIGHT;
  }
  game.style.width = `${GAME_WIDTH * gameScale}px`;
  game.style.height = `${GAME_HEIGHT * gameScale}px`;
}

function upadate(time) {
  if (startTime == null) {
    startTime = time;
    window.requestAnimationFrame(upadate);
    return;
  }
  const deltaTime = time - startTime;
  updateGround(deltaTime, speed);
  updateDino(deltaTime, speed);
  upadateSpeed(deltaTime);
  upadateScore(deltaTime);
  updateCactus(deltaTime, speed);
  if (checkLose()) return handleLose();
  startTime = time;
  window.requestAnimationFrame(upadate);
}

function upadateSpeed(deltaTime) {
  speed += deltaTime * SPEED_INCREASE;
}

function upadateScore(deltaTime) {
  points += deltaTime * 0.01;
  score.textContent = `Score: ${Math.floor(points)}`;
}

function handleStart() {
  startTime = null;
  speed = 1;
  points = 0;
  highScore.textContent = `Hi-score: ${localStorage.getItem("highScore")}`;
  setupDino();
  setupCactus();
  startMessage.classList.add("hide");
  gameOver.classList.add("hide");

  window.requestAnimationFrame(upadate);
}

function checkLose() {
  const dinoRect = getDinoRect();
  return getCactusRects().some((rect) => isCollision(rect, dinoRect));
}

function isCollision(rect1, rect2) {
  return (
    rect1.left < rect2.right &&
    rect1.top < rect2.bottom &&
    rect1.right > rect2.left
    // && rect1.bottom > rect2.top
  );
}

function handleLose() {
  setDinoLose();
  setTimeout(() => {
    document.addEventListener("keydown", handleStart, { once: true });
    startMessage.classList.remove("hide");
    gameOver.classList.remove("hide");
    if (points > localStorage.getItem("highScore")) {
      localStorage.setItem("highScore", Math.floor(points));
      highScore.textContent = `Hi-score: ${Math.floor(points)}`;
    }
    highScore.textContent = `Hi-score: ${localStorage.getItem("highScore")}`;
  }, 100);
}
