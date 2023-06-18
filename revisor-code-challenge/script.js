console.log("Hello World");

function submitForm() {
    console.log("submitForm fired");
}

const nameInput = document.getElementById("name");


nameInput.addEventListener("input", () => {
    const errorDot = document.querySelector('.error-dot');

    if ( nameInput.validity.patternMismatch || nameInput.value.length === nameInput.maxLength) {
        errorDot.style.display = 'inline';
    } else {
        errorDot.style.display = 'none';
    }
});

