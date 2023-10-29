/*
$("#loginButton").click(function() {
    loginUser();
});

const loginEmailInput = document.getElementById("email");
const loginPasswordInput = document.getElementById("password");

function loginUser() {
    const loginEmail = loginEmailInput.value;
    const loginPassword = loginPasswordInput.value;

    const regEmail = localStorage.getItem("email");
    const regPassword = localStorage.getItem("password");

    const regular = localStorage.getItem("Regular");
    const mid = localStorage.getItem("MID");
    const lux = localStorage.getItem("LuxValue");
    const s_lux = localStorage.getItem("SuperLux");

    const regEmailString = String(regEmail);
    const regPasswordString = String(regPassword);

    const regularString = String(regular);
    const midString = String(mid);
    const luxString = String(lux);
    const s_luxString = String(s_lux);

    // Check if registration data is available
    if (!regEmailString || !regPasswordString) {
        alert("No registration data found. Please sign up.");
        return;
    }

    // Check if login credentials match registration data
    if (loginEmail === regEmailString && loginPassword === regPasswordString) {
        alert("Successful login");

        // Log the user's package information
        console.log("Regular:", regularString);
        console.log("Mid:", midString);
        console.log("Lux:", luxString);
        console.log("SuperLux:", s_luxString);

        // Redirect the user based on their package
        redirectToPackagePage(regularString, midString, luxString, s_luxString);
    } else {
        alert("Invalid email or password");
    }
}

function redirectToPackagePage(regular, mid, lux, s_lux) {
    switch (true) {
        case regular === "1":
            window.location.href = 'regular_p.html';
            break;
        case mid === "2":
            window.location.href = 'Mid-level_package.html';
            break;
        case lux === "3":
            window.location.href = 'Luxury.html';
            break;
        case s_lux === "4":
            window.location.href = 'Super-Luxury-Package.html';
            break;
        default:
            alert("Unknown package");
    }
}
*/


const regular = localStorage.getItem("Regular");
const mid = localStorage.getItem("MID");
const lux = localStorage.getItem("LuxValue");
const s_lux = localStorage.getItem("SuperLux");

document.addEventListener("DOMContentLoaded",function (){

    $(document).ready(function() {

        $("#AdminButton").on("click", function() {
            event.preventDefault();
            logingCustomer();
        });

    });
});

//storage save


$(document).ready(function () {
    $("#loginForm").on("submit", function (event) {
        event.preventDefault();
        logingCustomer();
    });
});

function logingCustomer() {
    var loginUNameInput = $("#username").val();
    var loginPasswordInput = $("#password").val();

    var tokenKey;
    var roleMap = {
        "1": "regular_p.html",
        "2": "Mid-level_package.html",
        "3": "Luxury.html",
        "4": "Super-Luxury-Package.html"
    };

    // Retrieve the selected role from local storage
    var selectedRole = localStorage.getItem("SelectedPackage");

    switch (selectedRole) {
        case "1":
        case "2":
        case "3":
        case "4":
            tokenKey = "userAuthToken";
            break;
        default:
            return swal("Unknown role. Please check your credentials.");
    }

    var token = localStorage.getItem(tokenKey);

    $.ajax({
        url: "http://localhost:8080/api/v1/userApi/getUserByUserName?username=" + loginUNameInput + "&password=" + loginPasswordInput, // Adjust the URL to your login endpoint
        method: "GET",

        headers: {
            "Authorization": "Bearer " + JSON.stringify(localStorage.getItem("userAuthToken"))
        },
        success: function (res) {
            if (res.data.authenticated && res.data.userRole === "user") {
                alert("login awa");
                localStorage.setItem("userDetails",JSON.stringify(res.data))
                swal("Success" + res.data.role);
                var destination = roleMap[selectedRole];
                if (destination) {
                    window.location.href = destination;
                }
            } else {
                swal("Bad Credentials!!!!");
            }
        },
        error: function (error) {
            return swal("An error occurred while authenticating with the server");
        }
    });
}
