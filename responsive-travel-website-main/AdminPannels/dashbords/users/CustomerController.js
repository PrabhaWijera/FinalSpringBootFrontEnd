import { Customer } from "./Customer.js";
import { AlertController } from "../AlertController.js";
import { LocalStorageDB } from "../LocalStorageDB.js";

// Define variables
let cusList = [];

// Use event delegation to handle button clicks
$(document).on("click", "#cusAddButton", function () {
    saveCustomer();
});

$(document).on("click", "#cusUpdateButton", function () {
    updateCustomer();
});

$(document).on("click", "#getAllCustomersButton", function () {
    getAllCustomers();
});

$(document).on("click", "#Cusdelete", function () {
    deleteCustomer();
});

$(document).on("click", "#csButton", function () {
    searchCustomer();
});

// Function to handle image upload
function uploadImage(file, successCallback, errorCallback) {
    const data = new FormData();
    data.append("myFile", file);

    $.ajax({
        url: "http://localhost:8080/upload", // Replace with the correct upload endpoint
        method: "POST",
        async: true,
        contentType: false,
        processData: false,
        data: data,
        success: successCallback,
        error: errorCallback,
    });
}

// Function to handle customer data save
function saveCustomer() {
    const UserNic_Photo = $("#userNic_Photo")[0].files[0];

    // Ensure the user selected a file
    if (!UserNic_Photo) {
        alert("Please select a NIC photo.");
        return;
    }

    const cusData = {
        UserNic_Photo: UserNic_Photo.name,
        uId: $("#userid").val(),
        Name: $("#userName").val(),
        nic: $("#usernic").val(),
        password: $("#userpassword").val(),
        Gender: $("#gender").val(),
        Age: $("#age").val(),
        Email: $("#email").val(),
        ContactNumber: $("#contactNumber").val(),
        Remark: $("#remark").val(),
    };
    let customerJson = JSON.stringify(cusData);

    $.ajax({
        url: "http://localhost:8080/save", // Replace with the correct save endpoint
        method: "POST",
        async: true,
        data: customerJson,
        dataType: "json",
        contentType: "application/json",
        success: function (resp) {
            console.log(resp);
            alert(resp.message);
            getAllCustomers();
            uploadImage(UserNic_Photo, function () {
                alert("Successfully Uploaded");
                swal("Done!", "Customer saved successfully");
            }, function (err) {
                console.error(err);
                swal("Error", "An error occurred while saving customer");
            });
        },
        error: function (error) {
            let parsedError = JSON.parse(error.responseText);
            alert(parsedError.message);
        },
    });
}

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
