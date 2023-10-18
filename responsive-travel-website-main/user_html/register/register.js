$(document).ready(function () {
    $("#submit").on("click", function () {
        const U_name = $("#name").val();
        const U_contactNumber = $("#contactNumber").val();
        const U_nic = $("#nic").val();
        const U_password = $("#password").val();
        const U_gender = $("#gender").val();
        let  FileName = $("#userNic_Photo")[0].files[0].name;
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
            FileName +
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

$("#submit").onclick(function (){

    let  FileName = $("#userNic_Photo")[0].files[0].name;

    const name = $("#name").val();
    const contactNumber = $("#contactNumber").val();
    const nic = $("#nic").val();
    const password = $("#password").val();
    const gender = $("#gender").val();
  /*  const file = $("input[name='file']").val();*/
    const age = $("#age").val();
    const email = $("#email").val();

    var detailsSave= {
        FileName:FileName,
        name:name,
        contactNumber:contactNumber,
        nic:nic,
        password:password,
        gender:gender,
        age:age,
        email:email
    }

    $.ajax({
        url: "http://localhost:8080/" ,
        method :"POST",
        async: true,
        data : JSON.stringify(detailsSave),
        contentType:"application/json",
        success: function (resp) {
            console.log(resp);
            alert(resp.message);
            loadImage();
        },
        error: function(error) {
            let pas = JSON.parse(error.responseText);
            alert(pas.message);
        }
    });
});

function loadImage(){
    var data = new FormData();

    let file = $("#userNic_Photo")[0].files[0];
    let nicFileName = $("#userNic_Photo")[0].files[0].name;
    data.append("myFile", file, nicFileName);

    $.ajax({
        url: "http://localhost:8080/",
        method: 'POST',
        async: true,
        contentType: false,
        processData: false,
        data: data,
        success: function (resp) {
            alert("Successfully Uploaded");

        },
        error: function (err) {
            console.log(err);
        }
    });
}