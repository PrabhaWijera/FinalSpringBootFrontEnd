
/*document.addEventListener("DOMContentLoaded", function() {
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
localStorage.clear()*/;


document.addEventListener("DOMContentLoaded", function() {
    //storage save

    localStorage.setItem("GUIDEToken",JSON.stringify("eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJHVUlERSIsImlhdCI6MTY5Nzg5NjQ1OSwiZXhwIjo0ODUxNDk2NDU5fQ.0sH_wTYKOGS9Uzm29jRfg8nd3nFlMJxJaZ9e4NqatTs"));
    localStorage.setItem("VEHIToken",JSON.stringify("eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJWRUhJQ0xFIiwiaWF0IjoxNjk3ODk2NDk3LCJleHAiOjQ4NTE0OTY0OTd9.YYji2_hYdPUZWpssO8jX6ZsrWjbR2b3WEdsH6sCF0-s"));
    localStorage.setItem("HOTELToken",JSON.stringify("eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJIT1RFTCIsImlhdCI6MTY5Nzg5NjU2NCwiZXhwIjo0ODUxNDk2NTY0fQ.yzKP6G1MRCAfvoh9mliWx6s0iLd6Typa1qG2TNWBLo4"));

    localStorage.setItem("PAYToken",JSON.stringify("eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJQQVlNRU5UIiwiaWF0IjoxNjk3ODk2NTE3LCJleHAiOjQ4NTE0OTY1MTd9.YQ-2bPNzMAoNrdabk0dYWUV4LfBraNZhEGLHyUoai9M"));
    localStorage.setItem("PCKGToken",JSON.stringify("eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJQQUNLQUdFIiwiaWF0IjoxNjk3ODk2NTgzLCJleHAiOjQ4NTE0OTY1ODN9.A52CFSxFNmjLf5YCNnmewvU1fh6kEDRZtqxsBG-F8GY"));


    alert("  Dash Board!!!" );
});


    const loginEmailInput = document.getElementById("Admin_email");
    const loginPasswordInput = document.getElementById("Admin_password");
    const loginRoleInput = document.getElementById("Admin_Role");
    const loginButton = document.getElementById("AdminButton");

    loginButton.addEventListener("click", saveAdmin);


function saveAdmin(message) {
        const loginEmail = loginEmailInput.value;
        const loginPassword = loginPasswordInput.value;
        const loginRole = loginRoleInput.value;

        alert("Login ");

        const selectedService=loginRole;

        $.ajax({
            url:"http://localhost:8080/api/v1/userApi/getUserByUserName?useremail="+ loginEmail + "&password="+ loginPassword,
            method:"GET",
            async:true,
            headers:{
                "Authorization":"Bearer "+JSON.parse(localStorage.getItem("GUIDEToken"))
            },
            success:(res)=>{
                console.log(res.message);
                if (res.data.isAuthenticated && data.role){
                    alert("Directing");

                    switch (selectedService){

                        case "Guide Service":
                            alert("Login SuccessFull");
                            window.location.href="dashbords/guide/guide.html";
                            break;

                        case "Hotel Service":
                            window.location.href="dashbords/hotels/hotels.html";
                            break;
                        case "Payment Service":
                            window.location.href="dashbords/pay/payent.html";
                            break;
                        case "Vehicle Service":
                            window.location.href="dashbords/vehi/vehicles.html";
                            break;
                        case "Package Service":
                            window.location.href="dashbords/packagedetails/packagedetails.html";
                            break;
                    }
                }
                return alert(
                    "Bad Credentials!!!!","OOPS","ERRORS"
                )
            },
            error:(error)=>{
                return alert("An error occured while authenticated with sever ");
            }

        });


    }


$("#AdminButton").on("click", function() {
    saveAdmin();
});







