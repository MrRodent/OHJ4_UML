import { createDefaultPolls, pollCard } from "./poll.js";
import { createDefaultUsers } from "./registration.js";
import { loadPolls } from "./utils.js";

//////////////
// Settings
export const idMinLength = 4;
export const pwMinLength = 5;


//////////////
// DOM
document.addEventListener("DOMContentLoaded", (event) => {
  console.log("DOM fully loaded and parsed");
  createDefaultUsers();
  createDefaultPolls();
  loadPolls();
});
  