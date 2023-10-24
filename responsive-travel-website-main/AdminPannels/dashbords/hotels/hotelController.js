localStorage.setItem("HToken",JSON.stringify("eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyUm9sZSI6IkFfSE9URUwiLCJzdWIiOiJob3RlbEFkbWluIiwiaWF0IjoxNjk4MDY4MjgzLCJleHAiOjQ4NTE2NjgyODN9.gvI62fX0TSVJyO6JDlISC2yFHoZdGLF6lC2RGyD2exw"));

// Check if the document is ready
$(document).ready(function() {
    // Attach the click event handler to the "payAddButton"
    $("#hotelAddButton").on("click", function() {
        OnSaveHotel();
    });

    $("#hUpdateButton").on("click", function() {
        OnUpdateHotel();
    });


});

function OnSaveHotel() {
    // Retrieve form data

    let ID = $("#hId").val();
    let name = $("#hName").val();
    let cate = $("#hCategory").val();
    let address = $("#hAddress").val();

    // Create an object to store the data
    const data = {
        hotelId:ID,
        hotelName:name,
        hotelCategory:cate,
        hotelLocation:address


    };

    // Retrieve the JWT token from localStorage
    let token = localStorage.getItem("HToken");
    console.log(token)
    // Check if the token is valid
    if (!token) {
        alert("Token not found. Please log in.");
        return;
    }

    // Make the AJAX request to save the payment data
    $.ajax({
        url: "http://localhost:8083/api/v1/hotel/h_save",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(data),
        headers: {
            "Authorization": "Bearer " + JSON.parse(localStorage.getItem("HToken"))

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
// update
function OnUpdateHotel() {
    // Retrieve form data


    let ID = $("#huId").val();
    let name = $("#huName").val();
    let cate = $("#huCategory").val();
    let address = $("#huAddress").val();

    // Create an object to store the data
    const data = {
        hotelId:ID,
        hotelName:name,
        hotelCategory:cate,
        hotelLocation:address


    };

    // Retrieve the JWT token from localStorage
    let token = localStorage.getItem("HToken");
    console.log(token)
    // Check if the token is valid
    if (!token) {
        alert("Token not found. Please log in.");
        return;
    }

    // Make the AJAX request to save the payment data
    $.ajax({
        url: "http://localhost:8083/api/v1/hotel/h_put",
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify(data),
        headers: {
            "Authorization": "Bearer " + JSON.parse(localStorage.getItem("HToken"))

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