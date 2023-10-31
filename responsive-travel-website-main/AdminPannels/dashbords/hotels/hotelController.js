swal("Welcome To Hotel Panel 🛎️");
localStorage.setItem("HToken",JSON.stringify("eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyUm9sZSI6IkFfSE9URUwiLCJzdWIiOiJob3RlbDIwMDEiLCJpYXQiOjE2OTgyMTczMjMsImV4cCI6NDg1MTgxNzMyM30.wHic2oKFfSTxMqLKMbV96Z9bnYgdyE_EaacnOGG2Lz8"));
localStorage.setItem("PKG_TK",JSON.stringify("eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyUm9sZSI6IkFfUEFDS0FHRSIsInN1YiI6InBhY2thZ2UyMDAxIiwiaWF0IjoxNjk4MjE4MTgzLCJleHAiOjQ4NTE4MTgxODN9.M4bzixa7mGlo-mmyhasByViBgMooTU_t5T4YvAyzmh0"));

localStorage.setItem("PKG_ADMIN_TKN",JSON.stringify("eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyUm9sZSI6IlBBQ0tBR0VfREVUQUlMUyIsInN1YiI6InBhY2thZ2VEZXRhaWxzYWRtaW4yMDAxIiwiaWF0IjoxNjk4NDY3MjQyLCJleHAiOjQ4NTIwNjcyNDJ9.iJmDyxXpcXihXCGqjv0S13WaFEku7zE_XQBr6LMKXXU"));

// Check if the document is ready
$(document).ready(function() {
    getPackagesIDs();
    getPackagesCategory();

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


// get packageIDs

function getPackagesIDs() {
    $.ajax({
        url: 'http://localhost:8081/api/v1/package_server/P_getAll',
        method: 'GET',
        headers: {
            "Authorization": "Bearer " + JSON.parse(localStorage.getItem("PKG_TK"))
        },
        success: function (res) {
            if (!res || !res.data || res.data.length === 0) {
                // Handle the case when no data is found
                swal("OOPS!", "No data found!", "error");
            } else {
                console.log("Response data:", res.data);

                const selectElement = $("#pId");
                selectElement.empty(); // Clear the existing options

                const selectElement1 = $("#upId");
                selectElement1.empty(); // Clear the existing options

                res.data.forEach(function (pk) {
                    let option = $("<option>");
                    option.attr("value", pk.package_id);
                    option.text(pk.package_id);

                    selectElement.append(option.clone()); // Use .clone() to create a new option
                    selectElement1.append(option.clone());
                });
            }
        },
        error: function (error) {
            console.error('Error fetching data from the server', error);
        }
    });
}

function getPackagesCategory() {
    $.ajax({
        url: 'http://localhost:8081/api/v1/package_server/P_getAll',
        method: 'GET',
        headers: {
            "Authorization": "Bearer " + JSON.parse(localStorage.getItem("PKG_TK"))
        },
        success: function (res) {
            if (!res || !res.data || res.data.length === 0) {
                // Handle the case when no data is found
                swal("OOPS!", "No data found!", "error");
            } else {
                console.log("Response data:", res.data);

                const selectElement = $("#packgwCategory");
                selectElement.empty(); // Clear the existing options

                const selectElement1 = $("#upackgwCategory");
                selectElement1.empty(); // Clear the existing options

                res.data.forEach(function (pk) {
                    let option = $("<option>");
                    option.attr("value", pk.packageCategory);
                    option.text(pk.packageCategory);

                    selectElement.append(option.clone()); // Use .clone() to create a new option
                    selectElement1.append(option.clone());
                });
            }
        },
        error: function (error) {
            console.error('Error fetching data from the server', error);
        }
    });
}









function OnDeleteHotel() {
    // Retrieve form data
    if ($("#dHId").val() === "") {
        return swal("OOPS!", "Please enter a Hotel ID to delete!", "error");
    }

    let token = localStorage.getItem("HToken");
    console.log(token)
    // Check if the token is valid
    if (!token) {
        swal("Token not found. Please log in.");
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
            swal("res"+response)
            if (response.statusCode === 200 || response.statusCode === 201 )
                swal("Save successful");
            // You can handle the response from the server here if needed
        },
        error: function (xhr, textStatus, errorThrown) {
            swal("Error: " + xhr.responseText);

        }
    });
}

