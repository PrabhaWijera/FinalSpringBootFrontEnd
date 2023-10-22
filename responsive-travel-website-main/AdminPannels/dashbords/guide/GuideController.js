import { Guide } from "./Guide.js";
import { AlertController } from "../AlertController.js";
import { LocalStorageDB } from "../LocalStorageDB.js";


localStorage.setItem("GUIDEToken",JSON.stringify("eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJHVUlERSIsImlhdCI6MTY5Nzg5NjQ1OSwiZXhwIjo0ODUxNDk2NDU5fQ.0sH_wTYKOGS9Uzm29jRfg8nd3nFlMJxJaZ9e4NqatTs"));
// Function to handle image upload
var packageIDs=[];
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
function saveGuide() {
    const guideIMG = $("#guideIMG")[0].files[0];
    const NICimage = $("#gNICimg")[0].files[0];
    const guidingIDIMG = $("#gudingIDimg")[0].files[0];

    const guideData = {
        GuideIMG: guideIMG.name,
        NICimage: NICimage.name,
        GuidingIDIMG: guidingIDIMG.name,
        GId: $("#gId").val(),
        GName: $("#gName").val(),
        Age: $("#age").val(),
        Address: $("#gAddress").val(),
        Gender: $("#gender").val(),
        Experience: $("#gExperience").val(),
        ManValue: $("#mandayValue").val(),
        Remark: $("#gremark").val(),
    };

    $.ajax({
        url: "http://localhost:8080/save", // Replace with the correct save endpoint
        method: "POST",
        async: true,
        data: JSON.stringify(guideData),
        contentType: "application/json",
        success: function (resp) {
            console.log(resp);
            alert(resp.message);
            uploadImage(guideIMG, function () {
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
function updateGuide() {
    const guideIMG = $("#uguideIMG")[0].files[0];
    const NICimage = $("#ugNICimg")[0].files[0];
    const guidingIDIMG = $("#ugudingIDimg")[0].files[0];

    const guideData = {
        GuideIMG: guideIMG.name,
        NICimage: NICimage.name,
        GuidingIDIMG: guidingIDIMG.name,
        GId: $("#ugId").val(),
        GName: $("#ugName").val(),
        Age: $("#uage").val(),
        Address: $("#ugAddress").val(),
        Gender: $("#ugender").val(),
        Experience: $("#ugExperience").val(),
        ManValue: $("#umandayValue").val(),
        Remark: $("#ugremark").val(),
    };

    $.ajax({
        url: "http://localhost:8080/update", // Replace with the correct update endpoint
        method: "PUT",
        async: true,
        data: JSON.stringify(guideData),
        contentType: "application/json",
        success: function (resp) {
            console.log(resp);
            alert(resp.message);
            uploadImage(guideIMG, function () {
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
