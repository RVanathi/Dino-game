import {
  getCustomProperty,
  incrementCustomProperty,
  setCustomProperty,
} from "./updateCustomProperty.js";

const SPEED = 0.04;
const CACTUS_INTERVAL_MIN = 1000;
const CACTUS_INTERVAL_MAX = 3000;
const CACTUS_COUNT = 2;

const game = document.querySelector(".game");

let nextCactus;
let n;

export function setupCactus() {
  nextCactus = CACTUS_INTERVAL_MIN;
  document.querySelectorAll(".cactus").forEach((cactus) => {
    cactus.remove();
  });
}

export function updateCactus(deltaTime, speed) {
  document.querySelectorAll(".cactus").forEach((cactus) => {
    incrementCustomProperty(cactus, "--left", deltaTime * speed * SPEED * -1);
    if (getCustomProperty(cactus, "--left") <= -100) {
      cactus.remove();
    }
  });

  if (nextCactus <= 0) {
    createCactus();
    nextCactus = randomNumber(CACTUS_INTERVAL_MIN, CACTUS_INTERVAL_MAX) / speed;
  }
  nextCactus -= deltaTime;
}

export function getCactusRects() {
  return [...document.querySelectorAll(".cactus")].map((cactus) => {
    return cactus.getBoundingClientRect();
  });
}

function createCactus() {
  const cactus = document.createElement("img");
  n = Math.floor(Math.random() * CACTUS_COUNT);
  cactus.src = `images/cactus-${n}.png`;
  cactus.classList.add("cactus");
  setCustomProperty(cactus, "--left", 100);
  game.append(cactus);
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
