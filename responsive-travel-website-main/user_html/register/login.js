function loginUser(){

    /*login*/
/*    const submitBTN=document.getElementById("submit");*/
    const passwordTxt=document.getElementById("password").value;
    const emailTxt=document.getElementById("email").value;



    /*register*/
    const U_email = $("#email").val();
    const U_password = $("#password").val();


if (emailTxt === U_email && passwordTxt === U_password){
    window.location.href='regular_p.html';
}else {
    alert("Login failed. Please check your credentials.");
}
}
alert("oioio");
