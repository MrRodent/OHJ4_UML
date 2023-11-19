import { pollCard } from "./poll.js";
import { hideRegistrationForm, showRegistrationForm } from "./registration.js";

//////////////
// Settings
export const idMinLength = 4;
export const pwMinLength = 6;


//////////////
// DOM
document.addEventListener("DOMContentLoaded", (event) => {
  console.log("DOM fully loaded and parsed");
  showRegistrationForm();
  // const card0 = new pollCard(0, 'Lempieläin', 'Mikä on lempieläimesi?', ['Kissa', 'Koira'], 1000);
  // const card1 = new pollCard(1, 'Ohjelmointikielet', 'Mikä on paras ohjelmointikieli?', ['Python', 'JavaScript', 'C', 'Scratch'], 100);
  // const card2 = new pollCard(2, 'Äänestäminen', 'Aiotko äänestää?', ['Kyllä', 'En', 'Ehkä', 'Anna maksimiksi 30 merkkiä hmm'], 50);
});
  