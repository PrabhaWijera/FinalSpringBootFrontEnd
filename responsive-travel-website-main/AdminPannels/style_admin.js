
/*
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
localStorage.clear()*!/;

*/

document.addEventListener("DOMContentLoaded", function() {
    //storage save

    localStorage.setItem("GUIDEToken",JSON.stringify("eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyUm9sZSI6IkFfR1VJREUiLCJzdWIiOiJhZG1pbmd1aWRlMjAwMSIsImlhdCI6MTY5ODIxNjUwOCwiZXhwIjo0ODUxODE2NTA4fQ.hQqMDON3iG7ANAOS45k064KfmpdgqOXpZ2T7bgIBFJ4"));
    localStorage.setItem("VEHIToken",JSON.stringify("eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyUm9sZSI6IkFfVkVISUNMRSIsInN1YiI6InZlaGkyMDAxIiwiaWF0IjoxNjk4MjE3ODY0LCJleHAiOjQ4NTE4MTc4NjR9.XdlpJELspG2kIHotbtx9WTmywt03QSV1qwoLigO6kKE"));
    localStorage.setItem("HOTELToken",JSON.stringify("eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyUm9sZSI6IkFfSE9URUwiLCJzdWIiOiJob3RlbDIwMDEiLCJpYXQiOjE2OTgyMTczMjMsImV4cCI6NDg1MTgxNzMyM30.wHic2oKFfSTxMqLKMbV96Z9bnYgdyE_EaacnOGG2Lz8"));
    localStorage.setItem("AD_USERTK",JSON.stringify("eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyUm9sZSI6IkFEX1VTRVIiLCJzdWIiOiJ1c2VyYWRtaW4yMDAxIiwiaWF0IjoxNjk4MjE4NDMyLCJleHAiOjQ4NTE4MTg0MzJ9.ojHdxgx9k3lJMdNwjYei4eNE2DPM7EWO9Ttjx2eJCog"));
    localStorage.setItem("PAYToken",JSON.stringify("eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyUm9sZSI6IkFfUEFZTUVOVCIsInN1YiI6InBheTIwMDEiLCJpYXQiOjE2OTgyMTc0NjcsImV4cCI6NDg1MTgxNzQ2N30.d91AdCqnITrzGbsMPvQNr0vYLDtmBocuvcBnep9hC-A"));
    localStorage.setItem("PCKGToken",JSON.stringify("eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyUm9sZSI6IkFfUEFDS0FHRSIsInN1YiI6InBhY2thZ2UyMDAxIiwiaWF0IjoxNjk4MjE4MTgzLCJleHAiOjQ4NTE4MTgxODN9.M4bzixa7mGlo-mmyhasByViBgMooTU_t5T4YvAyzmh0"));


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
                if (res.data.isAuthenticated && res.data.role === loginRole){
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







