import { Customer } from "./Customer.js";
import { AlertController } from "../AlertController.js";
import { LocalStorageDB } from "../LocalStorageDB.js";

// Event handling using jQuery
$("#cusAddButton").on("click", function() {
    saveCustomer();
});

// Function to save a customer
function saveCustomer() {
    const UserNic_Photo = $("#userNic_Photo")[0].files[0];

    if (!UserNic_Photo) {
        alert("Please select a NIC photo.");
        return;
    }

    const uId = $("#userid").val();
    const Name = $("#userName").val();
    const nic = $("#usernic").val();
    const password = $("#userpassword").val();
    const Gender = $("#gender").val();
    const Age = $("#age").val();
    const Email = $("#email").val();
    const ContactNumber = $("#contactNumber").val();
    const Remark = $("#remark").val();

    const jwtToken = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJTaGFuaSIsImlhdCI6MTY5NzcxNTA5NywiZXhwIjo0ODUxMzE1MDk3fQ.DH8Jv2vpAPge6l2HLh7d3JrXv1tvSVcuWuuubUj8ru8';

    // Check if the JWT token is present in local storage
    const storedToken = localStorage.getItem('JWT');

    if (!storedToken) {
        alert("JWT token not found. Please log in.");
        return;
    }

    // Continue with your code to make the AJAX request with the JWT token
    $.ajax({
        url: "http://localhost:8080/api/v1/auth/register", // Replace with the correct save endpoint
        method: "POST",
        async: true,
        data: JSON.stringify({
            user_id: uId,
            userName: Name,
            user_nic: nic,
            user_password: password,
            gender: Gender,
            age: Age,
            email: Email,
            contactNumber: ContactNumber,
            remark: Remark,
            userNic_Photo: UserNic_Photo.name
        }),
        dataType: "json",
        contentType: "application/json",
        headers: {
            Authorization: "Bearer " + jwtToken, // Include the JWT token in the header
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        success: function(resp) {
            try {
                console.log(resp);
                alert(resp.message);
                uploadImage(UserNic_Photo, function() {
                    alert("Successfully Uploaded");
                    swal("Done!", "Customer saved successfully");
                }, function(err) {
                    console.error(err);
                    swal("Error", "An error occurred while saving the customer");
                });
            } catch (error) {
                console.error("Error parsing JSON response:", error);
            }
        }
    });
}


/*

// Function to update customer data
function updateCustomer() {
    const UserNic_Photo = $("#uuserNic_Photo")[0].files[0];

    const cusData = {
        UserNic_Photo: UserNic_Photo ? UserNic_Photo.name : null,
        uId: $("#uuserid").val(),
        Name: $("#uuserName").val(),
        nic: $("#uusernic").val(),
        password: $("#uuserpassword").val(),
        Gender: $("#ugender").val(),
        Age: $("#uage").val(),
        Email: $("#uemail").val(),
        ContactNumber: $("#ucontactNumber").val(),
        Remark: $("#uremark").val(),
    };

    $.ajax({
        url: "http://localhost:8080/update", // Replace with the correct update endpoint
        method: "PUT",
        async: true,
        data: JSON.stringify(cusData),
        contentType: "application/json",
        success: function (resp) {
            console.log(resp);
            alert(resp.message);
            if (UserNic_Photo) {
                uploadImage(UserNic_Photo, function () {
                    alert("Successfully Uploaded");
                }, function (err) {
                    console.error(err);
                });
            }
        },
        error: function (error) {
            let parsedError = JSON.parse(error.responseText);
            alert(parsedError.message);
        },
    });
}

// Function to delete a customer
function deleteCustomer() {
    const email = $("#email").val();
    if (!email) {
        swal("Error!", "Search for a customer first!", "error");
        return;
    }

    $.ajax({
        url: `http://localhost:8080/customer/${email}`, // Replace with the correct delete endpoint
        method: "DELETE",
        async: true,
        dataType: "json",
        contentType: "application/json",
        success: (response) => {
            if (response.status !== false) {
                swal("Done!", "Customer successfully deleted!", "success");
                getAllCustomers();
            } else {
                swal("Error!", `Something went wrong while deleting customer: ${response}`, "error");
            }
        },
        error: (error) => {
            swal("Error!", "Something went wrong when performing the request to the server!", "error");
        },
    });
}

// Function to search for a customer
function searchCustomer() {
    const email = $("#uemail").val();
    if (!email) {
        swal("Error", "Customer email cannot be empty");
        return;
    }

    $.ajax({
        url: `http://localhost:8080/customer/${email}`, // Replace with the correct search endpoint
        method: "GET",
        async: true,
        dataType: "json",
        contentType: "application/json",
        success: (response) => {
            if (response.status !== false) {
                $("#uuserid").attr("disabled", "disabled");
                $("#uuserName").val(response.Name);
                $("#uusernic").val(response.nic);
                $("#uuserpassword").val(response.password);
                $("#ugender").val(response.Gender);
                $("#uage").val(response.Age);
                $("#ucontactNumber").val(response.ContactNumber);
                $("#uremark").val(response.Remark);
            } else {
                swal("Customer not found", response);
            }
        },
        error: (res) => {
            swal("Error");
        },
    });
}

// Function to get all customers
function getAllCustomers() {
    $.ajax({
        url: "http://localhost:8080/customers", // Replace with the correct endpoint
        method: "GET",
        async: true,
        dataType: "json",
        contentType: "application/json",
        success: (response) => {
            if (response.status !== false) {
                cusList = response;

                $("#customerTable").empty(); // Clear the table before populating

                response.map((customer) => {
                    let row = "<tr>" +
                        "<td>" + customer.user_id + "</td>" +
                        "<td>" + customer.userName + "</td>" +
                        "<td>" + customer.user_nic + "</td>" +
                        "<td>" + customer.user_password + "</td>" +
                        "<td>" + customer.gender + "</td>" +
                        "<td>" + customer.age + "</td>" +
                        "<td>" + customer.email + "</td>" +
                        "<td>" + customer.contactNumber + "</td>" +
                        "<td>" + customer.remark + "</td>" +
                        "<td>" + customer.userNic_Photo + "</td>" +
                        +"</tr>";

                    $("#customerTable").append(row);
                });
            } else {
                swal("Error!", `Something went wrong while fetching all items: ${response.responseMessage}`, "error");
            }
        },
        error: (e) => {
            swal("Error!", `An error occurred while requesting to the server: ${e}`, "error");
        },
    });
}
*/
