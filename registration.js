import { idMinLength, pwMinLength } from "./main.js";
import { findDuplicateID, showToast } from "./utils.js";

//////////////
// DOM elements
let pollContainer = document.getElementById('poll-container');
let form = document.getElementById('registrationForm');
let errorMsgID = document.getElementById('errorMsgID');
let errorMsgPw = document.getElementById('errorMsgPw');
const showRegBtn = document.getElementById('showRegForm');
let regBtn = document.getElementById('registrationBtn');
const regCloseBtn = document.getElementById('regCloseBtn');

//////////////
// Validating
function validateID(userID) {
  if (userID.length < idMinLength) {
    errorMsgID.innerHTML = `Minimipituus ${idMinLength} merkkiä.`;
    return false;
  }
  if (findDuplicateID(userID)) {
    errorMsgID.innerHTML = `Käyttäjätunnus on jo rekisteröity.`;
    return false;
  }

  errorMsgID.innerHTML = '';
  return true;
}

function validatePassword(password) {
  if (password.length < pwMinLength) {
    errorMsgPw.innerHTML = `Minimipituus ${pwMinLength} merkkiä.`;
    return false;
  }
  errorMsgPw.innerHTML = '';
  return true;
}

//////////////
// Saving
function saveToLocalStorage(idField, pwField, adminCheck) {
  if (localStorage.getItem("users") === null) {
    createDefaultUsers();
  }
  const users = localStorage.getItem("users");
  const parsed = JSON.parse(users);
  const newUser = {id: idField, pw: pwField, admin: adminCheck};
  parsed.push(newUser);
  const json = JSON.stringify(parsed);
  localStorage.setItem("users", json);
}

// Sending
function send() {   //TODO: feedback, empty fields
  const idField = document.getElementById('inputID').value;
  const pwField = document.getElementById('inputPw').value;
  const adminCheck = document.getElementById('checkAdmin').checked;
  
  if (validateID(idField)
    & validatePassword(pwField)) {
      emptyRegFields();
      saveToLocalStorage(idField, pwField, adminCheck);
      showToast('Tunnuksen luonti onnistui', 'Voit nyt kirjautua sisään.');
      hideRegistrationForm();
      return true;
    };
    return false;
}
regBtn.addEventListener('click', send);

//////////////
// Exports
export function showRegistrationForm() {
  form.classList.replace('invisible', 'visible');
  pollContainer.classList.add('blur');
}

export function hideRegistrationForm() {
  form.classList.replace('visible', 'invisible');
  pollContainer.classList.remove('blur');
}

export function createDefaultUsers() {
  if (localStorage.getItem("users") !== null) return;
  console.log("Local Storage empty. Creating default users");

  const users = [{id: "admin", pw: "admin", admin: true}, {id: "user", pw: "user", admin: false}];
  const json = JSON.stringify(users);
  localStorage.setItem("users", json);
}

export function emptyRegFields() {
  let id = document.getElementById('inputID');
  let pw = document.getElementById('inputPw');
  let adminCheck = document.getElementById('checkAdmin');

  id.value = '';
  pw.value = '';
  adminCheck.checked = false;
}

// Show / close the form
showRegBtn.addEventListener('click', showRegistrationForm);
regCloseBtn.addEventListener('click', hideRegistrationForm);