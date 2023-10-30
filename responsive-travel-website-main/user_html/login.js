/*

$("#sr").on("click",()=>{



    $.ajax({
        url : "http://localhost:8080/api/v1/userApi/getUserByUserName?username="+$("#username").val()+"&password="+$("#password").val(),
        method : "GET",
        headers : {
            Authorization: "Bearer " + JSON.parse(localStorage.getItem("userAuthToken"))


        },
        success : (res)=>{
            console.log(res)
            swal("Success"+res.data.role);
            swal("Success"+res.data.isAuthenticated);

            if (res.statusCode === 200 || res.statusCode === 0|| res.statusCode === 500){
                let package = JSON.parse(localStorage.getItem("packageName"))

                switch (package) {
                    case "regular":
                        window.location.href = "regular_p.html";
                        break;
                    case "mid":
                        window.location.href = 'Mid-level_package.html';
                        break;
                    case "luxury":
                        window.location.href = 'Luxury.html';
                        break;
                    case "superLux":
                        window.location.href = 'Super-Luxury-Package.html';
                        break;

                }
            } else {
                swal("Bad Credentials!!!!");
            }
        },
        error : (er)=>{
            console.log("An error occurred !"+er.responseJSON.message)
            alert("success");

        }



    })

})
*/
