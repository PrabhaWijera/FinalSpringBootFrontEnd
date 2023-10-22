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
        url: "http://localhost:8080/api/v1/vehicle_api/vSave", // Replace with the correct save endpoint
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




