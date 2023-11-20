import { hideRegistrationForm } from "./registration.js";
import { findID, getUsers, showToast } from "./utils.js";

//////////////
// DOM elements
let pollContainer = document.getElementById('poll-container');
let form = document.getElementById('loginForm');
let errorMsgID = document.getElementById('loginErrorMsgID');
let errorMsgPw = document.getElementById('loginErrorMsgPw');
const showLoginBtn = document.getElementById('showLoginForm');
const showLoginLink = document.getElementById('showLoginFormLink');
const loginBtn = document.getElementById('loginBtn');
const loginCloseBtn = document.getElementById('loginCloseBtn');

//////////////
// Validating
function checkID(id, password) {
  if (!findID(id)) {
    errorMsgID.innerHTML = 'Käyttäjätunnusta ei löydy';
    return false;
  }

  let users = getUsers();
  for (const user of users) {
    if (id === user.id) {
        if (password === user.pw) {
          return true;
        } else {
          errorMsgPw.innerHTML = 'Väärä salasana'
        }
    }
  }
  return false;
}

export function hideLoginForm() {
  form.classList.replace('visible', 'invisible');
  pollContainer.classList.remove('blur');
}

export function showLoginForm() {
  hideRegistrationForm();
  form.classList.replace('invisible', 'visible');
  pollContainer.classList.add('blur');
}

// Sending
function send() {
  const idField = document.getElementById('loginInputID').value;
  const pwField = document.getElementById('loginInputPw').value;
  
  if (checkID(idField, pwField)) {
    showToast(`Tervetuloa ${idField}`, 'Olet nyt kirjautunut sisään.');
    emptyLoginFields();
    hideLoginForm();
    // TODO: KIRJAUDU
  }
}
loginBtn.addEventListener('click', send);


export function emptyLoginFields() {
  let id = document.getElementById('loginInputID');     // TODO: listata nämä tiedoston alkuun vai purkaa lista?  on myös regissä
  let pw = document.getElementById('loginInputPw');

  errorMsgID.innerHTML = '';
  errorMsgPw.innerHTML = '';
  id.value = '';
  pw.value = '';
}

// Show / close the form
showLoginBtn.addEventListener('click', showLoginForm);
showLoginLink.addEventListener('click', showLoginForm);
loginCloseBtn.addEventListener('click', hideLoginForm);