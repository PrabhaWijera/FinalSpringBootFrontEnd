


localStorage.setItem("PAyTOKEN",JSON.stringify("eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyUm9sZSI6IkFfUEFZTUVOVCIsInN1YiI6IlBheW1lbnRBZG1pbiIsImlhdCI6MTY5ODA2ODIwNCwiZXhwIjo0ODUxNjY4MjA0fQ._pKMG_OfKY2OJ7Cp4SOSTp7GLZ4smKGHiT2ckwJnr00"));


// When the element with id 'addpaymentButton' is clicked, call the 'registerPayment' function.
var payment;
var Paymentid;
$('#payAddButton').click(function() {
    registerPayment();
    alert("ok")
});

//add
function registerPayment() {
    let PaymentID = $("#payID").val();
    let DailyIncome = $("#DailyIncome").val();
    let AnnualIncome = $("#AnnualIncome").val();
    let MonthlyIncome = $("#MonthlyIncome").val();
    let WeeklyIncome = $("#WeeklyIncome").val();

    var newPayDetails = {
        PaymentID: PaymentID,
        DailyIncome: DailyIncome,
        AnnualIncome: AnnualIncome,
        MonthlyIncome: MonthlyIncome,
        WeeklyIncome: WeeklyIncome
    }

    // Make an AJAX POST request to the specified URL with the newPayDetails as JSON data.
    $.ajax({
        url: "http://localhost:8080",
        method: "POST",
        async: true,
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify(newPayDetails),
        dataType: "json",
        contentType: "application/json",
        success: (response) => {
            if (response.status !== false) {
                // Display a success message using the 'swal' function from SweetAlert.
                swal("Done! ✌️", "Item Saved Successfully!", "success");
            } else {
                // Display an error message using the 'swal' function with the response message.
                swal("Error! 🙆", "Something went wrong while saving the item! : " + response.responseMessage, "error");
            }
        },
        error: (e) => {
            // Display a generic error message using the 'swal' function.
            swal("Error!", "Something went wrong while saving the item!");
        }
    });
}

//update
$('#UpdateButton').click(function() {
    updatePayment();
});
 function updatePayment(){
     let PaymentID = $("#payID").val();
     let DailyIncome = $("#DailyIncome").val();
     let AnnualIncome = $("#AnnualIncome").val();
     let MonthlyIncome = $("#MonthlyIncome").val();
     let WeeklyIncome = $("#WeeklyIncome").val();

        var newpayDetails={
            PaymentID: PaymentID,
            DailyIncome: DailyIncome,
            AnnualIncome: AnnualIncome,
            MonthlyIncome: MonthlyIncome,
            WeeklyIncome: WeeklyIncome
        }
     $.ajax({
         url: "http://localhost:8080",
         async: true,
         method: "PUT",
         headers: {
             "Content-Type": "application/json"
         },
         data: JSON.stringify(newpayDetails),
         dataType: "json",
         contentType: "application/json",
         success: (response) => {
             if (response.status !== false) {
                 // Display a success message using the 'swal' function from SweetAlert.
                 swal("Done! ✌️", "Item Saved Successfully!", "success"+newpayDetails);
             } else {
                 // Display an error message using the 'swal' function with the response message.
                 swal("Error! 🙆", "Something went wrong while saving the item! : " + response.status, "error");
             }
         },
         error: (e) => {
             // Display a generic error message using the 'swal' function.
             swal("Error!", "Something went wrong while saving the item!");
         }
     });
 }
 //search