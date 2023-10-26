$("#submit").click(function(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    CustomerRegister();
});

function CustomerRegister() {
    // Extract the form data
    let data = {
        userId: $("#userid").val(),
        name: $("#userName").val(),
        userName: $("#Name").val(),
        userNIC: $("#usernic").val(),
        userPassword: $("#userpassword").val(),
        gender: $("#gender").val(),
        userAddress: $("#address").val(),
        userAge: $("#age").val(),
        userEmail: $("#email").val(),
        userPhone: $("#contactNumber").val(),
        userImageLocation: $("#userNic_Photo").val(),
        remarks: $("#remark").val(),
        isAuthenticated: false
    };

    // Make the AJAX request to save the customer data
    $.ajax({
        url: "http://localhost:8080/api/v1/auth/register", // Change the URL to the registration endpoint
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function(response) {
            if (response && (response.statusCode === 200 || response.statusCode === 201)) {
                swal("Save successful");
                // You can handle the response from the server here if needed
            } else {
                swal("Save failed");
            }
        },
        error: function(xhr, textStatus, errorThrown) {
            swal("Error: " + xhr.responseText);
        }
    });

}