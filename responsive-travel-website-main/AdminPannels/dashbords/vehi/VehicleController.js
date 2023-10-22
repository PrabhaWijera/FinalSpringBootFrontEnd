import { Vehicle } from "./Vehicle.js";
import { AlertController } from "../AlertController.js";
import { LocalStorageDB } from "../LocalStorageDB.js";

localStorage.setItem("VEHIToken",JSON.stringify("eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJWRUhJQ0xFIiwiaWF0IjoxNjk3ODk2NDk3LCJleHAiOjQ4NTE0OTY0OTd9.YYji2_hYdPUZWpssO8jX6ZsrWjbR2b3WEdsH6sCF0-s"));

var packageIDs=[];

$(document).ready(()=>{

    let Auth={
        "Authorization": "Bearer " + JSON.parse(localStorage.getItem("VEHIToken"))
    }

    axios.get("http://localhost:8080/api/v1/vehicles/getvehi",{headers: Auth})
        .then((res)=>{
            packageIDs = res.data;
        })

        .catch(()=>{
            alert("OOPS! Something went wrong")
        })
})


$("#vehiAddButton").onclick(function (){
   saveVehicle();
});

$("#vUpdateButton").onclick(function (){
    updateVehicle();
});

/*
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
*/

// Function to handle guide data save
function saveVehicle() {
/*
    const VehicleImg = $("#vehicleImg")[0].files[0];
    const InteriorImg = $("#vehicleInteriorImg")[0].files[0];
    const  licenseImg = $("#driverlicenseImg")[0].files[0];*/




    var file = $('#vehicleImg')[0].files[0];

    saveImages(file);

    var file2 = $('#vehicleInteriorImg')[0].files[0];

    saveImages(file2);

    var file3 = $('#driverlicenseImg')[0].files[0];

    saveImages(file3);


    const vehiData = {
        VehicleImg: imageData[0],
        InteriorImg: imageData[1],
        licenseImg: imageData[2],
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

console.log(vehiData);

    $.ajax({
        url: "http://localhost:8080/api/v1/auth/register", // Replace with the correct save endpoint
        method: "POST",
        headers: {
            "Authorization": "Bearer " + JSON.parse(localStorage.getItem("VEHIToken"))
        },
        async: true,
        data: JSON.stringify(vehiData),
        contentType: "application/json",
        success: function (resp) {
             if (resp.statusCode === 200 || resp. statusCode === 201){
                 alert("Done!",resp.message,"success")

             }else {
                 return alert("OOPS!!!!!")
             }
        },error:(xhr,textStatus,errorThrown)=>{
            alert("server threw an exception"+xhr.message);
        }


    });
}
var imageData = [];
function saveImages(file) {

    var formData = new FormData();

    formData.append('imageFile', file);




    $.ajax({

        url: 'http://localhost:8080/api/v1/auth/uploadImg', type: 'POST', data: formData, headers: {

            "Authorization": "Bearer " + JSON.parse(localStorage.getItem("VEHIToken"))

        }, cache: false, contentType: false, processData: false, success: function (data) {




            imageData.push(data)







        }, error: (xhr,textStatus,errorThrown) => {

            swal("OOPS!", "Server threw an exception : "+xhr.responseJSON.message, "error");

        }

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
