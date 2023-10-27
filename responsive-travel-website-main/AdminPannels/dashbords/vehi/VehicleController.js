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





var hcl = "";
function saveImage(fileInputId, successCallback) {
    var formData = new FormData();
    var file = $(fileInputId)[0].files[0];

    if (file) {
        formData.append('imageFile', file);

        $.ajax({
            url: 'http://localhost:8090/api/v1/uploadingUploader/upload',
            type: 'POST',
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
                hcl = data;
                console.log("IMG : " + data);
                successCallback(data); // Call the success callback with the image data
            },
            error: function (xhr, textStatus, errorThrown) {
                swal("OOPS!", "Server threw an exception : " + xhr.responseJSON.message, "error");
            }
        });
    } else {
        successCallback(""); // Call the success callback with an empty string if no file selected
    }
}


function OnSaveVehicle() {
    // Retrieve form data

    const imageArray = [];

    // Define the file input IDs
    const fileInputIds = ["#vehicleImg", "#vehicleInteriorImg", "#driverlicenseImg"];


    function handleImageSave(data){
        imageArray.push(data);

        if (imageArray.length === fileInputIds.length){
            const ID = $("#vId").val();
            const brand = $("#vbrand").val();
            const category = $("#category").val();
            const vehiclename = $("#vname").val();
            const fultype = $("#fueltype").val();
            const fuluse = $("#fuelusage").val();
            const  HY = $("#hybrid").val();
            const  vehiImg= imageArray[0];
            const  vehiInImg = imageArray[1];
            const  driverLiImg = imageArray[2];
            const  seats = $("#seatCapacity").val();
            const  transM= $("#transmissionType").val();
            const  driverName = $("#driverName").val();
            const  remark = $("#vremark").val();
            const  contact = $("#conNumber").val();
            const  pId = $("#packageid").val();


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
            setTimeout(()=>{
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
                })
            },2000);

        }
    }
    for (let i = 0; i < fileInputIds.length; i++) {
        const delay = 2000 * i; // Delay increases for each image
        setTimeout(() => {
            saveImage(fileInputIds[i], handleImageSave);
        }, delay);
    }
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


$(document).ready(function (){
    $('#vSearchButton').on('click', function () {
        const vehicleID = $('#uvId').val().trim();
        if (vehicleID) {
            fetchVehicleByID(vehicleID);
        } else {
            alert("Please enter a Vehicle ID to search ");
        }
    });
});

function fetchVehicleByID(id) {
    $.ajax({
        url: 'http://localhost:8082/api/v1/vehicles/V_search?Vehicle_ID=' + id,
        method: "GET",
        headers: {
            "Authorization": "Bearer " + JSON.parse(localStorage.getItem("VToken"))
        },
        success: function (res) {
            populateFieldsWithRes(res);
        },
        error: function () {
            alert("Oops!");
        }
    });
}

function populateFieldsWithRes(res) {
    let vehicleData = res.data;
    if (vehicleData) {
        $("#uvbrand").val(vehicleData.vehicleBrand);
        $("#ucategory").val(vehicleData.vehicleCategory);
        $("#uname").val(vehicleData.vehicleName);

        // Set the selected option in the dropdown

        $("#ufueltype").val(vehicleData.fuelType);
        $("#ufuelusage").val(vehicleData.fuelUsage);
        /*   $("#uhcordinate").val(hotelData.hotelImageLocation);*/

        $("#useatCapacity").val(vehicleData.seatCapacity);
        $("#utransmissionType").val(vehicleData.transmissionType);
        $("#udriverName").val(vehicleData.driverName);
        $("#uvremark").val(vehicleData.remarks);
        $("#uconNumber").val(vehicleData.conNumber);
    } else {
        alert("No data received");
    }
}

/*let  vehiImg= $("#uvehicleImg").val();
let  vehiInImg = $("#uvehicleInteriorImg").val();
let  driverLiImg = $("#udriverlicenseImg").val();
*/




