import { hideRegistrationForm } from "./registration.js";
import { findID, getUsers, isUserAdmin, showToast } from "./utils.js";

//////////////
// DOM elements
let pollContainer = document.getElementById('poll-container');
let form = document.getElementById('loginForm');
let errorMsgID = document.getElementById('loginErrorMsgID');
let errorMsgPw = document.getElementById('loginErrorMsgPw');
const idField = document.getElementById('loginInputID');
const pwField = document.getElementById('loginInputPw');

//////////////
// Logging in
function checkID(id, password) {
  if (!findID(id)) {
    idField.classList.add('is-invalid');
    errorMsgID.innerHTML = 'Käyttäjätunnusta ei löydy';
    return false;
  } else {
    idField.classList.remove('is-invalid');
  }

  let users = getUsers();
  for (const user of users) {
    if (id === user.id) {
        if (password === user.pw) {
          pwField.classList.remove('is-invalid');
          return true;
        } else {
          pwField.classList.add('is-invalid');
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

function showLoginForm() {
  hideRegistrationForm();
  form.classList.replace('invisible', 'visible');
  pollContainer.classList.add('blur');
}

function updateNavbarOnLogin(id) {
  let nameDisplay = document.getElementById('nav-left-id');
  nameDisplay.textContent = id;

  const loginLinks = document.querySelectorAll('.login-link');
  loginLinks.forEach(link => {
    link.removeEventListener('click', showLoginForm);
    link.addEventListener('click', logOut);
    link.textContent = 'Kirjaudu ulos';
  });

  const regLinks = document.querySelectorAll('.register-link');
  regLinks.forEach(link => {
    link.classList.add('disabled');
  });

  if (isUserAdmin(id)) {
    const createBtns = document.querySelectorAll('.open-poll-creation');
    createBtns.forEach(button => {
      button.classList.remove('invisible');
    });
  }
}

export function showVotingOptions() {
  const voteButtons = document.querySelectorAll('.vote-button');
  voteButtons.forEach(button => {
    button.classList.remove('invisible');
  })

  const resultButtons = document.querySelectorAll('.result-button');
  resultButtons.forEach(button => {
    button.classList.remove('invisible');
  })

  const loginReminders = document.querySelectorAll('.login-reminder');
  loginReminders.forEach(text => {
    text.classList.add('invisible');
  });
}

// Sending
function send() {  
  if (checkID(idField.value, pwField.value)) {
    showToast(`Tervetuloa ${idField.value}`, 'Olet nyt kirjautunut sisään.');
    emptyLoginFields();
    hideLoginForm();
    updateNavbarOnLogin(idField.value);
    showVotingOptions();
    // TODO: Kirjaudu
  }
}

export function emptyLoginFields() {
  let id = document.getElementById('loginInputID');     // TODO: listata nämä tiedoston alkuun vai purkaa lista?  on myös regissä
  let pw = document.getElementById('loginInputPw');

  errorMsgID.innerHTML = '';
  errorMsgPw.innerHTML = '';
  id.value = '';
  pw.value = '';
}

//////////////
// Logging out
function hideVotingOptions() {
  const voteButtons = document.querySelectorAll('.vote-button');
  voteButtons.forEach(button => {
    button.classList.add('invisible');
  })

  const resultButtons = document.querySelectorAll('.result-button');
  resultButtons.forEach(button => {
    button.classList.add('invisible');
  })

  const loginReminders = document.querySelectorAll('.login-reminder');
  loginReminders.forEach(text => {
    text.classList.remove('invisible');
  });
}

function logOut() {
  console.log("Logged out");
  updateNavbarOnLogout();
  hideVotingOptions();
  showToast('Hei hei!', 'Olet nyt kirjautunut ulos');
}

function updateNavbarOnLogout() {
  let nameDisplay = document.getElementById('nav-left-id');
  nameDisplay.textContent = '';

  const loginLinks = document.querySelectorAll('.login-link');
  loginLinks.forEach(link => {
    link.removeEventListener('click', logOut);
    link.addEventListener('click', showLoginForm);
    if (link.id !== 'login-link-form') {
      link.textContent = 'Kirjaudu sisään';
    }
  });

  const regLinks = document.querySelectorAll('.register-link');
  regLinks.forEach(link => {
    link.classList.remove('disabled');
  });

  const createBtns = document.querySelectorAll('.open-poll-creation');
  createBtns.forEach(button => {
    button.classList.add('invisible');
  });
}

//////////////
// Links and buttons
const loginLinks = document.querySelectorAll('.login-link');
loginLinks.forEach(link => {
  link.addEventListener('click', showLoginForm);
  if (link.id !== 'login-link-form') {
    link.textContent = 'Kirjaudu sisään';
  }
});

const loginCloseBtn = document.getElementById('loginCloseBtn');
loginCloseBtn.addEventListener('click', hideLoginForm);

const loginBtn = document.getElementById('loginBtn');
loginBtn.addEventListener('click', send);