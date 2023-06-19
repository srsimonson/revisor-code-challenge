const referrerField = document.getElementById("referrer");
const otherField = document.getElementById("other");
const nameField = document.getElementById("name");
const emailField = document.getElementById("email");

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
};

/**
 * Populate select option with choose, sortedUsers, and other
 */
const populateSelectOptions = (sortedUsers) => {

    // Create "choose person" option
    const choosePersonLabel = document.createElement("option");
    choosePersonLabel.text = "choose person";
    choosePersonLabel.value = null;
    referrerField.add(choosePersonLabel);

    // Loop through sorted users and create options
    sortedUsers.forEach((user) => {
        const option = document.createElement("option");
        option.text = user.name;
        option.value = user.id;
        referrerField.add(option);
    });

    // Create "Other" option
    const otherOption = document.createElement("option");
    otherOption.text = "Other";
    otherOption.value = "other";
    referrerField.add(otherOption);

    // Event listener to show/hide text field
    referrerField.addEventListener("change", () => {
        if (referrerField.value === "other") {
            otherField.style.display = "block";
        } else {
            otherField.style.display = "none";
        }
    });
};

/**
 * Add red dot to name validation failure
 */
nameField.addEventListener("input", () => {
    const errorDot = document.querySelector(".error-dot");

    if (
        nameField.validity.patternMismatch ||
        nameField.value.length === nameField.maxLength
    ) {
        errorDot.style.display = "inline";
    } else {
        errorDot.style.display = "none";
    }
});

/**
 * Submit form
 */
const submitForm = (event) => {
    event.preventDefault();
    const nameValue = nameField.value.trim();
    const emailValue = emailField.value.trim();

    let referrerValue;

    if (referrerField.value === "other") {
        referrerValue = otherField.value;
    } else {
        referrerValue = referrerField.value;
    }

    const completedForm = {
        name: nameValue,
        email: emailValue,
        referrer: "" + referrerValue.trim(),
    };

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(completedForm),
    };

    // If form inputs have value and the value is valid, then submit
    if (
        nameValue && 
        !nameField.validity.patternMismatch && 
        emailValue &&
        emailField.validity.valid
    ) {
        fetch("http://localhost:3000/submit", requestOptions)
        .then((response) => {
            if (response.ok) {
                console.log(completedForm)
                console.log("Form submitted successfully");
            } else {
                console.error("Error:", response.status);
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });

    } else {
        console.log("Fail submit: form inputs not valid");
    }
};
