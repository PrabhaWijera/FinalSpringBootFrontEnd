localStorage.setItem("VToken",JSON.stringify("eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyUm9sZSI6IkFfVkVISUNMRSIsInN1YiI6InZlaGljbGVBZG1pbiIsImlhdCI6MTY5ODA2ODA5MywiZXhwIjo0ODUxNjY4MDkzfQ.nQTckOEDGVWtQq8ha3AWhsmNx8TIR10Xe73yQBqeABg"));

// Check if the document is ready
$(document).ready(function() {
    // Attach the click event handler to the "payAddButton"
    $("#vehiAddButton").on("click", function() {
        OnSaveVehicle();
    });

    // update the click event handler to the "payAddButton"
    $("#vUpdateButton").on("click", function() {
        OnUpdateVehicle();
    });


    $("#deletevehi").on("click", function() {
        OnDeleteVehicle();
    });

    $("#getAllButton").on("click", function() {
        OnGetAllVehicle();
    });

});

function OnSaveVehicle() {
    // Retrieve form data

    let ID = $("#vId").val();
    let brand = $("#vbrand").val();
    let cate = $("#category").val();
    let fula = $("#fueltype").val();

    // Create an object to store the data
    const data = {
        vehicleID:ID,
        vehicleBrand:brand,
        annualIncome:cate,
        fuelType:fula


    };

    // Retrieve the JWT token from localStorage
    let token = localStorage.getItem("VToken");
    console.log(token)
    // Check if the token is valid
    if (!token) {
        alert("Token not found. Please log in.");
        return;
    }

    // Make the AJAX request to save the payment data
    $.ajax({
        url: "http://localhost:8082/api/v1/vehicles/vSave",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(data),
        headers: {
            "Authorization": "Bearer " + JSON.parse(localStorage.getItem("VToken"))

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
function OnUpdateVehicle() {
    // Retrieve form data


    let ID = $("#uvId").val();
    let brand = $("#uvbrand").val();
    let cate = $("#ucategory").val();
    let fula = $("#ufueltype").val();

    // Create an object to store the data
    const data = {
        vehicleID:ID,
        vehicleBrand:brand,
        annualIncome:cate,
        fuelType:fula


    };

    // Retrieve the JWT token from localStorage
    let token = localStorage.getItem("VToken");
    console.log(token)
    // Check if the token is valid
    if (!token) {
        alert("Token not found. Please log in.");
        return;
    }

    // Make the AJAX request to save the payment data
    $.ajax({
        url: "http://localhost:8082/api/v1/vehicles/Vput",
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify(data),
        headers: {
            "Authorization": "Bearer " + JSON.parse(localStorage.getItem("VToken"))

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

//delete
function OnDeleteVehicle() {
    // Retrieve form data


    let ID = $("#uvId").val();


    // Create an object to store the data


    // Retrieve the JWT token from localStorage
    let token = localStorage.getItem("VToken");
    console.log(token)
    // Check if the token is valid
    if (!token) {
        alert("Token not found. Please log in.");
        return;
    }

    // Make the AJAX request to save the payment data
    $.ajax({
        url: "http://localhost:8082/api/v1/vehicles/V_delete"+ID,
        method: "DELETE",
        contentType: "application/json",

        headers: {
            "Authorization": "Bearer " + JSON.parse(localStorage.getItem("VToken"))

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

//get all
function OnGetAllVehicle() {
    // Retrieve form data


    // Make the AJAX request to save the payment data
    $.ajax({
        url: "http://localhost:8082/api/v1/vehicles/V_search",
        method: "GET",
        contentType: "application/json",

        headers: {
            "Authorization": "Bearer " + JSON.parse(localStorage.getItem("VToken"))

        },

        success: function (response) {
            alert("res"+response)
            if (response.statusCode === 200 || response.statusCode === 201 )

                alert("get  successful");
            // You can handle the response from the server here if needed
        },
        error: function (xhr, textStatus, errorThrown) {
            alert("Error: " + xhr.responseText);

        }
    });

}