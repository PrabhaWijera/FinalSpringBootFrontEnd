
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



    const VEHIToken="eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIiLCJpYXQiOjE2OTc4MTU2MTEsImV4cCI6NDg1MTQxNTYxMX0.XbKA4wCf_c-YATdFf0vW75Y9zfvZ174xNZ-53wjio2w";
    const HotelToken="eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIiLCJpYXQiOjE2OTc4MTU4NzgsImV4cCI6NDg1MTQxNTg3OH0.N6Lu8rErrFQ-7iyTFwv7F2FivQUnfu-4ZazPqOsGn5w";
    const PaymentToken="eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIiLCJpYXQiOjE2OTc4MTYxNTcsImV4cCI6NDg1MTQxNjE1N30.cAuVZ0bcrgOhJRXW3cS1JJRpEVpO95AUfd9GGnyUGJM";
    const PackageToken="eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIiLCJpYXQiOjE2OTc4MTYxMTAsImV4cCI6NDg1MTQxNjExMH0.A3h4TzbMiyC8jf6Qa6KYGbDv96yQB-aka0wN3i2n7RE";

    localStorage.setItem("Token",JSON.stringify("eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnZyIsImlhdCI6MTY5Nzg2ODc0OCwiZXhwIjo0ODUxNDY4NzQ4fQ.zmSV-0Rtzq2LamzJB-ZEv6PSUrzkyg2PE66W8mFJLKw"));
    localStorage.setItem("VEHIToken",VEHIToken);
    localStorage.setItem("HotelToken",HotelToken);
    localStorage.setItem("PaymentToken",PaymentToken);
    localStorage.setItem("PackageToken",PackageToken);


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
                "Authorization":"Bearer "+JSON.parse(localStorage.getItem("Token"))
            },
            success:(res)=>{
                console.log(res.message);
                if (res.data.isAuthenticated){
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







