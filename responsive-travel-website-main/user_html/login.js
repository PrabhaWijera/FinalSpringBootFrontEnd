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

$("#loginButton").click(function() { // Use "click" instead of "onclick"
    loginUser();
});

const loginEmailInput = document.getElementById("email");
const loginPasswordInput = document.getElementById("password");
const loginButton = document.getElementById("loginButton");



// Add an event listener to the login button



function loginUser() {
    // Retrieve login data from the input fields
/*    const loginEmail = loginEmailInput.value;
    const loginPassword = loginPasswordInput.value;*/

    const emailValue = loginEmailInput.value;
    const passwordValue = loginPasswordInput.value;

    // Store the values in localStorage
    localStorage.setItem("email", emailValue);
    localStorage.setItem("password", passwordValue);

    // Retrieve stored registration data from local storage
    const regEmail = localStorage.getItem("email");
    const regPassword = localStorage.getItem("password");

    // Retrieve package data from local storage
    const regular = localStorage.getItem("Regular");
    const mid = localStorage.getItem("MID");
    const lux = localStorage.getItem("LuxValue");
    const s_lux = localStorage.getItem("SuperLux");

    // Ensure that retrieved values are treated as strings (assuming you stored them as strings)
    const regEmailString = String(regEmail);
    const regPasswordString = String(regPassword);

    const regularString = String(regular);
    const midString = String(mid);
    const luxString = String(lux);
    const s_luxString = String(s_lux);

    if (!regEmailString || !regPasswordString) {
        alert("No registration data found. Please sign up.");
    } else if (emailValue === regEmailString && passwordValue === regPasswordString) {
        alert("Successful login");

        console.log("Regular:", regularString);
        console.log("Mid:", midString);
        console.log("Lux:", luxString);
        console.log("SuperLux:", s_luxString);

        if (regularString === "1") {
            alert(regularString);
            window.location.href = 'regular_p.html';
        } else if (midString === "2") {
            alert(midString);
            window.location.href = 'Mid-level_package.html';
        } else if (luxString === "3") {
            alert(luxString);
            window.location.href = 'Luxury.html';
        } else if (s_luxString === "4") {
            alert(s_luxString);
            window.location.href = 'Super-Luxury-Package.html';
        }

    } else {
        alert("Invalid email or password");
    }
}

