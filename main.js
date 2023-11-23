import { pollCard } from "./poll.js";
import { createDefaultUsers } from "./registration.js";

//////////////
// Settings
export const idMinLength = 4;
export const pwMinLength = 5;


//////////////
// DOM
document.addEventListener("DOMContentLoaded", (event) => {
  console.log("DOM fully loaded and parsed");
  createDefaultUsers();
  // const card0 = new pollCard(0, 'Lempieläin', 'Mikä on lempieläimesi?', ['Kissa', 'Koira'], true);
  // const card1 = new pollCard(1, 'Ohjelmointikielet', 'Mikä on paras ohjelmointikieli?', ['Python', 'JavaScript', 'C', 'Scratch'], true);
  // const card2 = new pollCard(2, 'Äänestäminen', 'Aiotko äänestää?', ['Kyllä', 'En', 'Ehkä', 'Anna maksimiksi 30 merkkiä hmm'], true);
});
  