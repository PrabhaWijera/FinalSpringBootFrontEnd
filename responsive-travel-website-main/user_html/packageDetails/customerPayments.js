localStorage.setItem("PToken",JSON.stringify("eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyUm9sZSI6IkFfUEFZTUVOVCIsInN1YiI6InBheTIwMDEiLCJpYXQiOjE2OTgyMTc0NjcsImV4cCI6NDg1MTgxNzQ2N30.d91AdCqnITrzGbsMPvQNr0vYLDtmBocuvcBnep9hC-A"));


// Attach the click event handler to the "payAddButton"
$("#conformedPaymentBTN").on("click", function() {
    OnSavePayment();
});

/*


 /*

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
                        swal("res" + response);
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


 */

function OnSavePayment() {
    // Create an array to store the image data
    const imageArray = [];

    // Define the file input IDs
    const fileInputIds = ["#PayIMG"];

    // Define a function to handle the success of saving an image
    function handleImageSave(data) {
        imageArray.push(data);

        // If all three images have been processed, proceed with saving the data
        if (imageArray.length === fileInputIds.length) {

            const payId="0111";
            // Assuming the first image is for guideID
            const OwnerFullName = $("#OwnerFullName").val();
            const OwnerEmail = $("#OwnerEmail").val();
            const OwnerCardNumber = $("#OwnerCardNumber").val();
            const amountofPackage = $("#amountofPackage").val();
            const date = $("#paymentDate").val();

            const iMGGID = imageArray[0];


            // Create an object to store the data
            const data = {

                payID: payId,
                OwnerFullName: OwnerFullName,
                OwnerEmail: OwnerEmail,
                OwnerCardNumber: OwnerCardNumber,
                paymentAmount: amountofPackage,
                paymentDate: date,
                paymentImageLocation: iMGGID,

            };

            // Retrieve the JWT token from localStorage
            let token = localStorage.getItem("PToken");

            // Check if the token is valid
            if (!token) {
                swal("Token not found. Please log in.");
                return;
            }

            // Make the AJAX request to save the data
            setTimeout(() => {
                $.ajax({
                    url: "http://localhost:8086/api/v1/Payment/PSave",
                    method: "POST",
                    contentType: "application/json",
                    data: JSON.stringify(data),
                    headers: {
                        "Authorization": "Bearer " + JSON.parse(localStorage.getItem("PToken"))
                    },
                    success: function (response) {
                        swal("res" + response);
                        if (response.statusCode === 200 || response.statusCode === 201) {
                            swal("Save successful");
                            sendEmail();
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

function sendEmail() {


    // Assuming the first image is for guideID
    const OwnerFullName = $("#OwnerFullName").val();
    const OwnerEmail = $("#OwnerEmail").val();
    const OwnerCardNumber = $("#OwnerCardNumber").val();
    const amountofPackage = $("#amountofPackage").val();
    const date = $("#paymentDate").val();




    // Create an object to store the data
    const data = {

        OwnerFullName: OwnerFullName,
        OwnerEmail: OwnerEmail,
        OwnerCardNumber: OwnerCardNumber,
        paymentAmount: amountofPackage,
        paymentDate: date,


    };

        $.ajax({
            url: 'http://localhost:8093/api/v1/emails/sendPackageDetails',
            type: 'POST',
            headers : {
                Authorization: "Bearer " + JSON.parse(localStorage.getItem("userAuthToken"))
            },
            success: function (data) {
                swal("SUCCESSFULLY!!! Conformed Payment");
            },
            error: function (xhr, textStatus, errorThrown) {
                swal("OOPS!", "Server threw an exception : " + xhr.responseJSON.message, "error");
            }
        });

}
