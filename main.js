import { hideRegistrationForm, showRegistrationForm, updatePlaceholders } from "./registration.js";

//////////////
// Settings
export const idMinLength = 4;
export const pwMinLength = 6;


//////////////
// DOM
document.addEventListener("DOMContentLoaded", (event) => {
  console.log("DOM fully loaded and parsed");
  showRegistrationForm();
  updatePlaceholders();
});
  