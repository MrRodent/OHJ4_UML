import { login, showVotingOptions } from "./login.js";
import { pollCard } from "./poll.js";

export function getUsers() {
  const users = localStorage.getItem("users");
  const parsed = JSON.parse(users);
  return parsed;
}

// Checks whether the ID exists in localStorage
export function findID(idToFind) {
  const users = getUsers();
  for (const user of users) {
    if (idToFind === user.id) {
      return true;
    }
  }
  return false;
}

export function isUserAdmin(id) {
  const users = getUsers();
  for (const user of users) {
    if (id === user.id) {
      if (user.admin) {
        return true;
      }
      return false;
    }
  }
}

export function checkIfLoggedIn() {
  const users = getUsers();
  for (const user of users) {
    if (user.isLoggedIn) {
      console.log(user.id, "is logged in");
      login(user.id);
    }
  }
}

export function getPolls() {
  const polls = localStorage.getItem("polls");
  const parsed = JSON.parse(polls);
  return parsed;
}

export function loadPolls() {
  const polls = getPolls();
  polls.forEach(poll => {
    new pollCard(poll.id, poll.subject, poll.description, poll.choices, poll.testVotes);
  });
}

// Success message
const toast = document.getElementById('liveToast');
export function showToast(header, msg) {
  let toastHeader = document.getElementById('toastHeader');
  toastHeader.textContent = header;
  let toastMsg = document.getElementById('toastMsg');
  toastMsg.textContent = msg;

  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toast);
  toastBootstrap.show();
}