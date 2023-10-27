swal("Welcome To Customer Panel 👤");
localStorage.setItem("AD_USER",JSON.stringify("eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyUm9sZSI6IkFEX1VTRVIiLCJzdWIiOiJ1c2VyYWRtaW4yMDAxIiwiaWF0IjoxNjk4MjE4NDMyLCJleHAiOjQ4NTE4MTg0MzJ9.ojHdxgx9k3lJMdNwjYei4eNE2DPM7EWO9Ttjx2eJCog"));

// Check if the document is ready
$(document).ready(function() {
    // Attach the click event handler to the "payAddButton"
    $("#cusAddButton").on("click", function() {
        OnSaveUser();
    });

    $("#cusUpdateButton").on("click", function() {
        OnUpdateUser();
    });

    $("#getAllCustomersButton").on("click", function() {
        event.preventDefault();
        OnGetAllUser();
    });

    $("#Cusdelete").on("click", function() {

        OnDeleteCustomer();
    });

});


var hcl="";
//upload imags
function saveImage(fileInputId, successCallback) {
    var formData = new FormData();
    var file = $(fileInputId)[0].files[0];

    if (file) {
        formData.append('imageFile', file);

        $.ajax({
            url: 'http://localhost:8090/api/v1/uploadingUploader/upload',
            type: 'POST',
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
                hcl = data;
                console.log("IMG : " + data);
                successCallback(data); // Call the success callback with the image data
            },
            error: function (xhr, textStatus, errorThrown) {
                swal("OOPS!", "Server threw an exception : " + xhr.responseJSON.message, "error");
            }
        });
    } else {
        successCallback(""); // Call the success callback with an empty string if no file selected
    }
}

// save customer

function OnSaveUser() {
    // Create an array to store the image data
    const imageArray = [];

    // Define the file input IDs
    const fileInputIds = ["#userNic_Photo"];

    // Define a function to handle the success of saving an image
    function handleImageSave(data) {
        imageArray.push(data);

        // If all three images have been processed, proceed with saving the data
        if (imageArray.length === fileInputIds.length) {
            const ID = $("#userid").val();
            const Name = $("#Name").val();
            const UserName = $("#userName").val();
            const nic = $("#usernic").val();
            const password = $("#userpassword").val();
            const Gender = $("#gender").val();
            const Age = $("#age").val();
            const Emails = $("#email").val();
            const ContactNumber = $("#contactNumber").val();
            const Addresss = $("#address").val();
            const userIMG = imageArray[0]; // Assuming the first image is for guideID
            const remark = $("#remark").val();

            // Create an object to store the data
            const data = {
                userId: ID,
                name: Name,
                userName: UserName,
                userNIC: nic,
                userPassword: password,
                gender: Gender,
                userAge: Age,
                userEmail: Emails,
                userPhone: ContactNumber,
                userAddress: Addresss,
                userNICImageLocation: userIMG,
                remarks: remark
            };

            // Make the AJAX request to save the data
            setTimeout(() => {
                $.ajax({
                    url: "http://localhost:8080/api/v1/auth/getAuth",
                    method: "POST",
                    contentType: "application/json",
                    data: JSON.stringify(data),

                    success: function (response) {

                        if (response.statusCode === 200 || response.statusCode === 201 || response.statusCode === 500)
                            var token=response.data;
                           localStorage.setItem("DefaultCusToken:::: ",token);
                            swal("Save successful");
                        // You can handle the response from the server here if needed
                    },
                    error: function (xhr, textStatus, errorThrown) {
                        swal("Error: " + xhr.responseText);

                    }
                });
            }, 2000);
        }
    }

    // Save each image with a delay
    for (let i = 0; i < fileInputIds.length; i++) {
        const delay = 2000 * i; // Delay increases for each image
        setTimeout(() => {
            saveImage(fileInputIds[i], handleImageSave);
        }, delay);
    }
}



//update customer
var imgindw="";
//upload imags
function saveImageinUpload(fileInputId, successCallback) {
    var formData = new FormData();
    var file = $(fileInputId)[0].files[0];

    if (file) {
        formData.append('imageFile', file);

        $.ajax({
            url: 'http://localhost:8090/api/v1/uploadingUploader/upload',
            type: 'POST',
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
                imgindw = data;
                console.log("IMG : " + data);
                successCallback(data); // Call the success callback with the image data
            },
            error: function (xhr, textStatus, errorThrown) {
                swal("OOPS!", "Server threw an exception : " + xhr.responseJSON.message, "error");
            }
        });
    } else {
        successCallback(""); // Call the success callback with an empty string if no file selected
    }
}


