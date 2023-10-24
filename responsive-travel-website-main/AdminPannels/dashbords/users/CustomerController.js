localStorage.setItem("AD_USER",JSON.stringify("eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyUm9sZSI6IkFEX1VTRVIiLCJzdWIiOiJhZG1pblVzZXIyMDAxIiwiaWF0IjoxNjk4MTUyNDMwLCJleHAiOjQ4NTE3NTI0MzB9.xw17OLiV8dS54uviHl8jtR1KrTn6difopKvdM1hYndk"));

// Check if the document is ready
$(document).ready(function() {
    // Attach the click event handler to the "payAddButton"
    $("#cusAddButton").on("click", function() {
        OnSaveUser();
    });





});

function OnSaveUser() {
    // Retrieve form data

    let ID = $("#userid").val();
    let name = $("#userName").val();
    let nic = $("#usernic").val();
    let pass = $("#userpassword").val();

    // Create an object to store the data
    const data = {
        userId:ID,
        name:name,
        userNIC:nic,
        userPassword:pass


    };

    // Retrieve the JWT token from localStorage
    let token = localStorage.getItem("AD_USER");
    console.log(token)
    // Check if the token is valid
    if (!token) {
        alert("Token not found. Please log in.");
        return;
    }

    // Make the AJAX request to save the payment data
    $.ajax({
        url: "http://localhost:8080/api/v1/userApi/saveUser",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(data),
        headers: {
            "Authorization": "Bearer " + JSON.parse(localStorage.getItem("AD_USER"))

        },

        success: function (response) {
            alert("res"+response)
            if (response.statusCode === 200 || response.statusCode === 201 )
                alert("Save successful");
            // You can handle the response from the server here if needed
        },
        error: function (xhr, textStatus, errorThrown) {
            alert("Error: " + xhr.responseText);

        }
    });
}


