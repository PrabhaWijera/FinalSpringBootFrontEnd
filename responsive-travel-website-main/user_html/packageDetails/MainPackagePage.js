localStorage.setItem("PKG_ADMIN_TKN",JSON.stringify("eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyUm9sZSI6IlBBQ0tBR0VfREVUQUlMUyIsInN1YiI6InBhY2thZ2VEZXRhaWxzYWRtaW4yMDAxIiwiaWF0IjoxNjk4NDY3MjQyLCJleHAiOjQ4NTIwNjcyNDJ9.iJmDyxXpcXihXCGqjv0S13WaFEku7zE_XQBr6LMKXXU"));
localStorage.setItem("GToken",JSON.stringify("eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyUm9sZSI6IkFfR1VJREUiLCJzdWIiOiJhZG1pbmd1aWRlMjAwMSIsImlhdCI6MTY5ODIxNjUwOCwiZXhwIjo0ODUxODE2NTA4fQ.hQqMDON3iG7ANAOS45k064KfmpdgqOXpZ2T7bgIBFJ4"));
localStorage.setItem("HToken",JSON.stringify("eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyUm9sZSI6IkFfSE9URUwiLCJzdWIiOiJob3RlbDIwMDEiLCJpYXQiOjE2OTgyMTczMjMsImV4cCI6NDg1MTgxNzMyM30.wHic2oKFfSTxMqLKMbV96Z9bnYgdyE_EaacnOGG2Lz8"));
localStorage.setItem("VToken",JSON.stringify("eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyUm9sZSI6IkFfVkVISUNMRSIsInN1YiI6InZlaGkyMDAxIiwiaWF0IjoxNjk4MjE3ODY0LCJleHAiOjQ4NTE4MTc4NjR9.XdlpJELspG2kIHotbtx9WTmywt03QSV1qwoLigO6kKE"));
localStorage.setItem("PKG_TK",JSON.stringify("eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyUm9sZSI6IkFfUEFDS0FHRSIsInN1YiI6InBhY2thZ2UyMDAxIiwiaWF0IjoxNjk4MjE4MTgzLCJleHAiOjQ4NTE4MTgxODN9.M4bzixa7mGlo-mmyhasByViBgMooTU_t5T4YvAyzmh0"));



var pID="";
var pc="";

$(document).ready(function() {

    getHotel();
    getHotelDestinations();
    getVehicle();

    // Attach the click event handler to the "bookingPackageBtn"
    $("#bookingPackageBtn").on("click", function() {
        OnSavePackageDetails();
    });

    // Attach the change event handler to the "needGuide" select
    $("#needGuide").on("change", toggleGuideNameDiv);
    // Call the toggleGuideNameDiv function to handle initial visibility
    toggleGuideNameDiv();


    $("#needGuide").on("input", function() {
        getGuides();
    });
    $("#numAdults, #numChildren").on("input", function() {
        countAdultsAndChildren();
    });






    $("#startDate").on("click", function() {

    });
    if (JSON.parse(localStorage.getItem("packageName")) === "regular"){
        pID="P001";
        pc="regular";
        return packageLoader(pID);
    }
    if (JSON.parse(localStorage.getItem("packageName")) === "mid"){
        pID="P002";
        pc="mid";
        return packageLoader(pID);
    }
    if (JSON.parse(localStorage.getItem("packageName")) === "luxury"){
        pID="P003";
        pc="luxury";
        return packageLoader(pID);
    }
    if (JSON.parse(localStorage.getItem("packageName")) === "superLux"){
        pID="P004";
        pc="superLux";
        return packageLoader(pID);
    }


});



