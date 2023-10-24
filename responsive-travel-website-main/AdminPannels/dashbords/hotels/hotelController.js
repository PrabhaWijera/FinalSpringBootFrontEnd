// localStorage.setItem("HOTELToken",JSON.stringify("eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyUm9sZSI6IkFfSE9URUwiLCJzdWIiOiJob3RlbEFkbWluIiwiaWF0IjoxNjk4MDY4MjgzLCJleHAiOjQ4NTE2NjgyODN9.gvI62fX0TSVJyO6JDlISC2yFHoZdGLF6lC2RGyD2exw"));
//
//
// // Function to handle guide data save
// // Event handler for saving hotel data
// /*
// $("#hotelAddButton").click(function () {
//     saveHotel();
// });
// $("#hUpdateButton").click(function () {
//     updateHotel();
// });
// */
//
// // Function to save hotel data
// /*
// function saveHotel() {
//     const hotelData = {
//         HId: $("#hId").val(),
//         HName: $("#hName").val(),
//         Category: $("#hCategory").val(),
//         Address: $("#hAddress").val(),
//         Gender: $("#hmap").val(),
//         Email: $("#hemail").val(),
//         Contact: $("#hotelContact").val(),
//         Pet: $("#pet").val(),
//         fullBoarddoublehotelFee: $("#FullBoarddoublehotelFee").val(),
//         halfBoardDoublehotelFee: $("#HalfBoardDoublehotelFee").val(),
//         fullBoardTriplehotelFee: $("#FullBoardTriplehotelFee").val(),
//         halfBoardTriplehotelFee: $("#HalfBoardTriplehotelFee").val(),
//         cancellationCriteria: $("#CancellationCriteria").val(),
//         Remark: $("#remark").val(),
//     };
//
//     $.ajax({
//         url: "http://localhost:8080/save", // Replace with the correct save endpoint
//         method: "POST",
//         data: JSON.stringify(hotelData),
//         contentType: "application/json",
//         success: function (resp) {
//             console.log(resp);
//             alert("Hotel data saved successfully");
//             // You can call the uploadImage function here if needed
//         },
//         error: function (error) {
//             let parsedError = JSON.parse(error.responseText);
//             alert("Error: " + parsedError.message);
//         },
//     });
// }
//
// */
//
// $(document).ready(() => {
//
//
//     $(document).on("click", "#hotelAddButton", () => {
//
//
//
//
//
//
//
//
//
//
//         setTimeout(() => {
//
//
//             let hotel = {
//
//                 hotelID: $("#hId").val(),
//
//                 hotelName: $("#hName").val(),
//
//                 hotelCategory: $("#hCategory").val(),
//
//                 location: $("#hAddress").val(),
//
//                 locationCoordinate: $("#hcordinate").val(),
//
//                 hotelEmail: $("#hemail").val(),
//
//                 contactNumber01: $("#hotelContact1").val(),
//
//                 getContactNumber02: $("#hotelContact2").val(),
//
//
//
//                 petsStatus: $("#pet").val(),
//
//                 FullBoarddoublehotelFee: $("#FullBoarddoublehotelFee").val(),
//
//                 HalfBoardDoublehotelFee: $("#HalfBoardDoublehotelFee").val(),
//
//                 FullBoardTriplehotelFee: $("#FullBoardTriplehotelFee").val(),
//
//                 HalfBoardTriplehotelFee: $("#HalfBoardTriplehotelFee").val(),
//
//                 CancellationCriteria: $("#CancellationCriteria").val(),
//
//
//                 remark: $("#remark").val(),
//
//                 package_id: $("").val()
//
//
//
//
//
//
//
//             }
//
//             console.log(hotel)
//
//
//
//
//             $.ajax({
//
//                 url: "http://localhost:8080/api/v1/hotel_api/h_save", method: "POST", headers: {
//
//                     "content-type": "application/json",
//
//                     "Authorization": "Bearer " + JSON.parse(localStorage.getItem("HOTELToken"))
//
//                 }, data: JSON.stringify(hotel), success: (response) => {
//
//                     if (response.statusCode === 200 || response.statusCode === 201) {
//
//                         alert("Done!")
//
//                     } else {
//
//                         return swal("OOPS!", response.message, "error")
//
//
//
//
//                     }
//
//
//
//
//
//
//
//                 }, error: (xhr,textStatus,errorThrown) => {
//
//                     alert("Server threw an exception : "+xhr.responseJSON.message);
//
//                 },
//
//
//
//
//
//
//
//             })
//
//
//
//
//         }, 3000)
//
//
//
//
//
//
//
//     })
//
//
//
//
// });
//
//  //update new
// $(document).ready(() => {
//
//     $(document).on("click", "#hUpdateButton", () => {
//
//
//
//         setTimeout(() => {
//
//             let hotel = {
//
//
//                 hotelID: $("#huId").val(),
//
//                 hotelName: $("#huName").val(),
//
//                 hotelCategory: $("#huCategory").val(),
//
//                 location: $("#huAddress").val(),
//
//                 locationCoordinate: $("#uhcordinate").val(),
//
//                 hotelEmail: $("#huemail").val(),
//
//                 contactNumber01: $("#uhotelContact1").val(),
//
//                 getContactNumber02: $("#uhotelContact2").val(),
//
//
//
//                 petsStatus: $("#upet").val(),
//
//                 FullBoarddoublehotelFee: $("#uFullBoarddoublehotelFee").val(),
//
//                 HalfBoardDoublehotelFee: $("#uHalfBoardDoublehotelFee").val(),
//
//                 FullBoardTriplehotelFee: $("#uFullBoardTriplehotelFee").val(),
//
//                 HalfBoardTriplehotelFee: $("#uHalfBoardTriplehotelFee").val(),
//
//                 CancellationCriteria: $("#uCancellationCriteria").val(),
//
//
//                 remark: $("#uremark").val(),
//
//                 package_id: $("").val()
//
//
//
//             }
//
//
//
//
//             $.ajax({
//
//                 url: "http://localhost:8080/api/v1/hotel_api/h_put", method: "PUT", headers: {
//
//                     "content-type": "application/json",
//
//                     "Authorization": "Bearer " + JSON.parse(localStorage.getItem("HOTELToken"))
//
//
//
//
//                 }, data: JSON.stringify(hotel), success: (response) => {
//
//                     if (response.statusCode === 200 || response.statusCode === 201) {
//
//                         swal("Done!", response.message, "success")
//
//                         return clearFields();
//
//
//
//
//                     } else {
//
//                         return swal("OOPS!", response.message, "error")
//
//
//
//
//                     }
//
//
//
//
//
//
//
//                 }, error: (xhr,textStatus,errorThrown) => {
//
//                     swal("OOPS!", "Server threw an exception : "+xhr.responseJSON.message, "error");
//
//                 },
//
//
//
//
//
//
//
//             })
//
//
//
//
//         }, 3000)
//
//
//
//
//     })
//
// })
//
// //delete
//
//
// $(document).ready(() => {
//
//     $(document).on("click", "#deletehotel", () => {
// /*
//
//         if ($("#hotelId").val() === "") {
//
//             return swal("OOPS!", "Please enter a Vehicle name to delete!", "error");
//
//         }
// */
//
//
//
//
//         $.ajax({
//
//             url: "http://localhost:8080/api/v1/hotel_api/H_Delete?H_ID=" + $("#hId").val(), method: "DELETE", headers: {
//
//                 "Authorization": "Bearer " + JSON.parse(localStorage.getItem("HOTELToken"))
//
//             }, success: (res) => {
//
//                 console.log(res.data)
//
//                 if (res.statusCode === 200 || res.statusCode === 201) {
//
//
//
//
//                     return swal("Done!", res.message, "success");
//
//
//
//
//                 }
//
//                 swal("OOPS!", res.message, "error");
//
//
//
//
//             }, error: (xhr,textStatus,errorThrown) => {
//
//                 swal("OOPS!", "Server threw an exception : "+xhr.responseJSON.message, "error");
//
//             }
//
//
//
//
//
//
//
//         });
//
//
//
//
//
//
//
//     })
//
//
//
//
//
//
//
// });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// /*
// //update
// function updateHotel(){
//
//     const hotelData = {
//         HId: $("#huId").val(),
//         HName: $("#huName").val(),
//         Category: $("#huCategory").val(),
//         Address: $("#huAddress").val(),
//         Gender: $("#humap").val(),
//         Email: $("#huemail").val(),
//         Contact: $("#uhotelContact").val(),
//         Pet: $("#upet").val(),
//         fullBoarddoublehotelFee: $("#uFullBoarddoublehotelFee").val(),
//         halfBoardDoublehotelFee: $("#uHalfBoardDoublehotelFee").val(),
//         fullBoardTriplehotelFee: $("#uFullBoardTriplehotelFee").val(),
//         halfBoardTriplehotelFee: $("#uHalfBoardTriplehotelFee").val(),
//         cancellationCriteria: $("#uCancellationCriteria").val(),
//         Remark: $("#uremark").val(),
//     };
//
//     $.ajax({
//         url: "http://localhost:8080/save", // Replace with the correct save endpoint
//         method: "PUT",
//         data: JSON.stringify(hotelData),
//         contentType: "application/json",
//         success: function (resp) {
//             console.log(resp);
//             alert("Hotel data update successfully");
//             // You can call the uploadImage function here if needed
//         },
//         error: function (error) {
//             let parsedError = JSON.parse(error.responseText);
//             alert("Error: " + parsedError.message);
//         },
//     });
// }
//
// */
//
//
//
// // Event handler for deleting hotel data
