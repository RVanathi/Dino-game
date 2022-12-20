import {
  getCustomProperty,
  incrementCustomProperty,
  setCustomProperty,
} from "./updateCustomProperty.js";

const SPEED = 0.04;

const ground = document.querySelector(".ground");

export function updateGround(deltaTime, speedScale) {
  incrementCustomProperty(
    ground,
    "--left",
    deltaTime * speedScale * SPEED * -1
  );
  if (getCustomProperty(ground, "--left") <= -100) {
    incrementCustomProperty(ground, "--left", 100);
  }
}
