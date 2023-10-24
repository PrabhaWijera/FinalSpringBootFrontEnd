localStorage.setItem("GToken",JSON.stringify("eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyUm9sZSI6IkFfR1VJREUiLCJzdWIiOiJHdWlkZUFkbWluIiwiaWF0IjoxNjk4MDY3OTUxLCJleHAiOjQ4NTE2Njc5NTF9.OhcmORuDtQdFOenje84avWQ7Y68SwnugWiREb9vAPGM"));

// Check if the document is ready
$(document).ready(function() {
    // Attach the click event handler to the "payAddButton"
    $("#guideAddButton").on("click", function() {
        OnSaveGuide();
    });
    // update the click event handler to the "payAddButton"
    $("#gUpdateButton").on("click", function() {
        OnUpdateGuide();
    });

});

function OnSaveGuide() {
    // Retrieve form data

    let ID = $("#gId").val();
    let name = $("#gName").val();
    let age = $("#age").val();
    let addres = $("#gAddress").val();

    // Create an object to store the data
    const data = {
        guideID:ID,
        guideName:name,
        guideAge:age,
        guideAddress:addres


    };

    // Retrieve the JWT token from localStorage
    let token = localStorage.getItem("GToken");
    console.log(token)
    // Check if the token is valid
    if (!token) {
        alert("Token not found. Please log in.");
        return;
    }

    // Make the AJAX request to save the payment data
    $.ajax({
        url: "http://localhost:8085/api/v1/guide/Gsave",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(data),
        headers: {
            "Authorization": "Bearer " + JSON.parse(localStorage.getItem("GToken"))

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
//update
function OnUpdateGuide() {
    // Retrieve form data

    let ID = $("#ugId").val();
    let name = $("#ugName").val();
    let age = $("#uage").val();
    let addres = $("#ugAddress").val();

    // Create an object to store the data
    const data = {
        guideID:ID,
        guideName:name,
        guideAge:age,
        guideAddress:addres


    };

    // Retrieve the JWT token from localStorage
    let token = localStorage.getItem("GToken");
    console.log(token)
    // Check if the token is valid
    if (!token) {
        alert("Token not found. Please log in.");
        return;
    }

    // Make the AJAX request to save the payment data
    $.ajax({
        url: "http://localhost:8085/api/v1/guide/Gput",
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify(data),
        headers: {
            "Authorization": "Bearer " + JSON.parse(localStorage.getItem("GToken"))

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