import { createCard } from "./poll.js";
import { hideRegistrationForm, showRegistrationForm, updatePlaceholders } from "./registration.js";

//////////////
// Settings
export const idMinLength = 4;
export const pwMinLength = 6;


//////////////
// DOM
document.addEventListener("DOMContentLoaded", (event) => {
  console.log("DOM fully loaded and parsed");
  // showRegistrationForm();
  createCard(0, 'Lempieläin', 'Mikä on lempieläimesi?', ['Kissa', 'Koira']);
  createCard(1, 'Ohjelmointikielet', 'Mikä on paras ohjelmointikieli?', ['Python', 'JavaScript', 'C', 'Scratch']);
  createCard(2, 'Äänestäminen', 'Aiotko äänestää?', ['Kyllä', 'En', 'Ehkä', 'Anna maksimiksi 30 merkkiä hmm']);
  updatePlaceholders();
});
  