function OnUpdateUser() {
    // Create an array to store the image data
    const imageArray = [];

    // Define the file input IDs
    const fileInputIds = ["#uuserNic_Photo"];

    // Define a function to handle the success of saving an image
    function handleImageSave(data) {
        imageArray.push(data);

        // If all three images have been processed, proceed with saving the data
        if (imageArray.length === fileInputIds.length) {
            const ID = $("#uuserid").val();
            const Name = $("#uName").val();
            const UserName = $("#uuserName").val();
            const nic = $("#uusernic").val();
            const password = $("#uuserpassword").val();
            const Gender = $("#ugender").val();
            const Age = $("#uage").val();
            const Emails = $("#uemail").val();
            const ContactNumber = $("#ucontactNumber").val();
            const Addresss = $("#uaddress").val();
            const userIMG = imageArray[0]; // Assuming the first image is for guideID
            const remark = $("#uremark").val();

            // Create an object to store the data
            const data = {
                userId: ID,
                name: Name,
                userName: UserName,
                userNIC: nic,
                userPassword: password,
                gender: Gender,
                userAge: Age,
                userEmail: Emails,
                userPhone: ContactNumber,
                userAddress: Addresss,
                userNICImageLocation: userIMG,
                remarks: remark
            };

            let token = localStorage.getItem("AD_USER");
            console.log(token)
            // Check if the token is valid
            if (!token) {
                swal("Token not found. Please log in.");
                return;
            }
            // Make the AJAX request to save the data
            setTimeout(() => {
                $.ajax({
                    url: "http://localhost:8080/api/v1/userApi/updateUser",
                    method: "PUT",
                    contentType: "application/json",
                    data: JSON.stringify(data),
                    headers: {
                        "Authorization": "Bearer " + JSON.parse(localStorage.getItem("AD_USER"))

                    },
                    success: function (response) {

                        if (response.statusCode === 200 || response.statusCode === 201)
                        swal("Update successful");
                        // You can handle the response from the server here if needed
                    },
                    error: function (xhr, textStatus, errorThrown) {
                        swal("Error: " + xhr.responseText);

                    }
                });
            }, 2000);
        }
    }

    // Save each image with a delay
    for (let i = 0; i < fileInputIds.length; i++) {
        const delay = 2000 * i; // Delay increases for each image
        setTimeout(() => {
            saveImageinUpload(fileInputIds[i], handleImageSave);
        }, delay);
    }
}


// search customer


$(document).ready(function (){
    $('#cusSearchButton').on('click', function () {
        const cusID = $('#uuserid').val().trim();
        if (cusID) {
            fetchGuideByID(cusID);
        } else {
            swal("Please enter a Customer ID to search ");
        }
    });
});

function fetchGuideByID(id) {
    $.ajax({
        url: 'http://localhost:8080/api/v1/userApi/U_searching?userId=' + id,
        method: "GET",
        headers: {
            "Authorization": "Bearer " + JSON.parse(localStorage.getItem("AD_USER"))
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
    let UserData = res.data;
    if (UserData) {
        $("#uName").val(UserData.name);
        $("#uuserName").val(UserData.userName);
        $("#uusernic").val(UserData.userNIC);

        // Set the selected option in the dropdown
        $("#uuserpassword").val(UserData.userPassword);
        $("#uemail").val(UserData.userEmail);
        $("#ugender").val(UserData.gender);
        $("#ucontactNumber").val(UserData.userPhone);
        $("#uage").val(UserData.userAge);
        $("#address").val(UserData.userAddress);

        $("#uremark").val(UserData.remarks);
    } else {
        swal("No data received");
    }
}



// get all

function OnGetAllUser() {
    $.ajax({
        url: "http://localhost:8080/api/v1/userApi/getAllUsers",
        method: "GET",
        headers: {
            "Authorization": "Bearer " + JSON.parse(localStorage.getItem("AD_USER"))
        },
        success: (res) => {
            if (!res.data) {
                // Handle the case when no data is found
                swal("OOPS!", "No data found!", "error");
            } else {
                console.log("Response data:", res.data);

                const tableBody = $("#tbody");
                tableBody.empty(); // Clear the existing table rows

                res.data.forEach((user) => {
                    let row = "<tr>";
                    row += "<td>" + user.userId + "</td>";
                    row += "<td>" + user.name + "</td>";
                    row += "<td>" + user.userName + "</td>";
                    row += "<td>" + user.userPassword + "</td>";
                    row += "<td>" + user.userNIC + "</td>";
                    row += "<td><img src='" + user.userNICImageLocation + "' alt='User Image' height='100' width='100'></td>";
                    row += "<td>" + user.gender + "</td>";
                    row += "<td>" + user.userEmail + "</td>";
                    row += "<td>" + user.userPhone + "</td>";
                    row += "<td>" + user.userAddress + "</td>";
                    row += "<td>" + user.remarks + "</td>";
                    row += "</tr>";

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







//delete
function OnDeleteCustomer() {
    // Retrieve form data
    if ($("#cusID").val() === "") {
        return swal("OOPS!", "Please enter a Customer ID to delete!", "error");
    }

    let token = localStorage.getItem("AD_USER");
    console.log(token)
    // Check if the token is valid
    if (!token) {
        swal("Token not found. Please log in.");
        return;
    }
    // Make the AJAX request to save the payment data
    $.ajax({
        url: "http://localhost:8080/api/v1/userApi/deleteUser?userId="+ $('#cusID').val(),
        method: "DELETE",
        contentType: "application/json",
        headers: {
            "Authorization": "Bearer " + JSON.parse(localStorage.getItem("AD_USER"))

        },

        success: function (response) {
            swal("res"+response)
            if (response.statusCode === 200 || response.statusCode === 201 )
                swal("Delete successful");
            // You can handle the response from the server here if needed
        },
        error: function (xhr, textStatus, errorThrown) {
            swal("Error: " + xhr.responseText);

        }
    });
}



