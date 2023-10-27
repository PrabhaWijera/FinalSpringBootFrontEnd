

document.addEventListener("DOMContentLoaded",function (){
    alert("  Dash Board!!!" );
    localStorage.setItem("GUIDEToken",JSON.stringify("eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyUm9sZSI6IkFfR1VJREUiLCJzdWIiOiJhZG1pbmd1aWRlMjAwMSIsImlhdCI6MTY5ODIxNjUwOCwiZXhwIjo0ODUxODE2NTA4fQ.hQqMDON3iG7ANAOS45k064KfmpdgqOXpZ2T7bgIBFJ4"));
    localStorage.setItem("VEHIToken",JSON.stringify("eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyUm9sZSI6IkFfVkVISUNMRSIsInN1YiI6InZlaGkyMDAxIiwiaWF0IjoxNjk4MjE3ODY0LCJleHAiOjQ4NTE4MTc4NjR9.XdlpJELspG2kIHotbtx9WTmywt03QSV1qwoLigO6kKE"));
    localStorage.setItem("HOTELToken",JSON.stringify("eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyUm9sZSI6IkFfSE9URUwiLCJzdWIiOiJob3RlbDIwMDEiLCJpYXQiOjE2OTgyMTczMjMsImV4cCI6NDg1MTgxNzMyM30.wHic2oKFfSTxMqLKMbV96Z9bnYgdyE_EaacnOGG2Lz8"));
    localStorage.setItem("AD_USERTK",JSON.stringify("eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyUm9sZSI6IkFEX1VTRVIiLCJzdWIiOiJ1c2VyYWRtaW4yMDAxIiwiaWF0IjoxNjk4MjE4NDMyLCJleHAiOjQ4NTE4MTg0MzJ9.ojHdxgx9k3lJMdNwjYei4eNE2DPM7EWO9Ttjx2eJCog"));
    localStorage.setItem("PAYToken",JSON.stringify("eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyUm9sZSI6IkFfUEFZTUVOVCIsInN1YiI6InBheTIwMDEiLCJpYXQiOjE2OTgyMTc0NjcsImV4cCI6NDg1MTgxNzQ2N30.d91AdCqnITrzGbsMPvQNr0vYLDtmBocuvcBnep9hC-A"));
    localStorage.setItem("PCKGToken",JSON.stringify("eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyUm9sZSI6IkFfUEFDS0FHRSIsInN1YiI6InBhY2thZ2UyMDAxIiwiaWF0IjoxNjk4MjE4MTgzLCJleHAiOjQ4NTE4MTgxODN9.M4bzixa7mGlo-mmyhasByViBgMooTU_t5T4YvAyzmh0"));


    $(document).ready(function() {

        $("#AdminButton").on("click", function() {
            event.preventDefault();
            saveAdmin();
        });

    });
});

    //storage save



function saveAdmin(message) {
    var tokenKey;
    var loginEmailInput = document.getElementById("Admin_email");
    var loginPasswordInput = document.getElementById("Admin_password");
    var loginRoleInput = document.getElementById("Admin_Role");

        const username = loginEmailInput.value;
        const loginPassword = loginPasswordInput.value;
        const loginRole = loginRoleInput.value;

        alert("Login ");

        const selectedService=loginRole;
    // Retrieve the JWT token from localStorage

    switch (selectedService) {
        case "A_GUIDE":
            alert("Guide Service");
            tokenKey = "GUIDEToken";
            break;
        case "A_HOTEL":
            alert("Hotel Service");
            tokenKey = "HOTELToken";
            break;
        case "A_PAYMENT":
            alert("Payment Service");
            tokenKey = "PAYToken";
            break;
        case "A_VEHICLE":
            alert("Vehicle Service");
            tokenKey = "VEHIToken";
            break;
        case "A_PACKAGE":
            alert("Package Service");
            tokenKey = "PCKGToken";
            break;
        default:
            return alert("Unknown role. Please check your credentials.");
    }

    console.log(tokenKey);
    let token = JSON.parse(localStorage.getItem(tokenKey));

        $.ajax({
            url: "http://localhost:8080/api/v1/userApi/getUserByUserName?username=" + username + "&password=" + loginPassword,
            method:"GET",
            async:true,
            headers:{
                "Authorization":"Bearer "+ token
            },
            success: (res) => {
               /* if (res.userName === username && res.role === loginRole && res.data.isAuthenticated){*/
                if (res.statusCode === 200 || res.statusCode === 0 ){
                    alert("sucess"+res.data.role);
                    alert("sucess"+res.data.isAuthenticated);
                    switch (selectedService) {
                        case "A_GUIDE":
                            window.location.href = 'dashbords/guide/guide.html';
                            break;
                        case "A_HOTEL":
                            window.location.href = 'dashbords/hotels/hotels.html';
                            break;
                        case "A_PAYMENT":
                            window.location.href = 'dashbords/pay/payent.html';
                            break;
                        case "A_VEHICLE":
                            window.location.href = 'dashbords/vehi/vehicles.html';
                            break;
                        case "A_PACKAGE":
                            window.location.href = 'dashbords/packagedetails/packagedetails.html';
                            break;
                    }
                } else {
                    alert("Bad Credentials!!!!");
                }
            },
            error:(error)=>{
                return alert("An error occured while authenticated with sever ");
            }

        });


    }










/*
localStorage.setItem("GUIDEToken", JSON.stringify("eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyUm9sZSI6IkFfR1VJREUiLCJzdWIiOiJhZG1pbmd1aWRlMjAwMSIsImlhdCI6MTY5ODIxNjUwOCwiZXhwIjo0ODUxODE2NTA4fQ.hQqMDON3iG7ANAOS45k064KfmpdgqOXpZ2T7bgIBFJ4")); // Replace with your actual token
*/

/*
$(document).ready(function () {
    $("#AdminButton").on("click", function () {
        event.preventDefault();
        saveAdmin();
    });
});

function saveAdmin() {
    const loginEmailInput = document.getElementById("Admin_email");
    const loginPasswordInput = document.getElementById("Admin_password");
    const loginRoleInput = document.getElementById("Admin_Role");

    const username = loginEmailInput.value;
    const loginPassword = loginPasswordInput.value;
    const loginRole = loginRoleInput.value;

    var token = JSON.parse(localStorage.getItem("GUIDEToken"));
    if (loginRole === "A_GUIDE") {


        // Check if the token is available
        if (token) {
            $.ajax({
                url: "http://localhost:8080/api/v1/userApi/getUserByUserName?username=" + username + "&password=" + loginPassword,
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + token
                },
                success: (res) => {
                    if (res.isAuthenticated && res.role === loginRole) {
                        // Redirect to the guide page
                        window.location.href = 'dashboards/guide/guide.html';
                    } else {
                        alert("Bad Credentials!!!!");
                    }
                },
                error: (error) => {
                    alert("An error occurred while authenticating with the server");
                }
            });
        } else {
            alert("Token not found. Please log in again.");
        }
    } else {
        alert("Unknown role. Please check your credentials.");
    }
}
*/