$(document).ready(function () {
    // Define variables to hold the prices
    var servicePrice = 0;
    var vehiclePrice = 0;
    var guidePrice = 0;

    // Event handler for room type change
    $('#roomType').on("change", () => {
        let roomTypeValue = parseFloat($("#roomType").val());
        if (!isNaN(roomTypeValue)) {
            let hotelPrice = roomTypeValue * totalDays;
            localStorage.setItem("hotelVL",JSON.stringify(hotelPrice));
            servicePrice = hotelPrice * 5 / 100;
            $("#hotelPrice").val(hotelPrice);
            $("#servicePrice").val(servicePrice);

            updateTotalPrice();
        }
    });

    // Event handler for vehicle type change
    $('#vehiType').on("change", () => {
        let vehiTypeValue = parseFloat($("#vehiType").val());
        if (!isNaN(vehiTypeValue)) {
            vehiclePrice = vehiTypeValue * totalDays;
            localStorage.setItem("vehicleVL",JSON.stringify(vehiclePrice));
            $("#vehiclePrice").val(vehiclePrice);
            updateTotalPrice();
        }
    });

    // Event handler for guide service price change
    $('#manday').on("change", () => {
        let mandayValue = parseFloat($("#manday").val());
        if (!isNaN(mandayValue)) {
            guidePrice = mandayValue * totalDays;
            localStorage.setItem("guideVL",JSON.stringify(guidePrice));
            $("#servicePrice").val(guidePrice);
            updateTotalPrice();
        }
    });

    // Function to update the total price
    function updateTotalPrice() {
        var total = servicePrice + vehiclePrice + guidePrice;
        localStorage.setItem("ALL_TOT",JSON.stringify(total));
        $("#totalPrice").val(total);
        alert(total+"total");
        return total;
    }

    // Retrieve start and end dates
    let start_Date = $("#startDate").val();
    alert("sDate"+start_Date);

    let end_Date = $("#endDate").val();
    alert("sDate"+end_Date);

    // Convert the date strings to Date objects
    let startDate = new Date(start_Date);
    let endDate = new Date(end_Date);

    // Calculate the time difference in milliseconds
    let timeDifference = endDate - startDate;

    // Convert the time difference to days
    let totalDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    localStorage.setItem("TTDAYS",JSON.stringify(totalDays));
    // Now, totalDays contains the total number of days between the two dates
    console.log("Total Days: " + totalDays);

    // Initial calculations for prices based on default values
    $('#roomType').change(); // Trigger the roomType change event
    $('#vehiType').change(); // Trigger the vehiType change event
    $('#manday').change();   // Trigger the manday change event
});


function packageLoader(pID) {
    $.ajax({
        url: "http://localhost:8083/api/v1/hotel/getHotelByPackageId?packageId=" + pID,
        method: "GET",
        contentType: "application/json",
        headers: {
            "Authorization": "Bearer " + JSON.parse(localStorage.getItem("HToken"))
        },
        success: function (response) {
            if (response.statusCode === 200 || response.statusCode === 201) {
                // Clear the existing options
                const selectElement = $("#hotelList");
                selectElement.empty();

                swal("get successful");
                console.log(response+"response");
                localStorage.setItem("hotelData", JSON.stringify(response.data.data));

                response.data.forEach((hotel) => {
                    let option = $("<option>");
                    option.attr("value", hotel.hotelName);
                    console.log(hotel.hotelName+"response");
                    option.text(hotel.hotelName);


                    selectElement.append(option);

                });
            } else {
                // Handle the response from the server here if needed
            }
        },
        error: function (error) {
            handleRequestError(error);
        }
    });


    $.ajax({
        url: "http://localhost:8082/api/v1/vehicles/getVehiclesByPackageId?packageId=" + pID,
        method: "GET",
        contentType: "application/json",
        headers: {
            "Authorization": "Bearer " + JSON.parse(localStorage.getItem("VToken"))
        },
        success: function (response) {
            if (response.statusCode === 200 || response.statusCode === 201) {
                // Clear the existing options
                const selectElement = $("#vehicleList");
                selectElement.empty();

                swal("get successful");
                console.log(response+"response");
                localStorage.setItem("vehicleData", JSON.stringify(response.data.data));

                response.data.forEach((vehi) => {
                    let option = $("<option>");
                    option.attr("value", vehi.vehicleName);
                    console.log(vehi.vehicleName+"response");
                    option.text(vehi.vehicleName);
                    selectElement.append(option);
                });
            } else {
                // Handle the response from the server here if needed
            }
        },
        error: function (error) {
            handleRequestError(error);
        }
    });



}



function handleRequestError(error) {
    console.error('Error fetching data from the server', error);
    // You can show an appropriate error message or take other actions here.
}











//get  destination only

