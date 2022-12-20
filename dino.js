import {
  incrementCustomProperty,
  getCustomProperty,
  setCustomProperty,
} from "./updateCustomProperty.js";

const JUMP_SPEED = 0.45;
const GRAVITY = 0.0015;
const DINO_COUNT = 2;
const FRAME_TIME = 100;

const dino = document.querySelector(".dino");

let isJumping;
let dinoFrame;
let currFrameTime;
let yVelocity;

export function setupDino() {
  isJumping = false;
  dinoFrame = 0;
  currFrameTime = 0;
  setCustomProperty(dino, "--bottom", 0);
  document.removeEventListener("keydown", onJump);
  document.addEventListener("keydown", onJump);
}

export function updateDino(deltaTime, speed) {
  handleRun(deltaTime, speed);
  handleJump(deltaTime);
}

export function getDinoRect() {
  return dino.getBoundingClientRect();
}

export function setDinoLose() {
  dino.src = "images/dino-lose.png";
}

export function handleRun(deltaTime, speed) {
  if (isJumping) {
    dino.src = `images/dino-stationary.png`;
    return;
  }
  if (currFrameTime >= FRAME_TIME) {
    dinoFrame = (dinoFrame + 1) % DINO_COUNT;
    dino.src = `images/dino-run-${dinoFrame}.png`;
    currFrameTime -= FRAME_TIME;
  }
  currFrameTime += deltaTime * speed;
}

function handleJump(deltaTime) {
  if (!isJumping) return;

  incrementCustomProperty(dino, "--bottom", yVelocity * deltaTime);
  if (getCustomProperty(dino, "--bottom") <= 0) {
    setCustomProperty(dino, "--bottom", 0);
    isJumping = false;
  }
  yVelocity -= GRAVITY * deltaTime;
}

function onJump(e) {
  if (e.code !== "Space" || isJumping) return;

  yVelocity = JUMP_SPEED;
  isJumping = true;
}
