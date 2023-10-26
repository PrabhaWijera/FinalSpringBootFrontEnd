localStorage.setItem("HToken",JSON.stringify("eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyUm9sZSI6IkFfSE9URUwiLCJzdWIiOiJob3RlbDIwMDEiLCJpYXQiOjE2OTgyMTczMjMsImV4cCI6NDg1MTgxNzMyM30.wHic2oKFfSTxMqLKMbV96Z9bnYgdyE_EaacnOGG2Lz8"));

// Check if the document is ready
$(document).ready(function() {
    // Attach the click event handler to the "payAddButton"
    $("#hotelAddButton").on("click", function() {
        OnSaveHotel();
    });

    $("#hUpdateButton").on("click", function() {
        OnUpdateHotel();
    });

    $("#getAllButton").on("click", function() {
        OnGetAll();
    });

    $("#deletehotel").on("click", function() {
        OnDeleteHotel();
    });




});

$(document).on("mouseleave","#hName",()=>{
    getCoordinates();
});

function OnDeleteHotel() {
    // Retrieve form data
    if ($("#dHId").val() === "") {
        return swal("OOPS!", "Please enter a Hotel ID to delete!", "error");
    }

    let token = localStorage.getItem("HToken");
    console.log(token)
    // Check if the token is valid
    if (!token) {
        alert("Token not found. Please log in.");
        return;
    }
    // Make the AJAX request to save the payment data
    $.ajax({
        url: "http://localhost:8083/api/v1/hotel/H_Delete?H_ID="+ $('#dHId').val(),
        method: "DELETE",
        contentType: "application/json",
        headers: {
            "Authorization": "Bearer " + JSON.parse(localStorage.getItem("HToken"))

        },

        success: function (response) {
            alert("res"+response)
            if (response.statusCode === 200 || response.statusCode === 201 )
                alert("Save successful");
            // You can handle the response from the server here if needed
        },
        error: function (xhr, textStatus, errorThrown) {
            alert("Error: " + xhr.responseText);

        }
    });
}

/*
function OnSearchHotel() {
    const hotelName = $("#cidField").val();
    if (!hotelName) {
        swal("Error", "Hotel name is required", "error");
        return;
    }

    const authToken = JSON.parse(localStorage.getItem("HToken"));

    if (!authToken) {
        swal("Error", "Authentication token is missing", "error");
        return;
    }

    $.ajax({
        url: "http://localhost:8083/api/v1/hotel/getHotelByHotelName?hotelName=" + hotelName,
        method: "GET",
        contentType: "application/json",
        headers: {
            "Authorization": "Bearer " + authToken
        },
        success: (res) => {
            if (res.statusCode === 200 || res.statusCode === 201) {
                // Populate input fields with retrieved data
                $("#hId").val(res.data.hotelId);
                $("#hName").val(res.data.hotelName);
                $("#hCategory").val(res.data.hotelCategory);
                $("#hemail").val(res.data.hotelContactEmail);
                // Select the option in the dropdown based on the response (if applicable)

                $("#hotelContact1").val(res.data.hotelContact1);
                $("#FullBoarddoublehotelFee").val(res.data.fullBoardWithACLuxuryRoomDouble);
                $("#HalfBoardDoublehotelFee").val(res.data.halfBoardWithACLuxuryRoomDouble);
                $("#FullBoardTriplehotelFee").val(res.data.fullBoardWithACLuxuryRoomTriple);
                $("#HalfBoardTriplehotelFee").val(res.data.halfBoardWithACLuxuryRoomTriple);
                $("#remark").val(res.data.remarks);

                swal("Success", res.message, "success");
            } else {
                swal("Error", res.message, "error");
            }
        },
        error: (xhr, textStatus, errorThrown) => {
            if (xhr.responseJSON && xhr.responseJSON.message) {
                swal("Error", "Server threw an exception: " + xhr.responseJSON.message, "error");
            } else {
                swal("Error", "An error occurred while processing your request.", "error");
            }
        }
    });
}*/


