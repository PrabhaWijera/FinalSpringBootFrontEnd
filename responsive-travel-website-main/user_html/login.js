// Get references to HTML elements
const loginEmailInput = document.getElementById("email");
const loginPasswordInput = document.getElementById("password");
const loginButton = document.getElementById("loginButton");

// Add an event listener to the login button
loginButton.addEventListener("click", loginUser);

function loginUser() {
    // Retrieve login data from the input fields
    const loginEmail = loginEmailInput.value;
    const loginPassword = loginPasswordInput.value;

    // Retrieve stored registration data from local storage
    const regEmail = localStorage.getItem("email");
    const regPassword = localStorage.getItem("password");

    if (!regEmail || !regPassword) {
        alert("No registration data found. Please sign up.");
    } else if (loginEmail === regEmail && loginPassword === regPassword) {
        alert("Successful login");
        window.location.href = 'regular_p.html';
    } else {
        alert("Invalid email or password");
    }
}