function getHotelDestinations(){

    $.ajax({
        url: "http://localhost:8083/api/v1/hotel/getAllHotels",
        method: "GET",
        headers: {
            "Authorization": "Bearer " + JSON.parse(localStorage.getItem("HToken"))
        },
        success: (res) => {
            if (!res.data) {
                // Handle the case when no data is found
                swal("OOPS!", "No data found!", "error");
            } else {
                console.log("Response data:", res.data);

                const selectElement = $("#hotelLocations");
                selectElement.empty(); // Clear the existing options

                res.data.forEach((hotels) => {
                    let option = $("<option>");
                    option.attr("value", hotels.hotelLocation);
                    option.text(hotels.hotelLocation);

                    selectElement.append(option);
                });
            }
        },
        error: function (error) {
            console.error('Error fetching data from the server', error);
        }
    });
}



//get  hotels only
function getHotel(){

    $.ajax({
        url: "http://localhost:8083/api/v1/hotel/getAllHotels",
        method: "GET",
        headers: {
            "Authorization": "Bearer " + JSON.parse(localStorage.getItem("HToken"))
        },
        success: (res) => {
            if (!res.data) {
                // Handle the case when no data is found
                swal("OOPS!", "No data found!", "error");
            } else {
                console.log("Response data:", res.data);
                localStorage.setItem("hd",JSON.stringify(res.data))

                const selectElement = $("#hotelList");
                selectElement.empty(); // Clear the existing options

                res.data.forEach((hotels) => {
                   /* let option = $("<option>");
                    option.attr("value", hotels.hotelName);
                    option.text(hotels.hotelName);

                    selectElement.append(option);*/
                    $('#hotelList').append('<option value="' + hotels.hotelId + '" hotelId="' + hotels.hotelId + '">' + hotels.hotelName + ' +</option>');
                });
            }
        },
        error: function (error) {
            console.error('Error fetching data from the server', error);
        }
    });
}





$(document).ready(function() {
    $("#hotelList").change(function() {
        var selectedValue = $(this).val(); // Get the selected value
        console.log('selectedvalue : ',selectedValue)

       let hd= JSON.parse(localStorage.getItem("hd"))
        hd.forEach((h)=>{
            if(h.hotelName === selectedValue){
                $("#roomType").empty();
                $("#roomType").append("<option value='" + h.fullBoardWithACLuxuryRoomDouble + "'>" + "Full Board With AC Luxury Room Double  : " + h.fullBoardWithACLuxuryRoomDouble + " LKR.</option>");
                $("#roomType").append("<option value='" + h.halfBoardWithACLuxuryRoomDouble + "'>" + "Half Board With AC Luxury Room Double  : " + h.halfBoardWithACLuxuryRoomDouble + " LKR.</option>");
                $("#roomType").append("<option value='" + h.fullBoardWithACLuxuryRoomTriple + "'>" + "Full Board With AC Luxury Room Triple  : " + h.fullBoardWithACLuxuryRoomTriple + " LKR.</option>");
                $("#roomType").append("<option value='" + h.halfBoardWithACLuxuryRoomTriple + "'>" + "Half Board With AC Luxury Room Triple  : " + h.halfBoardWithACLuxuryRoomTriple + " LKR.</option>");

            }
// vehicle price ekath hdnn combo box ,
// hotel price ithuru tikath add krnn

        })

    });
    $("#vehicleList").change(function() {
        var selectedValue1 = $(this).val(); // Get the selected value
        console.log('selectedvalue1 : ',selectedValue1)

        let vh= JSON.parse(localStorage.getItem("vh"))
        vh.forEach((v)=>{
            if(v.vehicleName === selectedValue1){
                $("#vehiType").empty();
                $("#vehiType").append("<option value='" + v.fee_forDay+ "'>" + "Fee for Day Vehicel  : " + v.fee_forDay + " LKR.</option>");

            }

        })

    });


    $("#guidenames").change(function() {
        var selectedValue2 = $(this).val(); // Get the selected value
        console.log('selectedvalue2 : ',selectedValue2)


        let gd= JSON.parse(localStorage.getItem("gd"))
        gd.forEach((gg)=>{
            console.log(gg.manDayValue+"gg man day value");
            if(gg.guideName === selectedValue2){
                $("#manday").empty();
                $("#manday").append("<option value='" + gg.manDayValue + "'>" + "Guide Service Charge : " + gg.manDayValue + " .</option>");

            }
// vehicle price ekath hdnn combo box ,
// hotel price ithuru tikath add krnn

        })

    });
});


