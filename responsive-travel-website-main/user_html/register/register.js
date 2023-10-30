$(document).ready(function () {
    $("#submit").click(function (event) {
        event.preventDefault();
        CustomerRegister();
    });


    function CustomerRegister() {
        alert("gya");
        const imageArray = [];
        const fileInputIds = ["#userNic_Photo"];

        function handleImageSave(data) {
            imageArray.push(data);

            if (imageArray.length === fileInputIds.length) {
                const roly="user";

                const user_name = $("#name").val();
                const phoneNumber = $("#contactNumber").val();
                const n_name = $("#nname").val();
                const nic_y = $("#nic").val();
                const pas_word = $("#password").val();
                const Ge_ender = $("#gender").val();
                const A_ge = $("#age").val();
                const A_dress = $("#address").val();
                const E_mail = $("#email").val();
                const IMG_user = imageArray[0];

                const data = {
                    userRole:roly,

                    name: n_name,
                    userName: user_name,
                    userPassword: pas_word,
                    userNIC: nic_y,
                    userAge: A_ge,
                    gender: Ge_ender,
                    userEmail: E_mail,
                    userPhone: phoneNumber,
                    userAddress: A_dress,
                    userImageLocation: IMG_user,
                };

                $.ajax({
                    url: "http://localhost:8080/api/v1/auth/getAuth",
                    method: "POST",
                    contentType: "application/json", // Use contentType to set the content type
                    data: JSON.stringify(data),
                    success: function (response) {
                        console.log(response);

                        if (response.statusCode === 200 || response.statusCode === 201 || response.statusCode === 500 || response.statusCode === 500 || response.statusCode === 0) {
                            swal("Save successful");
                            localStorage.setItem("userAuthToken", JSON.stringify(response.data));

                        }
                    },
                    error: function(xhr, textStatus, errorThrown) {
                        swal("Error: " + xhr.responseText);
                    }
                });
            }
        }

        for (let i = 0; i < fileInputIds.length; i++) {
            const delay = 2000 * i;
            setTimeout(() => {
                saveImage(fileInputIds[i], handleImageSave);
            }, delay);
        }
    }

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
                success: function(data) {
                    successCallback(data);
                },
                error: function(xhr, textStatus, errorThrown) {
                    swal("OOPS!", "Server threw an exception: " + xhr.responseJSON.message, "error");
                }
            });
        } else {
            successCallback(""); // Call the success callback with an empty string if no file selected
        }
    }
});