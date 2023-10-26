localStorage.setItem("GToken",JSON.stringify("eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyUm9sZSI6IkFfR1VJREUiLCJzdWIiOiJhZG1pbmd1aWRlMjAwMSIsImlhdCI6MTY5ODIxNjUwOCwiZXhwIjo0ODUxODE2NTA4fQ.hQqMDON3iG7ANAOS45k064KfmpdgqOXpZ2T7bgIBFJ4"));

// Check if the document is ready
$(document).ready(function() {
    // Attach the click event handler to the "payAddButton"
    $("#guideAddButton").on("click", function() {
        OnSaveGuide();
    });
    // update the click event handler to the "payAddButton"
    $("#gUpdateButton").on("click", function() {
        OnUpdateGuide();
    });


    $("#getAllButton").on("click", function() {
        OnGetAll();
    });

    $("#deleteGuide").on("click", function() {
        OnDeleteGuide();
    });


});












var hcl = "";

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

function OnSaveGuide() {
    // Create an array to store the image data
    const imageArray = [];

    // Define the file input IDs
    const fileInputIds = ["#guideIMG", "#gudingIDimg", "#gNICimg"];

    // Define a function to handle the success of saving an image
    function handleImageSave(data) {
        imageArray.push(data);

        // If all three images have been processed, proceed with saving the data
        if (imageArray.length === fileInputIds.length) {
            const ID = $("#gId").val();
            const name = $("#gName").val();
            const age = $("#age").val();
            const addres = $("#gAddress").val();
            const gender = $("#gender").val();
            const guideID = imageArray[0]; // Assuming the first image is for guideID
            const guideNIC = imageArray[1]; // Assuming the second image is for guideNIC
            const guideingID = imageArray[2]; // Assuming the third image is for guideingID
            const experience = $("#gExperience").val();
            const manValue = $("#mandayValue").val();
            const remark = $("#gremark").val();

            // Create an object to store the data
            const data = {
                guideID: ID,
                guideName: name,
                guideAge: age,
                guideAddress: addres,
                guideGender: gender,
                guidePICIMGLocation: guideID,
                guideNICIMGLocation: guideNIC,
                guideIDIMGLocation: guideingID,
                guideExperience: experience,
                manDayValue: manValue,
                remark: remark
            };

            // Retrieve the JWT token from localStorage
            let token = localStorage.getItem("GToken");

            // Check if the token is valid
            if (!token) {
                swal("Token not found. Please log in.");
                return;
            }

            // Make the AJAX request to save the data
            setTimeout(() => {
                $.ajax({
                    url: "http://localhost:8085/api/v1/guide/Gsave",
                    method: "POST",
                    contentType: "application/json",
                    data: JSON.stringify(data),
                    headers: {
                        "Authorization": "Bearer " + JSON.parse(localStorage.getItem("GToken"))
                    },
                    success: function (response) {
                        alert("res" + response);
                        if (response.statusCode === 200 || response.statusCode === 201) {
                            swal("Save successful");
                        }
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



/*

var hcl="";
function saveImage() {
    var formData = new FormData();
    var file = $('#guideIMG')[0].files[0];
    console.log(file);
    formData.append('imageFile', file);

    $.ajax({
        url: 'http://localhost:8090/api/v1/uploadingUploader/upload',
        type: 'POST',
        data: formData,

        cache: false,
        contentType:false,
        processData: false,
        success: function (data) {

            hcl = data;
            console.log("IMG : " + data)


        }, error: (xhr, textStatus, errorThrown) => {
            swal("OOPS!", "Server threw an exception : " + xhr.responseJSON.message, "error");
        }
    });

}


function OnSaveGuide() {
    // Retrieve form data

    let ID = $("#gId").val();
    let name = $("#gName").val();
    let age = $("#age").val();
    let addres = $("#gAddress").val();
    let gender = $("#gender").val();
    let guideIMG = $("#guideIMG").val();
    let guideNIC = $("#gNICimg").val();
    let guideingID = $("#gudingIDimg").val();
    let experience = $("#gExperience").val();
    let manValue = $("#mandayValue").val();
    let remark = $("#gremark").val();

    saveImage();
    // Create an object to store the data
    const data = {
        guideID:ID,
        guideName:name,
        guideAge:age,
        guideAddress:addres,
        guideGender:gender,
        guidePICIMGLocation:guideIMG,
        guideNICIMGLocation:guideNIC,
        guideIDIMGLocation:guideingID,
        guideExperience:experience,
        manDayValue:manValue,
        remark:remark

    };

    // Retrieve the JWT token from localStorage
    let token = localStorage.getItem("GToken");
    console.log(token)
    // Check if the token is valid
    if (!token) {
        swal("Token not found. Please log in.");
        return;
    }


    // Make the AJAX request to save the payment data
    setTimeout(()=>{
        $.ajax({
            url: "http://localhost:8085/api/v1/guide/Gsave",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(data),
            headers: {
                "Authorization": "Bearer " + JSON.parse(localStorage.getItem("GToken"))

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
        })
    },2000);



}
*/
//update
function OnUpdateGuide() {
    // Retrieve form data

    let ID = $("#ugId").val();
    let name = $("#ugName").val();
    let age = $("#uage").val();
    let addres = $("#ugAddress").val();
    let gender = $("#ugender").val();
    let guideIMG = $("#uguideIMG").val();
    let guideNIC = $("#ugNICimg").val();
    let guideingID = $("#ugudingIDimg").val();
    let experience = $("#ugExperience").val();
    let manValue = $("#umandayValue").val();
    let remark = $("#ugremark").val();

    // Create an object to store the data
    const data = {
        guideID:ID,
        guideName:name,
        guideAge:age,
        guideAddress:addres,
        guideGender:gender,
        guidePICIMGLocation:guideIMG,
        guideNICIMGLocation:guideNIC,
        guideIDIMGLocation:guideingID,
        guideExperience:experience,
        manDayValue:manValue,
        remark:remark

    };
    // Retrieve the JWT token from localStorage
    let token = localStorage.getItem("GToken");
    console.log(token)
    // Check if the token is valid
    if (!token) {
        swal("Token not found. Please log in.");
        return;
    }

    // Make the AJAX request to save the payment data
    $.ajax({
        url: "http://localhost:8085/api/v1/guide/Gput",
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify(data),
        headers: {
            "Authorization": "Bearer " + JSON.parse(localStorage.getItem("GToken"))

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

//get all
function OnGetAll() {
    $.ajax({
        url: "http://localhost:8085/api/v1/guide/getAllGuide",
        method: "GET",
        headers: {
            "Authorization": "Bearer " + JSON.parse(localStorage.getItem("GToken"))
        },
        success: (res) => {
            if (!res.data) {
                // Handle the case when no data is found
                swal("OOPS!", "No data found!", "error");
            } else {
                console.log("Response data:", res.data);

                const tableBody = $("#tbody");
                tableBody.empty(); // Clear the existing table rows

                res.data.forEach((guide) => {
                    let row = "<tr>";
                    row += "<td>" + guide.guideID + "</td>";
                    row += "<td>" + guide.guideName + "</td>";
                    row += "<td>" + guide.guideAddress + "</td>";
                    row += "<td>" + guide.guideAge + "</td>";
                    row += "<td>" + guide.guideGender + "</td>";
                    row += "<td><img src='" + guide.guidePICIMGLocation + "' alt='Guide Image' height='100' width='100'></td>";
                    row += "<td><img src='" + guide.guideNICIMGLocation + "' alt='NIC Image' height='100' width='100'></td>";
                    row += "<td><img src='" + guide.guideIDIMGLocation + "' alt='Guiding ID Image' height='100' width='100'></td>";
                    row += "<td>" + guide.guideExperience + "</td>";
                    row += "<td>" + guide.manDayValue + "</td>";
                    row += "<td>" + guide.remark + "</td>";
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
function OnDeleteGuide() {
    // Retrieve form data
    if ($("#gDID").val() === "") {
        return swal("OOPS!", "Please enter a Guide ID to delete!", "error");
    }

    let token = localStorage.getItem("GToken");
    console.log(token)
    // Check if the token is valid
    if (!token) {
        alert("Token not found. Please log in.");
        return;
    }
    // Make the AJAX request to save the payment data
    $.ajax({
        url: "http://localhost:8085/api/v1/guide/Gdelete?guideID="+ $('#gDID').val(),
        method: "DELETE",
        contentType: "application/json",
        headers: {
            "Authorization": "Bearer " + JSON.parse(localStorage.getItem("GToken"))

        },

        success: function (response) {
            alert("res"+response)
            if (response.statusCode === 200 || response.statusCode === 201 )
                alert("Delete successful");
            // You can handle the response from the server here if needed
        },
        error: function (xhr, textStatus, errorThrown) {
            alert("Error: " + xhr.responseText);

        }
    });
}



$(document).ready(function (){
    $('#gSearchButton').on('click', function () {
        const guideID = $('#ugId').val().trim();
        if (guideID) {
            fetchGuideByID(guideID);
        } else {
            alert("Please enter a vehicle ID to search ");
        }
    });
});

function fetchGuideByID(id) {
    $.ajax({
        url: 'http://localhost:8085/api/v1/guide/Gget?guideID=' + id,
        method: "GET",
        headers: {
            "Authorization": "Bearer " + JSON.parse(localStorage.getItem("GToken"))
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
    let guideData = res.data;
    if (guideData) {
        $("#ugName").val(guideData.guideName);
        $("#ugAddress").val(guideData.guideAddress);
        $("#uage").val(guideData.guideAge);

        // Set the selected option in the dropdown


        $("#ugender").val(guideData.guideGender);
        $("#uguideIMG").val(guideData.guidePICIMGLocation);
        $("#ugNICimg").val(guideData.guideNICIMGLocation);
        $("#ugudingIDimg").val(guideData.guideIDIMGLocation);
        $("#ugExperience").val(guideData.guideExperience);
        $("#umandayValue").val(guideData.manDayValue);
        $("#ugremark").val(guideData.remark);
    } else {
        alert("No data received");
    }
}
