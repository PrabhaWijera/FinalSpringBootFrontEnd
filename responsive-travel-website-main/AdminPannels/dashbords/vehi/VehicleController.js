localStorage.setItem("VToken",JSON.stringify("eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyUm9sZSI6IkFfVkVISUNMRSIsInN1YiI6InZlaGkyMDAxIiwiaWF0IjoxNjk4MjE3ODY0LCJleHAiOjQ4NTE4MTc4NjR9.XdlpJELspG2kIHotbtx9WTmywt03QSV1qwoLigO6kKE"));



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

    $("#csButton").on("click", function() {
        OnSearchVehicle();
    });


    $('#getAllButton').on('click',function (){
        OnGetAll();
    });

});

function OnGetAll() {
    $.ajax({
        url: "http://localhost:8082/api/v1/vehicles/getAllVehicle",
        method: "GET",
        headers: {
            "Authorization": "Bearer " + JSON.parse(localStorage.getItem("VToken"))
        },
        success: (res) => {
            if (!res.data) {
                // Handle the case when no data is found
                swal("OOPS!", "No data found!", "error");
            } else {
                console.log("Response data:", res.data);

                const tableBody = $("#Hbody");
                tableBody.empty(); // Clear the existing table rows

                res.data.map((vehicle) => {
                    // Create a new row for each vehicle
                    let row = "<tr>" +
                        "<td>" + vehicle.vehicleID+ "</td>" +
                        "<td>" + vehicle.vehicleBrand + "</td>" +
                        "<td>" + vehicle.vehicleCategory + "</td>" +
                        "<td>" + vehicle.fuelType + "</td>" +
                        "<td>" + vehicle.hybrid + "</td>" +
                        "<td>" + vehicle.seatCapacity + "</td>" +
                        "<td>" + vehicle.vehicleName + "</td>" +
                        "<td>" + vehicle.transmissionType + "</td>" +
                        "<td>" + vehicle.driverName + "</td>" +
                        "<td>" + vehicle.conNumber + "</td>" +
                        "<td>" + vehicle.remarks + "</td>" +
                        "</tr>";

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

function OnSaveVehicle() {
    // Retrieve form data

    let ID = $("#vId").val();
    let brand = $("#vbrand").val();
    let category = $("#category").val();
    let vehiclename = $("#vname").val();
    let fultype = $("#fueltype").val();
    let fuluse = $("#fuelusage").val();
    let  HY = $("#hybrid").val();
    let  vehiImg= $("#vehicleImg").val();
    let  vehiInImg = $("#vehicleInteriorImg").val();
    let  seats = $("#seatCapacity").val();
    let  transM= $("#transmissionType").val();
    let  driverName = $("#driverName").val();
    let  remark = $("#vremark").val();
    let  driverLiImg = $("#driverlicenseImg").val();
    let  contact = $("#conNumber").val();
    let  pId = $("#packageid").val();


    // Create an object to store the data
    const data = {
        vehicleID:ID,
        vehicleBrand:brand,
        vehicleCategory:category,
        vehicleName:vehiclename,
        fuelType:fultype,
        hybrid:HY,
        fuelUsage:fuluse,
        vehicleImg:vehiImg,
        vehicleInteriorImg:vehiInImg,
        seatCapacity:seats,
        transmissionType:transM,
        driverName:driverName,
        conNumber:contact,
        driverlicenseImg:driverLiImg,
        remarks:remark,
        package_id:pId




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
    let category = $("#ucategory").val();
    let vehiclename = $("#uname").val();
    let fultype = $("#ufueltype").val();
    let fuluse = $("#ufuelusage").val();
    let  HY = $("#uhybrid").val();
    let  vehiImg= $("#uvehicleImg").val();
    let  vehiInImg = $("#uvehicleInteriorImg").val();
    let  seats = $("#useatCapacity").val();
    let  transM= $("#utransmissionType").val();
    let  driverName = $("#udriverName").val();
    let  remark = $("#uvremark").val();
    let  driverLiImg = $("#udriverlicenseImg").val();
    let  contact = $("#uconNumber").val();


    // Create an object to store the data
    const data = {
        vehicleID:ID,
        vehicleBrand:brand,
        vehicleCategory:category,
        vehicleName:vehiclename,
        fuelType:fultype,
        hybrid:HY,
        fuelUsage:fuluse,
        vehicleImg:vehiImg,
        vehicleInteriorImg:vehiInImg,
        seatCapacity:seats,
        transmissionType:transM,
        driverName:driverName,
        conNumber:contact,
        driverlicenseImg:driverLiImg,
        remarks:remark,



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
    if ($("#vDID").val() === "") {
        return swal("OOPS!", "Please enter a Vehicle ID to delete!", "error");
    }

    let token = localStorage.getItem("VToken");
    console.log(token)
    // Check if the token is valid
    if (!token) {
        alert("Token not found. Please log in.");
        return;
    }
    // Make the AJAX request to save the payment data
    $.ajax({
        url: "http://localhost:8082/api/v1/vehicles/V_delete?Vehicle_ID="+ $('#vDID').val(),
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

//get search


function OnSearchVehicle() {
    const vehiclebrand = $("#cidField").val();
    if (!vehiclebrand) {
        swal("Error", "Vehicel brand is required", "error");
        return;
    }

    const authToken = JSON.parse(localStorage.getItem("VToken"));

    if (!authToken) {
        swal("Error", "Authentication token is missing", "error");
        return;
    }

    $.ajax({
        url: "http://localhost:8082/api/v1/vehicles/getVehicleByVehicleBrand?vehicleBrand=" + vehiclebrand,
        method: "GET",
        contentType: "application/json",
        headers: {
            "Authorization": "Bearer " + authToken
        },
        success: (res) => {
            if (res.statusCode === 200 || res.statusCode === 201) {
                // Populate input fields with retrieved data
                $("#uvId").val(res.data.vehicleID);
                $("#ucategory").val(res.data.vehicleCategory);
                $("#uname").val(res.data.vehicleName);
                $("#ufueltype").val(res.data.fuelType);
                // Select the option in the dropdown based on the response (if applicable)

                $("#ufuelusage").val(res.data.fuelUsage);
                $("#uhybrid").val(res.data.hybrid);
                $("#useatCapacity").val(res.data.seatCapacity);
                $("#utransmissionType").val(res.data.transmissionType);
                $("#udriverName").val(res.data.driverName);
                $("#uconNumber").val(res.data.conNumber);
                $("#uvremark").val(res.data.remarks);


                swal("Success", res.message, "success");
            } else {
                swal("Error", res.message, "error");
            }
        },
        error: (xhr, textStatus, errorThrown) => {
            if (xhr.responseJSON && xhr.responseJSON.message) {
                swal("Error", "Server threw an exception: " + xhr.responseJSON.message, "error");
            } else {
                swal("Error", "An error occurred while processing your request.", "error");
            }
        }
    });
}


