swal("Welcome To Payment 🤑");
localStorage.setItem("PToken",JSON.stringify("eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyUm9sZSI6IkFfUEFZTUVOVCIsInN1YiI6InBheTIwMDEiLCJpYXQiOjE2OTgyMTc0NjcsImV4cCI6NDg1MTgxNzQ2N30.d91AdCqnITrzGbsMPvQNr0vYLDtmBocuvcBnep9hC-A"));

// Check if the document is ready
$(document).ready(function() {
    // Attach the click event handler to the "payAddButton"
    $("#getAllpayButton").on("click", function() {
        OnGetAllPayments();
    });
});

function OnGetAllPayments() {
    $.ajax({
        url: "http://localhost:8086/api/v1/Payment/getAllPayments",
        method: "GET",
        headers: {
            "Authorization": "Bearer " + JSON.parse(localStorage.getItem("PToken"))
        },
        success: (res) => {
            if (!res.data) {
                // Handle the case when no data is found
                swal("OOPS!", "No data found!", "error");
            } else {
                console.log("Response data:", res.data);

                const tableBody = $("#payTable");
                tableBody.empty(); // Clear the existing table rows

                res.data.forEach((pay) => {
                    let row = "<tr>";
                    row += "<td>" + pay.payID + "</td>";
                    row += "<td>" + pay.userID + "</td>";
                    row += "<td>" + pay.packageDetailsID + "</td>";
                    row += "<td>" + pay.paymentDate + "</td>";
                    row += "<td>" + pay.paymentAmount + "</td>";
                    row += "<td><img src='" + pay.paymentImageLocation + "' alt='pay Image' height='100' width='100'></td>";
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
