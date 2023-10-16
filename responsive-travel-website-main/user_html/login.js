/*

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
*/

let isLoggedIn = false;
const loginButton = document.getElementById("loginButton");
const loginEmailInput = document.getElementById("email");
const loginPasswordInput = document.getElementById("password");
const packageButtons = document.querySelectorAll(".package-button");

loginButton.addEventListener("click", loginUser);

packageButtons.forEach(button => {
    button.addEventListener("click", () => {
        const packageID = button.dataset.packageId;
        redirectToPackagePage(packageID);
    });
});

function loginUser() {
    const loginEmail = loginEmailInput.value;
    const loginPassword = loginPasswordInput.value;
    const regEmail = localStorage.getItem("email");
    const regPassword = localStorage.getItem("password");

    if (!regEmail || !regPassword) {
        alert("No registration data found. Please sign up.");
    } else if (loginEmail === regEmail && loginPassword === regPassword) {
        alert("Successful login");
        isLoggedIn = true;
        window.location.href = 'regular_p.html';
    } else {
        alert("Invalid email or password");
    }
}

function redirectToPackagePage(packageID) {
    const packagePages = {
        "pack1": "regular_p.html",
        "pack2": "Mid-level_package.html",
        "pack3": "Luxury.html",
        "pack4": "Super-Luxury-Package.html"
    };

    if (isLoggedIn) {
        const packagePageURL = packagePages[packageID];
        if (packagePageURL) {
            window.location.href = packagePageURL;
        } else {
            alert("Invalid package selection.");
        }
    } else {
        alert("You must log in before selecting a package.");
    }
}
