// On load, fetch users from web service
window.addEventListener("load", function () {
    fetch("http://localhost:3000/users")
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Error: " + response.status);
            }
        })
        .then(function (data) {
            console.log(data); // Do something with the retrieved data
        })
        .catch(function (error) {
            console.error("Error:", error);
        });
});

function submitForm() {
    console.log("submitForm fired");
    fetch("http://localhost:3000/users");
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
