function loginUser() {
    const loginEmail = document.getElementById("email").value;
    const loginPassword = document.getElementById("password").value;

    // Retrieve stored registration data from local storage
    const regEmail = localStorage.getItem("email");
    const regPassword = localStorage.getItem("password");
    alert("  email or  ");

    if (loginEmail === regEmail && loginPassword === regPassword) {
        // Successful login, navigate to the "regular.html" page
        window.location.href = "../regular_p.html";
    } else {
        // Invalid login, show an error message
        alert("Invalid email or password");
    }
}
