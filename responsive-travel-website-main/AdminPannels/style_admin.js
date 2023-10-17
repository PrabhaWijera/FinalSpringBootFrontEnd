
document.addEventListener("DOMContentLoaded", function() {
    // Store user data in localStorage when the page loads
    localStorage.setItem("GUIDE@gmail.com", "0000:GUIDE");
    localStorage.setItem("USER@gmail.com", "1234:USER");
    localStorage.setItem("HOTEL@gmail.com", "5678:HOTEL");

    const loginEmailInput = document.getElementById("Admin_email");
    const loginPasswordInput = document.getElementById("Admin_password");
    const loginRoleInput = document.getElementById("Admin_Role");
    const loginButton = document.getElementById("AdminButton");

    loginButton.addEventListener("click", loginAdmin);

    function loginAdmin() {
        const loginEmail = loginEmailInput.value;
        const loginPassword = loginPasswordInput.value;
        const loginRole = loginRoleInput.value;

        // Retrieve user data from localStorage
        const userData = localStorage.getItem(loginEmail);

        if (userData) {
            const [storedPassword, storedRole] = userData.split(':');

            // Compare the input values with the stored data
            if (loginPassword === storedPassword && loginRole === storedRole) {
                alert("Login successful!");
                if (loginRole === "GUIDE") {
                  /*  window.location.href = '';*/
                    alert("Login successful1111!");
                } else if (loginRole === "USER") {
                   /* window.location.href = 'user_page.html';*/
                    alert("Login successful2222!");
                } else if (loginRole === "HOTEL") {
                   /* window.location.href = 'hotel_page.html';*/
                    alert("Login successful3333!");
                } else {
                    alert("Unknown role. Please check your credentials.");
                }
            } else {
                alert("Login failed. Please check your credentials.");
            }
        } else {
            alert("User not found. Please check your email.");
        }
    }
});