
document.addEventListener("DOMContentLoaded", function() {
    // Store user data in localStorage when the page loads
    localStorage.setItem("GUIDE@gmail.com", "0000:GUIDE");
    localStorage.setItem("PAY@gmail.com", "1234:PAY");
    localStorage.setItem("HOTEL@gmail.com", "5678:HOTEL");
    localStorage.setItem("VEHI@gmail.com", "5688:VEHICLE");
    localStorage.setItem("PACKAGE@gmail.com", "9988:PACKAGE");

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
                    window.location.href = 'dashbords/guide/guide.html';
                    alert("Login successful GUIDE!");
                } else if (loginRole === "PAY") {
                    window.location.href = 'dashbords/pay/payent.html';
                    alert("Login successful PAY!");
                } else if (loginRole === "HOTEL") {
                    window.location.href = 'dashbords/hotels/hotels.html';
                    alert("Login successful HOTEL!");
                }else if (loginRole === "VEHICLE") {
                        window.location.href = 'dashbords/vehi/vehicles.html';
                        alert("Login successful VEHICLE!");
                }else if (loginRole === "PACKAGE") {
                    window.location.href = 'dashbords/packagedetails/packagedetails.html';
                    alert("Login successful PACKAGE");
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
localStorage.clear();