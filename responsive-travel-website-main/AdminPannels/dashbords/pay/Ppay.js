localStorage.setItem("PToken",JSON.stringify("eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyUm9sZSI6IkFfUEFZTUVOVCIsInN1YiI6IjIwMDEiLCJpYXQiOjE2OTgxNDUyODcsImV4cCI6NDg1MTc0NTI4N30.YgMtmw0XOvbOjmSr_OmruF6FPXGUC16D5C_1EVCQC3M"));
// Check if the document is ready
$(document).ready(function() {
    // Attach the click event handler to the "payAddButton"
    $("#payAddButton").on("click", function() {
        OnSave();
    });
});

function OnSave() {
    // Retrieve form data
    var payId = $("#payID").val();
    var dailyIncome = $("#DailyIncome").val();
    var annualIncome = $("#AnnualIncome").val();
    var monthlyIncome = $("#MonthlyIncome").val();
    var weeklyIncome = $("#WeeklyIncome").val();

    // Create an object to store the data
    const data = {
        payId: payId,
        dailyIncome: dailyIncome,
        annualIncome: annualIncome,
        monthlyIncome: monthlyIncome,
        weeklyIncome: weeklyIncome
    };

    // Retrieve the JWT token from localStorage
    var token = localStorage.getItem("PToken");
    console.log(token)
    // Check if the token is valid
    if (!token) {
        alert("Token not found. Please log in.");
        return;
    }

    // Make the AJAX request to save the payment data
    $.ajax({
        url: "http://localhost:8086/api/v1/Payment/PSave"+ token,
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(data),
        headers: {
            "Authorization": "Bearer " + JSON.parse(localStorage.getItem("PToken"))

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