function OnSaveHotel() {
    // Retrieve form data

    let HID = $("#hId").val();
    let name = $("#hName").val();
    let str = $("#starRate").val();
    let cate = $("#hCategory").val();
    let address = $("#hAddress").val();
    let cordinate = $("#hcordinate").val();
    let hotelImG = $("#hotelImg").val();
    let email = $("#hemail").val();
    let contact1 = $("#hotelContact1").val();
    let contact2 = $("#hotelContact2").val();
    let petOk = $("#pet").val();
    let fullDfee = $("#FullBoarddoublehotelFee").val();
    let HallDfee = $("#HalfBoardDoublehotelFee").val();
    let FullTfee = $("#FullBoardTriplehotelFee").val();
    let HallTfee = $("#HalfBoardTriplehotelFee").val();
    let hfee = $("#hotelsFees").val();
    let cncelling = $("#CancellationCriteria").val();
    let remak = $("#remark").val();


    // Create an object to store the data
    const data = {
        hotelId:HID,
        hotelName:name,
        stars:str,
        hotelCategory:cate,
        hotelLocation:address,
        hotelLocationWithCoordinates:cordinate,
        hotelImageLocation:hotelImG,
        hotelContactEmail:email,
        hotelContact1:contact1,
        hotelContact2:contact2,
        isPetsAllowed:petOk,
        fullBoardWithACLuxuryRoomDouble:fullDfee,
        halfBoardWithACLuxuryRoomDouble:HallDfee,
        fullBoardWithACLuxuryRoomTriple:FullTfee,
        halfBoardWithACLuxuryRoomTriple:HallTfee,
        hotelFee:hfee,
        cancellationCriteria:cncelling,
        remarks:remak


    };

    // Retrieve the JWT token from localStorage
    let token = localStorage.getItem("HToken");
    console.log(token)
    // Check if the token is valid
    if (!token) {
        alert("Token not found. Please log in.");
        return;
    }

    // Make the AJAX request to save the payment data
    $.ajax({
        url: "http://localhost:8083/api/v1/hotel/h_save",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(data),
        headers: {
            "Authorization": "Bearer " + JSON.parse(localStorage.getItem("HToken"))

        },

        success: function (response) {
            alert("res"+response)
            if (response.statusCode === 200 || response.statusCode === 201 )
                alert("Save successful");
            // You can handle the response from the server here if needed
        },
        error: function (xhr, textStatus, errorThrown) {
            alert("Error: " + xhr.responseText);

        }
    });
}
// update
function OnUpdateHotel() {
    // Retrieve form data


    let HID = $("#huId").val();
    let name = $("#huName").val();
    let str = $("#ustarRate").val();
    let cate = $("#huCategory").val();
    let address = $("#huAddress").val();
    let cordinate = $("#uhcordinate").val();
    let hotelImG = $("#uhotelImg").val();
    let email = $("#huemail").val();
    let contact1 = $("#uhotelContact1").val();
    let contact2 = $("#uhotelContact2").val();
    let petOk = $("#upet").val();
    let fullDfee = $("#uFullBoarddoublehotelFee").val();
    let HallDfee = $("#uHalfBoardDoublehotelFee").val();
    let FullTfee = $("#uFullBoardTriplehotelFee").val();
    let HallTfee = $("#uHalfBoardTriplehotelFee").val();
    let hfee = $("#uhotelsFees").val();
    let cncelling = $("#uCancellationCriteria").val();
    let remak = $("#uremark").val();

    // Create an object to store the data
    // Create an object to store the data
    const data = {
        hotelId:HID,
        hotelName:name,
        stars:str,
        hotelCategory:cate,
        hotelLocation:address,
        hotelLocationWithCoordinates:cordinate,
        hotelImageLocation:hotelImG,
        hotelContactEmail:email,
        hotelContact1:contact1,
        hotelContact2:contact2,
        isPetsAllowed:petOk,
        fullBoardWithACLuxuryRoomDouble:fullDfee,
        halfBoardWithACLuxuryRoomDouble:HallDfee,
        fullBoardWithACLuxuryRoomTriple:FullTfee,
        halfBoardWithACLuxuryRoomTriple:HallTfee,
        hotelFee:hfee,
        cancellationCriteria:cncelling,
        remarks:remak


    };

    // Retrieve the JWT token from localStorage
    let token = localStorage.getItem("HToken");
    console.log(token)
    // Check if the token is valid
    if (!token) {
        alert("Token not found. Please log in.");
        return;
    }

    // Make the AJAX request to save the payment data
    $.ajax({
        url: "http://localhost:8083/api/v1/hotel/h_put",
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify(data),
        headers: {
            "Authorization": "Bearer " + JSON.parse(localStorage.getItem("HToken"))

        },

        success: function (response) {
            alert("res"+response)
            if (response.statusCode === 200 || response.statusCode === 201 )
                alert("Save successful");
            // You can handle the response from the server here if needed
        },
        error: function (xhr, textStatus, errorThrown) {
            alert("Error: " + xhr.responseText);

        }
    });
}

