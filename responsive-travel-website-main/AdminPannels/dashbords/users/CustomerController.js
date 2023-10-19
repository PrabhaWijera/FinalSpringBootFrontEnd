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
                    getAllCustomers();
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


 //update customer

// Event handling using jQuery
$("#cusUpdateButton").on("click", function() {
    updateCustomer();
});

// Function to save a customer
function updateCustomer() {
    const UserNic_Photo = $("#uuserNic_Photo")[0].files[0];

    if (!UserNic_Photo) {
        alert("Please select a NIC photo.");
        return;
    }

    const uId = $("#uuserid").val();
    const Name = $("#uuserName").val();
    const nic = $("#uusernic").val();
    const password = $("#uuserpassword").val();
    const Gender = $("#ugender").val();
    const Age = $("#uage").val();
    const Email = $("#uemail").val();
    const ContactNumber = $("#ucontactNumber").val();
    const Remark = $("#uremark").val();

    const jwtToken = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJTaGFuaSIsImlhdCI6MTY5NzcxNTA5NywiZXhwIjo0ODUxMzE1MDk3fQ.DH8Jv2vpAPge6l2HLh7d3JrXv1tvSVcuWuuubUj8ru8';

    // Check if the JWT token is present in local storage
    const storedToken = localStorage.getItem('JWT');

    if (!storedToken) {
        alert("JWT token not found. Please log in.");
        return;
    }

    // Continue with your code to make the AJAX request with the JWT token
    $.ajax({
        url: "http://localhost:8080/api/v1/user/update", // Replace with the correct save endpoint
        method: "PUT",
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
                    getAllCustomers();
                    swal("Done!", "Customer Update successfully");
                }, function(err) {
                    console.error(err);
                    swal("Error", "An error occurred while Update the customer");
                });
            } catch (error) {
                console.error("Error parsing JSON response:", error);
            }
        }
    });
}

// delete customer
$("#Cusdelete").on("click", function() {
    deleteCustomer();
});
function deleteCustomer() {
    // Get the user's email from the input field
    const uEmail = $("#gemail").val();

    if (!uEmail) {
        alert("Please enter a valid email.");
        return;
    }

    // Retrieve the JWT token from local storage
    const jwtToken = localStorage.getItem('JWT');

    if (!jwtToken) {
        alert("JWT token not found. Please log in.");
        return;
    }

    // Make the AJAX request
    $.ajax({
        method: "DELETE",
        url: `http://localhost:8080/api/v1/user/delete/`+uEmail,
        async:true,
        headers: {
            Authorization: `Bearer ${jwtToken}`,
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        success:function (data){
            alert("User successfully deleted");
            getAllCustomers();
        },
        error:function (xhr){
            alert("User deletion failed");
        }
    });

}
//get all method
getAllCustomers();
$("#getAllCustomersButton").on("click", function() {
    getAllCustomers();
});
function getAllCustomers() {
    // Get the user's email from the input field
    const uEmail = $("#gemail").val();

    if (!uEmail) {
        alert("Please enter a valid email.");
        return;
    }

    // Retrieve the JWT token from local storage
    const jwtToken = localStorage.getItem('JWT');

    if (!jwtToken) {
        alert("JWT token not found. Please log in.");
        return;
    }

    // Make the AJAX request
    $.ajax({
        method: "GET",
        url: `http://localhost:8080/api/v1/user/delete/`+uEmail,
        async:true,
        headers: {
            Authorization: `Bearer ${jwtToken}`,
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        success:function (data){
            if (data.code === ""){
                $('#customerTableBody').empty();
                for (let cus of data.content){
                    let cusID=cus.user_id
                    let cusnNme=cus.userName

                    let cusnic=cus.user_nic
                    let cuspass=cus.user_password
                    let cusGender=cus.gender
                    let cusAge=cus.age
                    let cusEmail=cus.email
                    let cusNumber=cus.contactNumber
                    let cusremark=cus.remark
                    let cusImg=cus.userNic_Photo

                    var row=`<tr><td>${cusID}</td><td>${cusnNme}</td><td>${cusnic}</td><td>${cuspass}</td><td>${cusGender}</td><td>${cusAge}</td><td>${cusEmail}</td><td>${cusNumber}</td><td>${cusremark}</td><td>${cusImg}</td></tr>`;
                    $('#customerTableBody').append(row);
                }
            }
        },
        error:function (xhr){
            alert("User Get all  failed");
        }
    });

}
//fil the text field
$(document).ready(function (){
    $(document).on('click','#customerTableBody tr',function (){
       var col1 = $(this).find('td:eq(0)').text();
       var col2 = $(this).find('td:eq(1)').text();
       var col3 = $(this).find('td:eq(2)').text();
       var col4 = $(this).find('td:eq(3)').text();
       var col5 = $(this).find('td:eq(4)').text();
       var col6 = $(this).find('td:eq(5)').text();
       var col7 = $(this).find('td:eq(6)').text();
       var col8 = $(this).find('td:eq(7)').text();
       var col9 = $(this).find('td:eq(8)').text();
       var col10 = $(this).find('td:eq(9)').text();

        const UserNic_Photo = $("#uuserNic_Photo")[0].files[0];

        if (!UserNic_Photo) {
            alert("Please select a NIC photo.");
            return;
        }


       $('#uuserid').val(col1);
       $('#uuserName').val(col2);
       $('#uusernic').val(col3);
       $('#uuserpassword').val(col4);
       $('#ugender').val(col5);
       $('#uage').val(col6);
       $('#uemail').val(col7);
       $('#ucontactNumber').val(col8);
       $('#uremark').val(col9);
        $('#uuserNic_Photo').val(col10);

    });
});