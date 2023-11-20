import { showLoginForm } from "./login.js";
import { pollCard } from "./poll.js";
import { createDefaultUsers, hideRegistrationForm, showRegistrationForm } from "./registration.js";

//////////////
// Settings
export const idMinLength = 4;
export const pwMinLength = 5;


//////////////
// DOM
document.addEventListener("DOMContentLoaded", (event) => {
  console.log("DOM fully loaded and parsed");
  createDefaultUsers();
  showLoginForm();
  const card0 = new pollCard(0, 'Lempieläin', 'Mikä on lempieläimesi?', ['Kissa', 'Koira'], 1000);
  const card1 = new pollCard(1, 'Ohjelmointikielet', 'Mikä on paras ohjelmointikieli?', ['Python', 'JavaScript', 'C', 'Scratch'], 100);
  const card2 = new pollCard(2, 'Äänestäminen', 'Aiotko äänestää?', ['Kyllä', 'En', 'Ehkä', 'Anna maksimiksi 30 merkkiä hmm'], 50);
});
  