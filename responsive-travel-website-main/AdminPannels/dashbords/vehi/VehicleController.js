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

    $("#csButton").on("click", function() {
        OnSearchVehicle();
    });


    $('#getAllButton').on('click',function (){
        OnGetAll();
    });

});


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
    if ($("#vId").val() === "") {
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
        url: "http://localhost:8082/api/v1/vehicles/V_delete?Vehicle_ID="+ $('#vId').val(),
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

//get all
function OnGetAll() {
    $.ajax({
        url: "http://localhost:8082/api/v1/vehicles/getvehi",
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

                const tableBody = $("#vehicBody");
                tableBody.empty(); // Clear the existing table rows

                res.data.forEach((vehicle) => {
                    // Create a new row for each vehicle
                    let row = "<tr>";
                    row += "<td>" + vehicle.vehicleID + "</td>";
                    row += "<td>" + vehicle.vehicleBrand + "</td>";
                    row += "<td>" + vehicle.vehicleCategory + "</td>";
                    row += "<td>" + vehicle.fuelType + "</td>";
                    row += "<td>" + vehicle.hybrid + "</td>";
                    row += "<td>" + vehicle.fuelUsage + "</td>";
                    row += "<td><img src='" + vehicle.vehicleImg + "' alt='Vehicle Image' height='100' width='100'></td>";
                    row += "<td>" + vehicle.seatCapacity + "</td>";
                    row += "<td>" + vehicle.vehicleName + "</td>";
                    row += "<td>" + vehicle.transmissionType + "</td>";
                    row += "<td>" + vehicle.driverName + "</td>";
                    row += "<td>" + vehicle.conNumber + "</td>";
                    row += "<td><img src='" + vehicle.driverlicenseImg + "' alt='Driver License' height='100' width='100'></td>";
                    row += "<td>" + vehicle.remarks + "</td>";
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
