/**
 * On load, fetch users from web service
 */
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
            populateSelectOptions(data);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
});

/**
 * Sort users.json alphabetically by last name
 */
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

/**
 * Populate select option with choose, sortedUsers, and other
 */
const populateSelectOptions = (sortedUsers) => {
    const selectReferrer = document.getElementById("referrer");
    const otherTextField = document.getElementById("other");

    // Create "choose person" option
    const choosePersonLabel = document.createElement("option");
    choosePersonLabel.text = "Choose person";
    selectReferrer.add(choosePersonLabel);

    // Loop through sorted users and create options
    sortedUsers.forEach((user) => {
        const option = document.createElement("option");
        option.text = user.name;
        option.value = user.id;
        selectReferrer.add(option);
    });

    // Create "Other" option
    const otherOption = document.createElement("option");
    otherOption.text = "Other";
    otherOption.value = "0";
    selectReferrer.add(otherOption);

    // Event listener to show/hide text field
    selectReferrer.addEventListener("change", () => {
        if (selectReferrer.value === "0") {
            otherTextField.style.display = "block";
        } else {
            otherTextField.style.display = "none";
        }
    });
};


/**
 * Add red dot to name validation failure
 */
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


/**
 * Submit form
 */
const submitForm = () => {
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            /* your request body data here */
        }),
    };

    console.log(requestOptions);

    fetch("http://localhost:3000/submit", requestOptions)
        .then((response) => {
            if (response.ok) {
                console.log("Form submitted successfully");
            } else {
                console.error("Error:", response.status);
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
};
