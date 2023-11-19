import { idMinLength, pwMinLength } from "./main.js";

//////////////
// DOM elements
let form = document.getElementById('registrationForm');
let idField = document.getElementById('inputID');
let pwField = document.getElementById('inputPw');
let errorMsgID = document.getElementById('errorMsgID');
let errorMsgPw = document.getElementById('errorMsgPw');
const regBtn = document.getElementById('registrationBtn');


// Validating
function validateID(userID) {
  if (userID.length < idMinLength) {
    errorMsgID.innerHTML = `Minimipituus ${idMinLength} merkkiä.`;
    console.log("ID failed");
    return false;
  }
  errorMsgID = '';
  return true;
}

function validatePassword(password) {
  if (password.length < pwMinLength) {
    errorMsgPw.innerHTML = `Minimipituus ${pwMinLength} merkkiä.`;
    console.log("Pw failed");
    return false;
  }
  errorMsgPw = '';
  return true;
}

// Sending
regBtn.addEventListener('click', send);

function send() {
  idField = document.getElementById('inputID').value;
  pwField = document.getElementById('inputPw').value;
  
  if (validateID(idField)
    & validatePassword(pwField)) {
      console.log("ONNISTUI");
      saveToJson(idField, pwField);
      return true;
    };

  console.log("EPÄONNISTUI");
  return false;
}

function saveToLocalStorage(idField, pwField) {
  const obj = {name: idField, pw: pwField, admin: false};
  const json = JSON.stringify(obj);
  localStorage.setItem("users", json);  // TODO: array
}

// Exports
export function showRegistrationForm() {
  form.classList.replace('invisible', 'visible');
}

export function hideRegistrationForm() {
  form.classList.replace('visible', 'invisible');
}