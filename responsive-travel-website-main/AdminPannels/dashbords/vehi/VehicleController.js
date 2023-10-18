import { Vehicle } from "./Vehicle.js";
import { AlertController } from "../AlertController.js";
import { LocalStorageDB } from "../LocalStorageDB.js";


$("#vehiAddButton").onclick(function (){
   saveVehicle();
});

$("#vUpdateButton").onclick(function (){
    updateVehicle();
});

// Function to handle image upload
function uploadImage(file, successCallback, errorCallback) {
    const data = new FormData();
    data.append("myFile", file);

    $.ajax({
        url: "http://localhost:8080/upload", // Replace with the correct upload endpoint
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

    const VehicleImg = $("#vehicleImg")[0].files[0];
    const InteriorImg = $("#vehicleInteriorImg")[0].files[0];
    const  licenseImg = $("#driverlicenseImg")[0].files[0];

    const vehiData = {
        VehicleImg: VehicleImg.name,
        InteriorImg: InteriorImg.name,
        licenseImg: licenseImg.name,
        VId: $("#vId").val(),
        Brand: $("#vbrand").val(),
        Category: $("#category").val(),
        FuelType: $("#fueltype").val(),
        Hybrid: $("#hybrid").val(),
        SeatCapacity: $("#seatCapacity").val(),
        TransmissionType: $("#transmissionType").val(),
        DriverName: $("#driverName").val(),
        Remark: $("#vremark").val(),
        Number: $("#conNumber").val(),
    };

    $.ajax({
        url: "http://localhost:8080/save", // Replace with the correct save endpoint
        method: "POST",
        async: true,
        data: JSON.stringify(vehiData),
        contentType: "application/json",
        success: function (resp) {
            console.log(resp);
            alert(resp.message);
            uploadImage(VehicleImg,InteriorImg, licenseImg,function () {
                alert("Successfully Uploaded");
            }, function (err) {
                console.error(err);
            });
        },
        error: function (error) {
            let parsedError = JSON.parse(error.responseText);
            alert(parsedError.message);
        },
    });
}

// Function to handle guide data update

// Function to handle guide data save
function updateVehicle() {

    const uVehicleImg = $("#uvehicleImg")[0].files[0];
    const uInteriorImg = $("#uvehicleInteriorImg")[0].files[0];
    const  ulicenseImg = $("#udriverlicenseImg")[0].files[0];

    const vehiData = {
        uVehicleImg: uVehicleImg.name,
        uInteriorImg: uInteriorImg.name,
        ulicenseImg: ulicenseImg.name,
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
        url: "http://localhost:8080/save", // Replace with the correct save endpoint
        method: "POST",
        async: true,
        data: JSON.stringify(vehiData),
        contentType: "application/json",
        success: function (resp) {
            console.log(resp);
            alert(resp.message);
            uploadImage(uVehicleImg,uInteriorImg, ulicenseImg,function () {
                alert("Successfully Uploaded");
            }, function (err) {
                console.error(err);
            });
        },
        error: function (error) {
            let parsedError = JSON.parse(error.responseText);
            alert(parsedError.message);
        },
    });
}

// Function to load all guides
/*
function loadAllGuides() {
    $("#guideTable").empty();

    $.ajax({
        url: "http://localhost:8080/",
        method: "GET",
        success: function (resp) {
            for (const guide of resp.data) {
                let row = `<tr style="text-align: center"><td>${guide.name}</td><td>${guide.nic}</td><td>${guide.address}</td><td>${guide.contactNumber}</td><td>${customer.email}</td><td>${customer.imageLocation}</td></tr>`;
                $("#admin-customer-table").append(row);

                $("#admin-customer-table>tr").off("click");
                $("#admin-customer-table>tr").click(function () {
                    customer_nic = $(this).children(":eq(1)").text();
                    console.log(customer_nic)
                    $("#admin-customer-viewBtn").prop('disabled', false);
                });
            }
        }
    });
}
*/

// Function to delete a guide
$("#deleteGuide").click(function () {
    const GuideID = $("#ugId").val();

    $.ajax({
        url: 'http://localhost:8080/delete', // Replace with the actual delete endpoint on your server
        type: 'DELETE', // Use DELETE for a delete request
        data: { GuideID: GuideID }, // Send the GuideID as data
        success: function (response) {
            // Handle success, e.g., show a success message
            console.log('Data deleted successfully');
        },
        error: function (error) {
            // Handle the error, e.g., show an error message
            console.error('Error deleting data:', error);
        }
    });
});