var hcl="";
function saveImage(){
    var formData = new FormData();
    var file=$('#hotelImg')[0].files[0];
    console.log(file);
    formData.append('imageFile',file);

    $.ajax({
        url: 'http://localhost:8090/api/v1/uploadingUploader/upload',
        type: 'POST',
        data:formData ,

        cache: false,
        contentType:false,
        processData: false,
        success: function (data) {

            hcl = data;
            console.log("IMG : " + data)


        }, error: (xhr, textStatus, errorThrown) => {
            swal("OOPS!", "Server threw an exception : ");
        }
    });

}

function OnSaveHotel() {
    // Retrieve form data

    let HID = $("#hId").val();
    let name = $("#hName").val();
    let str = $("#starRate").val();
    let pId = $("#pId").val();
    console.log(pId);
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
/*    let hfee = $("#hotelsFees").val();*/
    let cncelling = $("#CancellationCriteria").val();
    let remak = $("#remark").val();

    saveImage();
    // Create an object to store the data
    const data = {
        hotelId:HID,
        hotelName:name,
        stars:str,
        packageId:pId,
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
 /*       hotelFee:hfee,*/
        cancellationCriteria:cncelling,
        remarks:remak


    };

    // Retrieve the JWT token from localStorage
    let token = localStorage.getItem("HToken");
    console.log(token)
    // Check if the token is valid
    if (!token) {
        swal("Token not found. Please log in.");
        return;
    }

    // Make the AJAX request to save the payment data
    setTimeout(() => {
        $.ajax({
            url: "http://localhost:8083/api/v1/hotel/h_save",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(data),
            headers: {
                "Authorization": "Bearer " + JSON.parse(localStorage.getItem("HToken"))

            },

            success: function (response) {
                swal("res"+response)
                if (response.statusCode === 200 || response.statusCode === 201 )
                    swal("Save successful");
                // You can handle the response from the server here if needed
            },
            error: function (xhr, textStatus, errorThrown) {
                swal("Error: " + xhr.responseText);

            }
        });
    },1000);
}
// update
function OnUpdateHotel() {
    // Retrieve form data


    let HID = $("#huId").val();
    let name = $("#huName").val();
    let str = $("#ustarRate").val();
    let pId = $("#upId").val();
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
/*    let hfee = $("#uhotelsFees").val();*/
    let cncelling = $("#uCancellationCriteria").val();
    let remak = $("#uremark").val();

    // Create an object to store the data
    // Create an object to store the data
    const data = {
        hotelId:HID,
        hotelName:name,
        stars:str,
        packageID:pId,
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
       /* hotelFee:hfee,*/
        cancellationCriteria:cncelling,
        remarks:remak


    };

    // Retrieve the JWT token from localStorage
    let token = localStorage.getItem("HToken");
    console.log(token)
    // Check if the token is valid
    if (!token) {
        swal("Token not found. Please log in.");
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
            swal("res"+response)
            if (response.statusCode === 200 || response.statusCode === 201 )
                swal("Save successful");
            // You can handle the response from the server here if needed
        },
        error: function (xhr, textStatus, errorThrown) {
            swal("Error: " + xhr.responseText);

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
            swal("Please enter a Hotel ID to search ");
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
            swal("Oops!");
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
     /*   $("#uhotelsFees").val(hotelData.hotelFee);*/
        $("#uCancellationCriteria").val(hotelData.cancellationCriteria);
        $("#uremark").val(hotelData.remarks);
    } else {
        swal("No data received");
    }
}
