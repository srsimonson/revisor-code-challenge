let users;

const sortUsers = (usersJson) => {
    const sortedUsers = usersJson.sort((a, b) => {
        const lastNameA = a.name.split(" ").pop();
        const lastNameB = b.name.split(" ").pop();

        return lastNameA.localeCompare(lastNameB); // Compare and sort based on the last name
    });

    users = sortedUsers;
    console.log(users);
};

// On load, fetch users from web service
window.addEventListener("load", () => {
    fetch("http://localhost:3000/users")
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Error: " + response.status);
            }
        })
        .then((data) => {
            sortUsers(data);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
});

function submitForm() {
    console.log("submitForm fired");
}

const nameInput = document.getElementById("name");

nameInput.addEventListener("input", () => {
    const errorDot = document.querySelector(".error-dot");

    if (
        nameInput.validity.patternMismatch ||
        nameInput.value.length === nameInput.maxLength
    ) {
        errorDot.style.display = "inline";
    } else {
        errorDot.style.display = "none";
    }
});
