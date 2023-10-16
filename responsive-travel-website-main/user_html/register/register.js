$(document).ready(function () {
    $("#submit").on("click", function () {
        const U_name = $("#name").val();
        const U_contactNumber = $("#contactNumber").val();
        const U_nic = $("#nic").val();
        const U_password = $("#password").val();
        const U_gender = $("#gender").val();
        const U_file = $("input[name='file']").val();
        const U_age = $("#age").val();
        const U_email = $("#email").val();

        localStorage.setItem('email', U_email);
        localStorage.setItem('password', U_password);

        const textsave =
            U_name +
            U_contactNumber +
            U_nic +
            U_password +
            U_gender +
            U_file +
            U_age +
            U_email;

        if (typeof Storage !== "undefined") {
            localStorage.setItem("SaveUSER_de", textsave);
            alert("Text saved in local storage");
        } else {
            alert("Sorry, your browser does not support local storage.");
        }
    });
});