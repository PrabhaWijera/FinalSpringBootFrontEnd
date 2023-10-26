localStorage.setItem("PGADMIN",JSON.stringify("eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyUm9sZSI6IlBBQ0tBR0VfREVUQUlMUyIsInN1YiI6IjIwMDEiLCJpYXQiOjE2OTgzMDY0NTIsImV4cCI6NDg1MTkwNjQ1Mn0.dlmkG9suHiRelGPgbJRx08W4SpE1BV_r2CWzfXvduag"));

$(document).ready(function() {
    // Attach the click event handler to the "payAddButton"
    $("#bookingPackageBtn").on("click", function() {
        OnSavePackageDetails();
    });


});

function OnSavePackageDetails() {
    // Retrieve form data

    let SDate = $("#startDate").val();
    let EDate = $("#endDate").val();

    let BookingId = $("#bookingID").val();
    let UserId = $("#userId").val();

    let PCategory = $("#packageCategory").val();
    let HotelList = $("#hotelList").val();
    let VehicleList = $("#vehicleList").val();
    let NoAdults = $("#numAdults").val();
    let NoChilds = $("#numChildren").val();


    let TotalOfHead = $("#totalPeople").val();

    let petStatus = $("#petstatus").val();

    let isNeedGuide = $("#needGuide").val();

    let manValue = $("#guidenames").val();

    let HotelCharge = $("#hotelPrice").val();

    let VehicleCharge = $("#vehiclePrice").val();

    let totalPriceOfAll = $("#totalPrice").val();

    let S_remark = $("#specialremark").val();



    // Create an object to store the data
    const data = {
        startDuration:SDate,
        endDuration:EDate,
        packageDetailsID:BookingId,
        userID:UserId,
        packageCategory:PCategory,

      /*   :HotelList,
         :VehicleList,*/

        noOfAdults:NoAdults,
        noOfChildren:NoChilds,
        totalHeadCount:TotalOfHead,
        isPetsAllowed:petStatus,
        isGuideNeeded:isNeedGuide,
        /*remark:manValue,*/
     /*   remark:HotelCharge,*/
     /*   remark:VehicleCharge,*/
      /*  remark:totalPriceOfAll,*/
        remark:S_remark

    };

    // Retrieve the JWT token from localStorage
    let token = localStorage.getItem("PGADMIN");
    console.log(token)
    // Check if the token is valid
    if (!token) {
        swal("Token not found. Please log in.");
        return;
    }

    // Make the AJAX request to save the payment data
    $.ajax({
        url: "http://localhost:8084/api/v1/packageDetals/save",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(data),
        headers: {
            "Authorization": "Bearer " + JSON.parse(localStorage.getItem("PGADMIN"))

        },

        success: function (response) {
            alert("res"+response)
            if (response.statusCode === 200 || response.statusCode === 201 )
                swal("Save successful");
            // You can handle the response from the server here if needed
        },
        error: function (xhr, textStatus, errorThrown) {
            swal("Error: " + xhr.responseText);

        }
    });
}