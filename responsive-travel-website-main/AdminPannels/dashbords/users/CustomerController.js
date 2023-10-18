import { Customer } from "./Customer.js";
import { AlertController } from "../AlertController.js";
import { LocalStorageDB } from "../LocalStorageDB.js";


$("#cusAddButton").onclick(function (){
    saveCustomer();
});
$("#cusUpdateButton").onclick(function (){
    updateCustomer();
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
function saveCustomer() {
    const UserNic_Photo = $("#userNic_Photo")[0].files[0];


    const cusData = {
        GuideIMG: UserNic_Photo.name,

        uId: $("#userid").val(),
         Name: $("#userName").val(),
         nic: $("#usernic").val(),
         password: $("#userpassword").val(),
        Gender: $("#gender").val(),
        Age: $("#age").val(),
        Email: $("#email").val(),

        ContactNumber: $("#contactNumber").val(),
        Remark: $("#remark").val()
    };

    $.ajax({
        url: "http://localhost:8080/save", // Replace with the correct save endpoint
        method: "POST",
        async: true,
        data: JSON.stringify(cusData),
        contentType: "application/json",
        success: function (resp) {
            console.log(resp);
            alert(resp.message);
            uploadImage(UserNic_Photo, function () {
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

//update
function updateCustomer() {
    const UserNic_Photo = $("#uuserNic_Photo")[0].files[0];


    const cusData = {
        GuideIMG: UserNic_Photo.name,

        uId: $("#uuserid").val(),
        Name: $("#uuserName").val(),
        nic: $("#uusernic").val(),
        password: $("#uuserpassword").val(),
        Gender: $("#ugender").val(),
        Age: $("#uage").val(),
        Email: $("#uemail").val(),

        ContactNumber: $("#ucontactNumber").val(),
        Remark: $("#uremark").val()
    };

    $.ajax({
        url: "http://localhost:8080/save", // Replace with the correct save endpoint
        method: "PUT",
        async: true,
        data: JSON.stringify(cusData),
        contentType: "application/json",
        success: function (resp) {
            console.log(resp);
            alert(resp.message);
            uploadImage(UserNic_Photo, function () {
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


$("#Cusdelete").click(function () {
    const CusID = $("#userid").val();

    $.ajax({
        url: 'http://localhost:8080/delete', // Replace with the actual delete endpoint on your server
        type: 'DELETE', // Use DELETE for a delete request
        data: { CusID: CusID }, // Send the GuideID as data
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
