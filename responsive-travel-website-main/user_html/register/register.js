
$("#submit").onclick(function (){
   CustomerRegister();
});

function uploadImage(file, successCallback, errorCallback) {
    const data = new FormData();
    data.append("myFile", file);
    $.ajax({
        url: "http://localhost:8080/api/v1/auth/register", // Replace with the correct upload endpoint
        method: "POST",
        async: true,
        contentType: false,
        processData: false,
        data: data,
        success: successCallback,
        error: errorCallback,
    });
}



function CustomerRegister(){
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
    });
}


