swal("Welcome To Customer Panel 👤");
localStorage.setItem("AD_USER",JSON.stringify("eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyUm9sZSI6IkFEX1VTRVIiLCJzdWIiOiJ1c2VyYWRtaW4yMDAxIiwiaWF0IjoxNjk4MjE4NDMyLCJleHAiOjQ4NTE4MTg0MzJ9.ojHdxgx9k3lJMdNwjYei4eNE2DPM7EWO9Ttjx2eJCog"));

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
    let U_Name = $("#Name").val();
    let UserNIC = $("#usernic").val();
    let userPassword = $("#userpassword").val();
    let Gender = $("#gender").val();
    let Address = $("#address").val();
    let UserAge = $("#age").val();
    let Email = $("#email").val();
    let contactNO = $("#contactNumber").val();
    let UserNicIMG = $("#userNic_Photo").val();
    let remark = $("#remark").val();


    // Create an object to store the data
    const data = {
        userId:ID,
        name:name,
        userName:U_Name,
        userNIC:UserNIC,
        userPassword:userPassword,
        gender:Gender,
        userAddress:Address,
        userAge:UserAge,
        userEmail:Email,
        userPhone:contactNO,
        userImageLocation:UserNicIMG,
        remarks:remark,
        isAuthenticated:false
    };

    // Retrieve the JWT token from localStorage
    let token = localStorage.getItem("AD_USER");
    console.log(token)
    // Check if the token is valid
    if (!token) {
        swal("Token not found. Please log in.");
        return;
    }

    // Make the AJAX request to save the payment data
    $.ajax({
        url: "http://localhost:8080/api/v1/auth/getAuth",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(data),
        headers: {
            "Authorization": "Bearer " + JSON.parse(localStorage.getItem("AD_USER"))

        },

        success: function (response) {
            alert("res"+response)
            if (response.statusCode === 200 || response.statusCode === 201 )
                swal("Save successful");
            // You can handle the response from the server here if needed
        },
        error: function (xhr, textStatus, errorThrown) {
            swal("Error: " + xhr.responseText);

        }
    });
}


