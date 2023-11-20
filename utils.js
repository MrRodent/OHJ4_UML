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