//get  vehicle  only
function getVehicle(){

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

                const selectElement = $("#vehicleList");
                selectElement.empty(); // Clear the existing options
                localStorage.setItem("vh",JSON.stringify(res.data))
                res.data.forEach((vehicle) => {
                    let option = $("<option>");
                    option.attr("value", vehicle.vehicleName);
                    option.text(vehicle.vehicleName);

                    selectElement.append(option);
                });
            }
        },
        error: function (error) {
            console.error('Error fetching data from the server', error);
        }
    });
}




//get  guides  only

function getGuides(){

    $.ajax({
        url: 'http://localhost:8085/api/v1/guide/getAllGuide',
        method: 'GET',
        headers: {
            "Authorization": "Bearer " + JSON.parse(localStorage.getItem("GToken"))
        },
        success: (res) => {
            if (!res.data) {
                // Handle the case when no data is found
                swal("OOPS!", "No data found!", "error");
            } else {
                console.log("Response data:", res.data);
                console.log("Response data:", res.data);
                localStorage.setItem("gd",JSON.stringify(res.data))
                const selectElement = $("#guidenames");
                selectElement.empty(); // Clear the existing options

                res.data.forEach((guide) => {
                    let option = $("<option>");
                    option.attr("value", guide.guideName);
                    option.text(guide.guideName);

                    selectElement.append(option);
                });
            }
        },
        error: function (error) {
            console.error('Error fetching data from the server', error);
        }
    });
}





// Count adults and children
function countAdultsAndChildren() {
    let adultCount = parseInt($("#numAdults").val()) || 0; // Default to 0 if input is not a number
    let childCount = parseInt($("#numChildren").val()) || 0; // Default to 0 if input is not a number

    let totalPeopleCount = adultCount + childCount;
    localStorage.setItem("TOTPLP", JSON.stringify(totalPeopleCount));
    // Update the content of the "totalPeople" span with the calculated count
    $("#totalPeople").text(totalPeopleCount);

    console.log("Total Number of People: " + totalPeopleCount);
}


// Toggle visibility of guide name input
function toggleGuideNameDiv() {
    let needGuide = $("#needGuide").val();
    let nameofGuideDiv = $("#guidenames");
    let nameofGuideDiv1 = $("#manday");


    if (needGuide === "true") {
        nameofGuideDiv.show();
        nameofGuideDiv1.show();
    } else {
        nameofGuideDiv.hide();
        nameofGuideDiv1.hide();
    }
}

function OnSavePackageDetails() {
    // Retrieve form data
    let pkDetailsID = "p00214";
    let start_Date = $("#startDate").val();
    let end_Date = $("#endDate").val();
    let noofDays =localStorage.getItem("TTDAYS");

    let area = $("#areaList").val();
    let No_ofAdults = parseInt($("#numAdults").val());
    let No_ofChild = parseInt($("#numChildren").val());
    let totalOfHeadCount =  localStorage.getItem("TOTPLP");
    let allowPets = $("#petstatus").val();
    let NeedGuide = $("#needGuide").val();
    let NameofGuide = $("#guidenames").val(); // Make sure this field is properly defined in your HTML
    let TotalOfHotelVehicleGuide =localStorage.getItem("ALL_TOT");// Call the function to calculate the total package value
    let SpecialRequests = $("#specialremark").val();

    // Create an object to store the data
    const data = {
        packageDetailsID:pkDetailsID,
        startDuration: start_Date,
        endDuration: end_Date,
        travelArea: area,
        noOfDays:noofDays,
        noOfAdults: No_ofAdults,
        noOfChildren: No_ofChild,
        totalHeadCount: totalOfHeadCount,
        isPetsAllowed: allowPets,
        isGuideNeeded: NeedGuide,
        nameGuide: NameofGuide,
        totalPackageValue: TotalOfHotelVehicleGuide,
        remark: SpecialRequests
    };

    // Retrieve the JWT token from localStorage
    let token = localStorage.getItem("PKG_ADMIN_TKN");

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
            "Authorization": "Bearer " + JSON.parse(localStorage.getItem("PKG_ADMIN_TKN"))
        },
        success: function (response) {
            if (response.statusCode === 200 || response.statusCode === 201) {
                swal("Update successful");
                // You can handle the response from the server here if needed
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            swal("Error: " + xhr.responseText);
        }
    });
}


