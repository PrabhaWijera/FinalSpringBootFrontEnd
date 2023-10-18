import { Customer } from "./Customer.js";
import { AlertController } from "../AlertController.js";
import { LocalStorageDB } from "../LocalStorageDB.js";



// Function to handle guide data save
// Event handler for saving hotel data
$("#hotelAddButton").click(function () {
    saveHotel();
});
$("#hUpdateButton").click(function () {
    updateHotel();
});
// Function to save hotel data
function saveHotel() {
    const hotelData = {
        HId: $("#hId").val(),
        HName: $("#hName").val(),
        Category: $("#hCategory").val(),
        Address: $("#hAddress").val(),
        Gender: $("#hmap").val(),
        Email: $("#hemail").val(),
        Contact: $("#hotelContact").val(),
        Pet: $("#pet").val(),
        fullBoarddoublehotelFee: $("#FullBoarddoublehotelFee").val(),
        halfBoardDoublehotelFee: $("#HalfBoardDoublehotelFee").val(),
        fullBoardTriplehotelFee: $("#FullBoardTriplehotelFee").val(),
        halfBoardTriplehotelFee: $("#HalfBoardTriplehotelFee").val(),
        cancellationCriteria: $("#CancellationCriteria").val(),
        Remark: $("#remark").val(),
    };

    $.ajax({
        url: "http://localhost:8080/save", // Replace with the correct save endpoint
        method: "POST",
        data: JSON.stringify(hotelData),
        contentType: "application/json",
        success: function (resp) {
            console.log(resp);
            alert("Hotel data saved successfully");
            // You can call the uploadImage function here if needed
        },
        error: function (error) {
            let parsedError = JSON.parse(error.responseText);
            alert("Error: " + parsedError.message);
        },
    });
}
//update
function updateHotel(){

    const hotelData = {
        HId: $("#huId").val(),
        HName: $("#huName").val(),
        Category: $("#huCategory").val(),
        Address: $("#huAddress").val(),
        Gender: $("#humap").val(),
        Email: $("#huemail").val(),
        Contact: $("#uhotelContact").val(),
        Pet: $("#upet").val(),
        fullBoarddoublehotelFee: $("#uFullBoarddoublehotelFee").val(),
        halfBoardDoublehotelFee: $("#uHalfBoardDoublehotelFee").val(),
        fullBoardTriplehotelFee: $("#uFullBoardTriplehotelFee").val(),
        halfBoardTriplehotelFee: $("#uHalfBoardTriplehotelFee").val(),
        cancellationCriteria: $("#uCancellationCriteria").val(),
        Remark: $("#uremark").val(),
    };

    $.ajax({
        url: "http://localhost:8080/save", // Replace with the correct save endpoint
        method: "PUT",
        data: JSON.stringify(hotelData),
        contentType: "application/json",
        success: function (resp) {
            console.log(resp);
            alert("Hotel data update successfully");
            // You can call the uploadImage function here if needed
        },
        error: function (error) {
            let parsedError = JSON.parse(error.responseText);
            alert("Error: " + parsedError.message);
        },
    });
}




// Event handler for deleting hotel data
$("#deletehotel").click(function () {
    const hotelID = $("#hId").val(); // Replace with the correct ID field

    $.ajax({
        url: 'http://localhost:8080/delete', // Replace with the actual delete endpoint on your server
        type: 'DELETE',
        data: { HId: hotelID }, // Send the hotel ID as data
        success: function (response) {
            console.log('Hotel data deleted successfully');
            // You can handle success actions here
        },
        error: function (error) {
            console.error('Error deleting hotel data:', error);
            alert("Error deleting hotel data.");
        }
    });
});

