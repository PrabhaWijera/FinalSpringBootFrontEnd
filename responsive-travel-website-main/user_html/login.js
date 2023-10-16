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
// Function to redirect to the appropriate package page based on the package ID
function redirectToPackage(packageId) {
    // Get user's email and password from input fields
    const loginEmailInput = document.getElementById("email");
    const loginPasswordInput = document.getElementById("password");

    const loginEmail = loginEmailInput.value;
    const loginPassword = loginPasswordInput.value;

    // Retrieve stored registration data from local storage
    const regEmail = localStorage.getItem("email");
    const regPassword = localStorage.getItem("password");

    if (loginEmail === regEmail && loginPassword === regPassword) {
        // Email and password match, redirect to the appropriate package
        switch (packageId) {
            case "pack1":
                window.location.href = 'regular_p.html';
                break;
            case "pack2":
                window.location.href = 'Mid-level_package.html';
                break;
            case "pack3":
                window.location.href = 'Luxury.html';
                break;
            case "pack4":
                window.location.href = 'Super-Luxury-Package.html';
                break;
            default:
                // Default redirection if no specific conditions match
                window.location.href = 'default.html';
        }
    } else {
        alert("Invalid email or password");
    }
}

document.addEventListener("DOMContentLoaded", function() {
    // Get the package buttons
    const packageButtons = document.querySelectorAll(".package-button");

    // Add click event listeners to the package buttons
    packageButtons.forEach(button => {
        button.addEventListener("click", function(event) {
            event.preventDefault(); // Prevent default form submission (if any)
            const packageId = this.id; // Get the package ID from the button's id
            redirectToPackage(packageId);
        });
    });
});
