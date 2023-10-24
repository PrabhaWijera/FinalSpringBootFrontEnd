
localStorage.setItem("VEHIToken",JSON.stringify("eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyUm9sZSI6IkFfVkVISUNMRSIsInN1YiI6InZlaGljbGVBZG1pbiIsImlhdCI6MTY5ODA2ODA5MywiZXhwIjo0ODUxNjY4MDkzfQ.nQTckOEDGVWtQq8ha3AWhsmNx8TIR10Xe73yQBqeABg"));

var packageIDs = [];

$(document).ready(function () {
    // Define the Auth header with the token
    var Auth = {
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("VEHIToken")),
    };

    // Use axios to make the GET request
    axios
        .get("http://localhost:8082/api/v1/vehicles/getvehi", { headers: Auth })
        .then(function (res) {
            packageIDs = res.data;
        })
        .catch(function (error) {
            swal("OOPS! Something went wrong");
        });
});

$("#vehiAddButton").on("click", function () {
    saveVehicle();
});

$("#homeButton").on("click", function () {
    window.location.reload();
});

// Function to handle image upload
function uploadImage(file, successCallback, errorCallback) {
    const data = new FormData();
    data.append("myFile", file);

    $.ajax({
        url: "http://localhost:8080/api/v1/auth/uploadImg", // Replace with the correct upload endpoint
        method: "POST",
        async: true,
        contentType: false,
        processData: false,
        data: data,
        success: successCallback,
        error: errorCallback,
    });
}

// Function to handle guide data save
function saveVehicle() {
    if (!validator()) {
        return swal("Operation failed!", "Please fill the fields!", "error");
    }

    var file = $("#vehicleImg")[0].files[0];
    saveImages(file, function (imageData) {
        var file2 = $("#vehicleInteriorImg")[0].files[0];
        saveImages(file2, function (interiorImageData) {
            var file3 = $("#driverlicenseImg")[0].files[0];
            saveImages(file3, function (driverLicenseImageData) {
                console.log("IS HYBRID: " + $("#hybrid").val());
                const vehiData = {
                    vehicleImg: imageData[0],
                    vehicleInteriorImg: imageData[1],
                    driverlicenseImg: imageData[2],
                    vehicleID: $("#vId").val(),
                    packageId: $("#packageId").val(),
                    vehicleBrand: $("#vbrand").val(),
                    vehicleCategory: $("#category").val(),
                    fuelType: $("#fueltype").val(),
                    fuelUsage: $("#fuelusage").val(),
                    seatCapacity: $("#seatCapacity").val(),
                    transmissionType: $("#transmissionType").val(),
                    driverName: $("#driverName").val(),
                    Remark: $("#vremark").val(),
                    conNumber: $("#conNumber").val(),
                };
                console.log(vehiData);

                $.ajax({
                    url: "http://localhost:8082/api/v1/vehicles/vSave", // Replace with the correct save endpoint
                    method: "POST",
                    headers: {
                        Authorization: "Bearer " + JSON.parse(localStorage.getItem("VEHIToken")),
                    },
                    async: true,
                    data: JSON.stringify(vehiData),
                    contentType: "application/json",
                    success: function (resp) {
                        if (resp.statusCode === 200 || resp.statusCode === 201) {
                            swal("Done!", resp.message, "success");
                        } else {
                            return alert("OOPS!!!!!");
                        }
                    },
                    error: function (xhr, textStatus, errorThrown) {
                        swal(
                            "OOPS!",
                            "Server threw an exception : " + xhr.responseJSON.message,
                            "error"
                        );
                    },
                });
            });
        });
    });
}

var imageData = [];

function saveImages(file, callback) {
    var formData = new FormData();
    formData.append("imageFile", file);

    $.ajax({
        url: "http://localhost:8090/api/v1/auth/uploadImg",
        type: "POST",
        data: formData,
        headers: {
            Authorization: "Bearer " + JSON.parse(localStorage.getItem("VEHIToken")),
        },
        cache: false,
        contentType: false,
        processData: false,
        success: function (data) {
            imageData.push(data);
            callback(data);
        },
        error: function (xhr, textStatus, errorThrown) {
            swal(
                "OOPS!",
                "Server threw an exception : " + xhr.responseJSON.message,
                "error"
            );
        },
    });
}
function validator() {
    if (
        $("#packageId").val() === "" ||
        $("#vbrand").val() === "" ||
        $("#category").val() === "" ||
        $("#fueltype").val() === "" ||
        $("#hybrid").val() === "" ||
        $("#fuelusage").val() === "" ||
        $("#vehicleImg").val() === "" ||
        $("#seatCapacity").val() === "" ||
        $("#transmissionType").val() === "" ||
        $("#conNumber").val() === "" ||
        $("#driverlicenseImg").val() === "" ||
        $("#vremark").val() === ""
    ) {
        return false;
    }
    return true;
}

/*


// Function to handle   data update

$(document).ready(()=>{
    $("#vUpdateButton").onclick(function (){
        updateVehicle();
    });
})
function updateVehicle() {

    var file = $('#uvehicleImg')[0].files[0];

    saveImages(file);

    var file2 = $('#uvehicleInteriorImg')[0].files[0];

    saveImages(file2);

    var file3 = $('#udriverlicenseImg')[0].files[0];

    saveImages(file3);

    const vehiData = {
        uVehicleImg: imageData[0],
        uInteriorImg: imageData[1],
        ulicenseImg: imageData[2],
        VId: $("#uvId").val(),
        Brand: $("#uvbrand").val(),
        Category: $("#ucategory").val(),
        FuelType: $("#ufueltype").val(),
        Hybrid: $("#uhybrid").val(),
        SeatCapacity: $("#useatCapacity").val(),
        TransmissionType: $("#utransmissionType").val(),
        DriverName: $("#udriverName").val(),
        Remark: $("#uvremark").val(),
        Number: $("#uconNumber").val(),
    };

    $.ajax({
        url: "http://localhost:8080/api/v1/vehicle_api/Vput", // Replace with the correct save endpoint
        method: "PUT",
        headers: {
            "Authorization": "Bearer " + JSON.parse(localStorage.getItem("VEHIToken"))
        },
        async: true,
        data: JSON.stringify(vehiData),
        contentType: "application/json",
        success: function (resp) {
            if (resp.statusCode === 200 || resp. statusCode === 201){
                alert("Done!success")

            }else {
                return alert("OOPS!!!!!")
            }
        },error:(xhr,textStatus,errorThrown)=>{
            alert("server threw an exception"+xhr.message);
        }


    });
}

//delete

$(document).ready(() => {

    $(document).on("click", "#deletevehi", () => {

        if ($("#hotelId").val() === "") {

            return swal("OOPS!", "Please enter a Vehicle name to delete!", "error");

        }




        $.ajax({

            url: "http://localhost:8080/api/v1/vehicle_api/V_delete?Vehicle_ID=" + $("#vId").val(), method: "DELETE", headers: {

                "Authorization": "Bearer " + JSON.parse(localStorage.getItem("VEHIToken"))

            }, success: (res) => {

                console.log(res.data)

                if (res.statusCode === 200 || res.statusCode === 201) {

                    return swal("Done!", res.message, "success");

                }

                swal("OOPS!", res.message, "error");
            }, error: (xhr,textStatus,errorThrown) => {

                swal("OOPS!", "Server threw an exception : "+xhr.responseJSON.message, "error");

            }
        });

    })

});




*/
