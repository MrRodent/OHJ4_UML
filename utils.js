// Returns all the registered users
export function getUsers() {
    const users = localStorage.getItem("users");
    const parsed = JSON.parse(users);
    return parsed;
}

// Checks whether the ID exists in localStorage
export function findDuplicateID(idToFind) {
    const users = getUsers();
    for (const user of users) {
        if (idToFind === user.id) {
            return true;
        }
    }
    return false;
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