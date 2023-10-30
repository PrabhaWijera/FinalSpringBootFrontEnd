

$("#loginButton").on("click",()=>{
    if($("#username").val() === "" || $("#password").val() === ""){
        return swal("OOPS!", "Please fill all the fields!", "error");
    }


    $.ajax({
        url : "http://localhost:8080/api/v1/userApi/getUserByUserName?username="+$("#username").val()+"&password="+$("#password").val(),
        method : "GET",
        headers : {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyUm9sZSI6InVzZXIiLCJzdWIiOiJkYW1pYW5wZWlyaXMiLCJpYXQiOjE2OTg2NDkzMDYsImV4cCI6NDg1MjI0OTMwNn0.L9tGQW6If2THAZhyhNlZHcUXY0QNDoDbO5Rlvhch8HM"


        },
        success : (res)=>{
            console.log(res)


        },
        error : (er)=>{
            console.log("An error occurred !")


        }



    })



});