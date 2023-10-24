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


    $("#getAllButton").on("click", function() {
        OnGetAll();
    });

    $("#deleteGuide").on("click", function() {
        OnDeleteGuide();
    });

    $("#deleteGuide").on("click", function() {
        OnDeleteGuide();
    });



});

function OnSaveGuide() {
    // Retrieve form data

    let ID = $("#gId").val();
    let name = $("#gName").val();
    let age = $("#age").val();
    let addres = $("#gAddress").val();
    let gender = $("#gender").val();
    let guideIMG = $("#guideIMG").val();
    let guideNIC = $("#gNICimg").val();
    let guideingID = $("#gudingIDimg").val();
    let experience = $("#gExperience").val();
    let manValue = $("#mandayValue").val();
    let remark = $("#gremark").val();


    // Create an object to store the data
    const data = {
        guideID:ID,
        guideName:name,
        guideAge:age,
        guideAddress:addres,
        guideGender:gender,
        guidePICIMGLocation:guideIMG,
        guideNICIMGLocation:guideNIC,
        guideIDIMGLocation:guideingID,
        guideExperience:experience,
        manDayValue:manValue,
        remark:remark

    };

    // Retrieve the JWT token from localStorage
    let token = localStorage.getItem("GToken");
    console.log(token)
    // Check if the token is valid
    if (!token) {
        swal("Token not found. Please log in.");
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
                swal("Save successful");
            // You can handle the response from the server here if needed
        },
        error: function (xhr, textStatus, errorThrown) {
            swal("Error: " + xhr.responseText);

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
    let gender = $("#ugender").val();
    let guideIMG = $("#uguideIMG").val();
    let guideNIC = $("#ugNICimg").val();
    let guideingID = $("#ugudingIDimg").val();
    let experience = $("#ugExperience").val();
    let manValue = $("#umandayValue").val();
    let remark = $("#ugremark").val();

    // Create an object to store the data
    const data = {
        guideID:ID,
        guideName:name,
        guideAge:age,
        guideAddress:addres,
        guideGender:gender,
        guidePICIMGLocation:guideIMG,
        guideNICIMGLocation:guideNIC,
        guideIDIMGLocation:guideingID,
        guideExperience:experience,
        manDayValue:manValue,
        remark:remark

    };
    // Retrieve the JWT token from localStorage
    let token = localStorage.getItem("GToken");
    console.log(token)
    // Check if the token is valid
    if (!token) {
        swal("Token not found. Please log in.");
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
            swal("res"+response)
            if (response.statusCode === 200 || response.statusCode === 201 )
                swal("Update successful");
            // You can handle the response from the server here if needed
        },
        error: function (xhr, textStatus, errorThrown) {
            swal("Error: " + xhr.responseText);

        }
    });
}

//get all
function OnGetAll() {
    $.ajax({
        url: "http://localhost:8085/api/v1/guide/getAllGuide",
        method: "GET",
        headers: {
            "Authorization": "Bearer " + JSON.parse(localStorage.getItem("GToken"))
        },
        success: (res) => {
            if (!res.data) {
                // Handle the case when no data is found
                swal("OOPS!", "No data found!", "error");
            } else {
                console.log("Response data:", res.data);

                const tableBody = $("#tbody");
                tableBody.empty(); // Clear the existing table rows

                res.data.forEach((guide) => {
                    let row = "<tr>";
                    row += "<td>" + guide.guideID + "</td>";
                    row += "<td>" + guide.guideName + "</td>";
                    row += "<td>" + guide.guideAddress + "</td>";
                    row += "<td>" + guide.guideAge + "</td>";
                    row += "<td>" + guide.guideGender + "</td>";
                    row += "<td><img src='" + guide.guidePICIMGLocation + "' alt='Guide Image' height='100' width='100'></td>";
                    row += "<td><img src='" + guide.guideNICIMGLocation + "' alt='NIC Image' height='100' width='100'></td>";
                    row += "<td><img src='" + guide.guideIDIMGLocation + "' alt='Guiding ID Image' height='100' width='100'></td>";
                    row += "<td>" + guide.guideExperience + "</td>";
                    row += "<td>" + guide.manDayValue + "</td>";
                    row += "<td>" + guide.remark + "</td>";
                    row += "</tr>";

                    tableBody.append(row);
                });
            }
        },
        error: (xhr, textStatus, errorThrown) => {
            let errorMessage = "An unexpected error occurred.";
            if (xhr.responseJSON && xhr.responseJSON.message) {
                errorMessage = xhr.responseJSON.message;
            }
            swal("OOPS!", "Server error: " + errorMessage, "error");
        }
    });
}

//delete
function OnDeleteGuide() {
    // Retrieve form data
    if ($("#gDID").val() === "") {
        return swal("OOPS!", "Please enter a Guide ID to delete!", "error");
    }

    let token = localStorage.getItem("GToken");
    console.log(token)
    // Check if the token is valid
    if (!token) {
        alert("Token not found. Please log in.");
        return;
    }
    // Make the AJAX request to save the payment data
    $.ajax({
        url: "http://localhost:8085/api/v1/guide/getAllGuide="+ $('#gDID').val(),
        method: "DELETE",
        contentType: "application/json",
        headers: {
            "Authorization": "Bearer " + JSON.parse(localStorage.getItem("GToken"))

        },

        success: function (response) {
            alert("res"+response)
            if (response.statusCode === 200 || response.statusCode === 201 )
                alert("Delete successful");
            // You can handle the response from the server here if needed
        },
        error: function (xhr, textStatus, errorThrown) {
            alert("Error: " + xhr.responseText);

        }
    });
}

//get search
function OnSearchVehicle(event) {
    if (event.key === 'Enter') {
        $.ajax({
            url: "http://localhost:8082/api/v1/vehicles/getVehicleByBrand?vehicleBrand=" + $("#vbrand").val(),
            method: "GET",
            contentType: "application/json",
            headers: {
                "Authorization": "Bearer " + JSON.parse(localStorage.getItem("VToken"))
            },
            success: (res) => {
                console.log(res.data);
                if (res.statusCode === 200 || res.statusCode === 201) {
                    // Populate input fields with retrieved data
                    $("#vId").val(res.data.vehicleID);
                    $("#packageId").val(res.data.package_id);
                    $("#category").val(res.data.vehicleCategory);
                    $("#fueltype").val(res.data.fuelType);

                    // Select the option in the dropdown based on the response
                    $("#hybrid option[value='" + res.data.hybrid + "']").prop('selected', true);

                    $("#fuelusage").val(res.data.fuelUsage);
                    $("#seatCapacity").val(res.data.seatCapacity);
                    $("#vbrand").val(res.data.vehicleBrand);
                    $("#transmissionType").val(res.data.transmissionType);
                    $("#driverName").val(res.data.driverName);
                    $("#conNumber").val(res.data.conNumber);
                    $("#vremark").val(res.data.remarks);

                    // Display a success message
                    swal("Done!", res.message, "success");
                } else {
                    // Display an error message based on the server response
                    swal("OOPS!", res.message, "error");
                }
            },
            error: (xhr, textStatus, errorThrown) => {
                // Handle errors, including server exceptions
                swal("OOPS!", "Server threw an exception: " + xhr.responseJSON.message, "error");
            }
        });
    }
}