//get all


function OnGetAll() {
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

                const tableBody = $("#Hbody");
                tableBody.empty(); // Clear the existing table rows

                res.data.map((hotels) => {
                    // Create a new row for each vehicle
                    let row = "<tr>" +
                        "<td>" + hotels.hotelId+ "</td>" +
                        "<td>" + hotels.hotelName + "</td>" +
                        "<td>" + hotels.hotelLocation + "</td>" +
                        "<td>" + hotels.hotelContact1 + "</td>" +
                        "<td>" + hotels.hotelContactEmail + "</td>" +
                        "<td>" + hotels.isPetsAllowed + "</td>" +
                        "<td>" + hotels.fullBoardWithACLuxuryRoomDouble + "</td>" +
                        "<td>" + hotels.halfBoardWithACLuxuryRoomDouble + "</td>" +
                        "<td>" + hotels.fullBoardWithACLuxuryRoomTriple + "</td>" +
                        "<td>" + hotels.halfBoardWithACLuxuryRoomTriple + "</td>" +
                        "<td>" + hotels.cancellationCriteria + "</td>" +
                        "<td>" + hotels.remarks + "</td>" +
                        "</tr>";

                    tableBody.append(row);
                });
            }
        },
        error: (xhr, textStatus, errorThrown) => {
            let errorMessage = "An unexpected error occurred.";
            if (xhr.responseJSON && xhr.responseJSON.message) {
                errorMessage = xhr.responseJSON.message;
            }
            swal("OOPS!", "Server error: " + errorMessage, "error");
        }
    });
}


//cordinates

function getCoordinates(){
    axios.get("https://geocode.maps.co/search?q="+$("#hName").val())
        .then((res)=>{
            console.log(res.data[0].lat)
            $("#hcordinate").val("Latitude : "+res.data[0].lat+',Longitude : '+res.data[0].lon)



        })
        .catch((err)=>{
            console.log(err)
            swal("OOPS! ","An error occurred while fetching coordinates!","error");


        })



}






//search
$(document).ready(function (){
    $('#hSearchButton').on('click', function () {
        const hotelID = $('#huId').val().trim();
        if (hotelID) {
            fetchHotelByID(hotelID);
        } else {
            alert("Please enter a Hotel ID to search ");
        }
    });
});

function fetchHotelByID(id) {
    $.ajax({
        url: 'http://localhost:8083/api/v1/hotel/H_search?H_ID=' + id,
        method: "GET",
        headers: {
            "Authorization": "Bearer " + JSON.parse(localStorage.getItem("HToken"))
        },
        success: function (res) {
            populateFieldsWithRes(res);
        },
        error: function () {
            alert("Oops!");
        }
    });
}

function populateFieldsWithRes(res) {
    let hotelData = res.data;
    if (hotelData) {
        $("#huName").val(hotelData.hotelName);
        $("#ustarRate").val(hotelData.stars);
        $("#huCategory").val(hotelData.hotelCategory);

        // Set the selected option in the dropdown

        $("#huAddress").val(hotelData.hotelLocation);
        $("#uhcordinate").val(hotelData.hotelLocationWithCoordinates);
     /*   $("#uhcordinate").val(hotelData.hotelImageLocation);*/

        $("#huemail").val(hotelData.hotelContactEmail);
        $("#uhotelContact1").val(hotelData.hotelContact1);
        $("#uhotelContact2").val(hotelData.hotelContact2);
        $("#upet").val(hotelData.isPetsAllowed);
        $("#uFullBoarddoublehotelFee").val(hotelData.fullBoardWithACLuxuryRoomDouble);
        $("#uHalfBoardDoublehotelFee").val(hotelData.halfBoardWithACLuxuryRoomDouble);
        $("#uFullBoardTriplehotelFee").val(hotelData.fullBoardWithACLuxuryRoomTriple);
        $("#uHalfBoardTriplehotelFee").val(hotelData.halfBoardWithACLuxuryRoomTriple);
        $("#uhotelsFees").val(hotelData.hotelFee);
        $("#uCancellationCriteria").val(hotelData.cancellationCriteria);
        $("#uremark").val(hotelData.remarks);
    } else {
        alert("No data received");
    }
}
