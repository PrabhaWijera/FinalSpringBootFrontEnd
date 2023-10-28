
localStorage.setItem("PKG_ADMIN_TKN",JSON.stringify("eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyUm9sZSI6IlBBQ0tBR0VfREVUQUlMUyIsInN1YiI6InBhY2thZ2VEZXRhaWxzYWRtaW4yMDAxIiwiaWF0IjoxNjk4NDY3MjQyLCJleHAiOjQ4NTIwNjcyNDJ9.iJmDyxXpcXihXCGqjv0S13WaFEku7zE_XQBr6LMKXXU"));
/*

$(document).ready(function() {
    swal("Welcome To Package-Details Admin 🙏");
    // Attach the click event handler to the "payAddButton"
    $("#bookingPackageBtn").on("click", function() {
        OnSavePackageDetails();
    });



});



function calculatePackageTotal() {
    // Get the values from the input fields or variables
    let guideServicePrice = parseFloat($("#manday").val()); // Assuming these values are numbers
    let hotelCharges = parseFloat($("#hotelPrice").val());
    let vehicleCharges = parseFloat($("#vehiclePrice").val());

    // Check if the values are valid numbers
    if (isNaN(guideServicePrice) || isNaN(hotelCharges) || isNaN(vehicleCharges)) {
        // Handle invalid input, such as displaying an error message
        console.log("Invalid input. Please enter valid numbers.");
        return;
    }

    // Calculate the total package value by adding the prices
    let totalPackageValue = guideServicePrice + hotelCharges + vehicleCharges;

    // You can do something with the totalPackageValue, like displaying it on the page
    console.log("Total Package Value: $" + totalPackageValue);

    // Optionally, you can return the totalPackageValue if you want to use it elsewhere
    return totalPackageValue;
}

//head count
function countAdultsAndChildren() {
    // Get the values from the input fields
    let adultCount = parseInt($("#adultCount").val());
    let childCount = parseInt($("#childCount").val());

    // Check if the values are valid numbers
    if (isNaN(adultCount) || isNaN(childCount)) {
        // Handle invalid input, such as displaying an error message
        console.log("Invalid input. Please enter valid numbers.");
        return;
    }

    // Calculate the total number of people (adults + children)
    let totalPeopleCount = adultCount + childCount;

    // You can do something with the totalPeopleCount, like displaying it on the page
    console.log("Total Number of People: " + totalPeopleCount);

    // Optionally, you can return the totalPeopleCount if you want to use it elsewhere
    return totalPeopleCount;
}

function toggleGuideNameDiv() {

    let NeedGuide = $("#needGuide").val();

    let NameofGuide = $("#guidenames").val();
    let nameofGuideDiv = $("#guidenames").val();
    if (NeedGuide === "YES"){
        nameofGuideDiv.show();
    }else {
        nameofGuideDiv.hide();
    }
    $("#needGuide").on("change",toggleGuideNameDiv);

    toggleGuideNameDiv();


}


function OnSavePackageDetails() {
    // Retrieve form data

    let start_Date = $("#startDate").val();
    let end_Date = $("#endDate").val();
    let Package_category = $("#packageCategory").val();
 /!*   let hotel_List = $("#hotelList").val();
    let vehicle_List = $("#vehicleList").val();*!/

    // head count----------------------------------
    let No_ofAdults = $("#numAdults").val();
    let No_ofChild = $("#numChildren").val();

    let totalOfHeadCount = No_ofChild + No_ofChild;
    //---------------------------------------------


    let allowPets = $("#petstatus").val();


    //guide seen---------------------------

//----------------------------------------

/!*    let guideServicePrice = $("#manday").val();
    let hotelCharges = $("#hotelPrice").val();
    let vehicleCharges = $("#vehiclePrice").val();*!/
    let TotalOfHotelVehicleGuide =totalPackageValue;
    let SpecialRequests = $("#specialremark").val();



    // Create an object to store the data
    const data = {
        startDuration:start_Date,
        endDuration:end_Date,
        packageCategory:Package_category,

        noOfAdults:No_ofAdults,
        noOfChildren:No_ofChild,
        totalHeadCount:totalOfHeadCount,
        isPetsAllowed:allowPets,
        isGuideNeeded:NeedGuide,
        NameGuide:NameofGuide,
        TotalPackageValue:TotalOfHotelVehicleGuide,

        remark:SpecialRequests

    };
    // Retrieve the JWT token from localStorage
    let token = localStorage.getItem("PKG_ADMIN_TKN");
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
            "Authorization": "Bearer " + JSON.parse(localStorage.getItem("PKG_ADMIN_TKN"))

        },

        success: function (response) {
            swal("res"+response)
            if (response.statusCode === 200 || response.statusCode === 201 )
                swal("Update successful");
            // You can handle the response from the server here if needed
        },
        error: function (xhr, textStatus, errorThrown) {
            swal("Error: " + xhr.responseText);

        }
    });
}
*/
$(document).ready(function() {
    // Initialize SweetAlert
    swal("Welcome To Package-Details Admin 🙏");

    // Attach the click event handler to the "bookingPackageBtn"
    $("#bookingPackageBtn").on("click", function() {
        OnSavePackageDetails();
    });

    // Attach the change event handler to the "needGuide" select
    $("#needGuide").on("change", toggleGuideNameDiv);
    // Call the toggleGuideNameDiv function to handle initial visibility
    toggleGuideNameDiv();

    $("#numAdults, #numChildren").on("input", function() {
        countAdultsAndChildren();
    });


});

// Calculate the total package value
function calculatePackageTotal() {

    let guideServicePrice = parseFloat($("#manday").val());


    let hotelCharges = parseFloat($("#hotelPrice").val());
    let vehicleCharges = parseFloat($("#vehiclePrice").val());

    if (isNaN(guideServicePrice) || isNaN(hotelCharges) || isNaN(vehicleCharges)) {
        console.log("Invalid input. Please enter valid numbers.");
        return;
    }

    let totalPackageValue = guideServicePrice + hotelCharges + vehicleCharges;
    console.log("Total Package Value: $" + totalPackageValue);
    return totalPackageValue;
}

// Count adults and children
function countAdultsAndChildren() {
    let adultCount = parseInt($("#numAdults").val()) || 0; // Default to 0 if input is not a number
    let childCount = parseInt($("#numChildren").val()) || 0; // Default to 0 if input is not a number

    let totalPeopleCount = adultCount + childCount;

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
    let start_Date = $("#startDate").val();
    let end_Date = $("#endDate").val();
    let Package_category = $("#packageCategory").val();
    let No_ofAdults = parseInt($("#numAdults").val());
    let No_ofChild = parseInt($("#numChildren").val());
    let totalOfHeadCount =  countAdultsAndChildren();
    let allowPets = $("#petstatus").val();
    let NeedGuide = $("#needGuide").val();
    let NameofGuide = $("#guidenames").val(); // Make sure this field is properly defined in your HTML
    let TotalOfHotelVehicleGuide = calculatePackageTotal(); // Call the function to calculate the total package value
    let SpecialRequests = $("#specialremark").val();

    // Create an object to store the data
    const data = {
        startDuration: start_Date,
        endDuration: end_Date,
        packageCategory: Package_category,
        noOfAdults: No_ofAdults,
        noOfChildren: No_ofChild,
        totalHeadCount: totalOfHeadCount,
        isPetsAllowed: allowPets,
        isGuideNeeded: NeedGuide,
        NameGuide: NameofGuide,
        TotalPackageValue: TotalOfHotelVehicleGuide,
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
