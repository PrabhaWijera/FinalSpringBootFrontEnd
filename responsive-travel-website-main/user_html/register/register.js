$("#submit").onclick(function (){
   register();
});

function uploadImage(file, successCallback, errorCallback) {
    const data = new FormData();
    data.append("myFile", file);



    $.ajax({
        url: "http://localhost:8080/api/v1/auth/register", // Replace with the correct upload endpoint
        method: "POST",
        async: true,
        contentType: false,
        processData: false,
        data: data,
        success: successCallback,
        error: errorCallback,
    });
}
// Store the JWT token in a cookie
// Store the JWT token in a cookie
// Function to store the JWT token in a cookie

// Function to handle customer data save
function register() {
    const UserNic_Photo = $("#userNic_Photo")[0].files[0];

    // Ensure the user selected a file
    if (!UserNic_Photo) {
        alert("Please select a NIC photo.");
        return;
    }

    let uId = $("#userid").val();
    let Name = $("#name").val();
    let nic = $("#nic").val();
    let password = $("#password").val();
    let Gender = $("#gender").val();
    let Age = $("#age").val();
    let Email = $("#email").val();
    let ContactNumber = $("#contactNumber").val();
    let Remark = $("#remark").val();

    // Retrieve the JWT token from the cookie

        const jwtToken='eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJTaGFuaSIsImlhdCI6MTY5NzcxNTA5NywiZXhwIjo0ODUxMzE1MDk3fQ.DH8Jv2vpAPge6l2HLh7d3JrXv1tvSVcuWuuubUj8ru8';

        localStorage.setItem('JWT',jwtToken);

        const storedToken=localStorage.getItem('JWT');
    alert(storedToken);
    if (!storedToken) {
        alert("JWT token not found. Please log in.");
        return;
    }

    // Continue with your code to make the AJAX request with the JWT token
    $.ajax({
        url: "http://localhost:8080/api/v1/auth/register", // Replace with the correct save endpoint
        method: "POST",
        async: true,
        data: JSON.stringify({
            "user_id": uId,
            "userName": Name,
            "user_nic": nic,
            "user_password": password,
            "gender": Gender,
            "age": Age,
            "email": Email,
            "contactNumber": ContactNumber,
            "remark": Remark,
            "userNic_Photo": UserNic_Photo
        }),
        dataType: "json",
        contentType: "application/json",
        headers: {
            "Authorization": "Bearer " + storedToken, // Include the JWT token in the header
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        success: function (resp) {
            try {
                const jsonResponse = JSON.parse(resp);
                console.log(jsonResponse);
                alert(jsonResponse.message);
                uploadImage(UserNic_Photo, function () {
                    alert("Successfully Uploaded");
                    swal("Done!", "Customer saved successfully");
                }, function (err) {
                    console.error(err);
                    swal("Error", "An error occurred while saving the customer");
                });
            } catch (error) {
                console.error("Error parsing JSON response:", error);
            }
        },
    });
}




/*
$(document).ready(function () {
    $("#submit").on("click", function () {
        // Retrieve user input
        const U_name = $("#name").val();
        const U_contactNumber = $("#contactNumber").val();
        const U_nic = $("#nic").val();
        const U_password = $("#password").val();
        const U_gender = $("#gender").val();
        const U_age = $("#age").val();
        const U_email = $("#email").val();

        // Client-side validation
        if (!validateInput(U_name, U_contactNumber, U_nic, U_password, U_gender, U_age, U_email)) {
            alert("Please fill in all fields with valid data.");
            return;
        }

        // Send data to the server
        const userData = {
            name: U_name,
            contactNumber: U_contactNumber,
            nic: U_nic,
            password: U_password, // Do not store the plain password, hash it on the server
            gender: U_gender,
            age: U_age,
            email: U_email,
        };
        alert("awa");
        $.ajax({
            url: "http://localhost:8080/api/v1/auth/register",


            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(userData),
            success: function (resp) {
                console.log(resp);
                alert(resp.message);
                uploadImage();
            },
            error: function (error) {
                let errorResponse = JSON.parse(error.responseText);
                alert(errorResponse.message);
            },
        });
    });
});

function uploadImage() {
    // Retrieve the selected profile picture file
    let fileInput = $("#userNic_Photo")[0];
    if (fileInput.files.length === 0) {
        alert("Please select a profile picture.");
        return;
    }
    let file = fileInput.files[0];

    // Send the image to the server
    var formData = new FormData();
    formData.append("myFile", file);

    $.ajax({
        url: "http://localhost:8080/api/v1/auth/register",
        method: "POST",
        contentType: false,
        processData: false,
        data: formData,
        success: function (resp) {
            alert("Image successfully uploaded.");
        },
        error: function (err) {
            console.log(err);
        },
    });
}

function validateInput(name, contactNumber, nic, password, gender, age, email) {
    // Add validation logic for each field
    if (!name || !contactNumber || !nic || !password || !gender || !age || !email) {
        return false;
    }
    // You can add more specific validation rules here (e.g., email format, password strength, etc.)
    return true;
}

function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + "; " + expires + "; secure; HttpOnly; SameSite=Strict";
}

// Usage:
// Replace 'yourTokenValue' with the actual JWT token and set the appropriate expiration time (in days).
setCookie("jwtToken", "yourTokenValue", 7); // Example: 7 days expiration
*/
