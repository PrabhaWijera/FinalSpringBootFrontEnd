function loginUser() {
    // Get user input
    const loginEmail = document.getElementById("email").value;
    const loginPassword = document.getElementById("password").value;

    // Retrieve stored registration data from local storage
    const regEmail = localStorage.getItem("email");
    const regPassword = localStorage.getItem("password");

    // Input validation: Check if fields are not empty
    if (!loginEmail || !loginPassword) {
        alert("Please fill in both email and password fields");
        return;
    }

    // Check if the entered credentials match the stored data
    if (loginEmail === regEmail && loginPassword === regPassword) {
        // Successful login, navigate to the "regular.html" page
        window.location.href = "regular_p.html";
    } else {
        // Invalid login, show an error message
        alert("Invalid email or password");
    }
}
