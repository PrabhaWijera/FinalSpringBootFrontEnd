//Set Current Date

var now = new Date();
var day = ("0" + now.getDate()).slice(-2);
var month = ("0" + (now.getMonth() + 1)).slice(-2);
var today = now.getFullYear() + "-" + (month) + "-" + (day);
var tomorrow = now.getFullYear() + "-" + (month) + "-" + ("0" + ((+day) + (+1))).slice(-2);

// Navigation
// loadTodayAvailableCars();

//Login Page
$("#loginFormBtn").click(function () {
    listNo = 0;

    $("#landingPage").css('display', 'none')
    $("#landingNavbar").css('display', 'none')

    $("#loginPage").css('display', 'block')
})


//----------------------user Login
$("#loginUserBtn").click(function () {

    let userDTO = {
        user_name: $("#login-page-user-name").val(),
        password: $("#login-page-password").val()
    }

    $.ajax({
        url: "http://localhost:8080/02_Back_End_war_exploded/login",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(userDTO),
        success: function (res) {
            if (res.code === 200) {
                if (res.message === ("Customer")) {
                    customerLogin(res.data)
                } else if (res.message === ("Driver")) {
                    driverLogin(res.data)
                } else if (res.message === ("Admin")) {
                    adminLogin(res.data)
                } else {
                    alert(res.message)
                }
            }
            $("#login-page-user-name").val("")
            $("#login-page-password").val("")
        },
        error: function (ob) {
            console.log(ob.responseJSON.message);
        }
    });
})

//---------Customer Login
function customerLogin(data) {
    customer = data
    $("#loginPage").css("display", "none")
    $("#customer").css("display", "block")
    $("#customerNavbar").css("display", "block")

    $("#customer-profile-nic").val(data.nic)
    $("#customer-profile-name").val(data.name)
    $("#customer-profile-email").val(data.email)
    $("#customer-profile-address").val(data.address)
    $("#customer-profile-mobile").val(data.mobile)

    getAvailableCar();
    clearAllReservationDetails()

}

//---------Driver Login
function driverLogin(data) {
    $("#loginPage").css("display", "none")
    $("#driverNavBar").css("display", "block")
    $("#driver").css("display", "block")

    loadDriverSchedule(data);

}

//---------admin Login
function adminLogin(data) {
    $("#loginPage").css("display", "none")
    $("#admin").css("display", "block")

    $("#adminDailySummary").css("display", "block")
    $("#adminCars").css("display", "none")
    $("#adminReservation").css("display", "none")
    $("#adminDrivers").css("display", "none")
    $("#adminCustomer").css("display", "none")
    $("#adminPayments").css("display", "none")

    loadDailySummary();

}


//Register Page
$(".getStartBtn").click(function () {
    $("#landingPage").css('display', 'none')
    $("#landingNavbar").css('display', 'none')
    $("#loginPage").css('display', 'none')

    $("#registerForm").css('display', 'block')
})

// Back to home in register page and login form
$(".backToHomeBtn").click(function () {
    $("#landingPage").css('display', 'block')
    $("#landingNavbar").css('display', 'block')

    $("#loginPage").css('display', 'none')
    $("#registerForm").css('display', 'none')
})

//----------------customer navigation
//---Home
$("#customerHomeBtn").click(function () {
    $("#customerReservation").css("display", "none")
    $("#customerProfile").css("display", "none")

    $("#customerHome").css("display", "block")
})

//---Reservations
$("#customerReservationBtn").click(function () {
    $("#customerProfile").css("display", "none")
    $("#customerHome").css("display", "none")
    $("#customerReservation").css("display", "block")

    loadUpcomingReservation();
})

//---Account
$("#customerAccountBtn").click(function () {
    $("#customerHome").css("display", "none")
    $("#customerReservation").css("display", "none")

    $("#customerProfile").css("display", "block")
})

//---------------------User Logout
$("#logOutBtn").click(function () {
    $("#customer").css("display", "none")
    $("#customerNavbar").css("display", "none")

    $("#driverNavBar").css("display", "none")
    $("#driver").css("display", "none")

    $("#admin").css("display", "none")

    $("#landingPage").css("display", "block")
    $("#landingNavbar").css("display", "block")

    loadTodayAvailableCars()
    listNo = 0;
})

//---------------customer Profile navigations------------------

$("#customerInformationBtn").click(function () {
    $("#customerProfileChangePassword").css("display", "none")

    $("#customerProfileUpdateDetail").css("display", "block")
})

$("#customerChangePasswordBtn").click(function () {
    $("#customerProfileChangePassword").css("display", "block")

    $("#customerProfileUpdateDetail").css("display", "none")
})


// /---------------admin profile navigations------------------------------------

//---Account
$("#myAccount-btn").click(function () {
    $("#customerHome").css("display", "none")
    $("#customerReservation").css("display", "none")

    $("#customerProfile").css("display", "block")
})

//--Dashboard
$("#adminDashboardBtn").click(function () {

    $("#adminDailySummary").css("display", "inline-flex")

    $("#adminReservation").css("display", "none")
    $("#adminCars").css("display", "none")
    $("#adminDrivers").css("display", "none")
    $("#adminCustomer").css("display", "none")
    $("#adminPayments").css("display", "none")

    loadDailySummary();
})

//--Reservation
$("#adminReservationBtn").click(function () {
    $("#adminReservation").css("display", "inline-flex")

    $("#adminDailySummary").css("display", "none")
    $("#adminCars").css("display", "none")
    $("#adminDrivers").css("display", "none")
    $("#adminCustomer").css("display", "none")
    $("#adminPayments").css("display", "none")

    $("#admin-reservation-title").css("display", "block")
    $("#admin-todayPickups-title").css("display", "none")

    $("#admin-update-reservation").css("display", "block")
    $("#admin-view-reservation").css("display", "none")

    loadPendingReservations();
})

//--Cars
$("#adminCarsBtn").click(function () {
    $("#adminCars").css("display", "inline-flex")

    $("#adminReservation").css("display", "none")
    $("#adminDailySummary").css("display", "none")
    $("#adminDrivers").css("display", "none")
    $("#adminCustomer").css("display", "none")
    $("#adminPayments").css("display", "none")


    $("#availableBtn").css("display", "none");
    $("#unavailableBtn").css("display", "none");
    $("#maintainBtn").css("display", "none");
    $("#underMaintainBtn").css("display", "none");
    $("#viewButton").css("display", "block");


    $("#admin-all-cars-title").css("display", "block")
    $("#admin-all-unavailableCars-title").css("display", "none");
    $("#admin-all-needMaintains-title").css("display", "none");
    $("#admin-all-underMaintains-title").css("display", "none");
    $("#admin-all-availableCars-title").css("display", "none");

    loadAllCars("allCarDetail")

})

//--Customer
$("#adminCustomerBtn").click(function () {
    $("#adminCustomer").css("display", "inline-flex")

    $("#adminCars").css("display", "none")
    $("#adminReservation").css("display", "none")
    $("#adminDailySummary").css("display", "none")
    $("#adminDrivers").css("display", "none")
    $("#adminPayments").css("display", "none")

    loadAllCustomers();
})

//--Drivers
$("#adminDriversBtn").click(function () {
    $("#adminDrivers").css("display", "inline-flex")

    $("#adminCustomer").css("display", "none")
    $("#adminCars").css("display", "none")
    $("#adminReservation").css("display", "none")
    $("#adminDailySummary").css("display", "none")
    $("#adminPayments").css("display", "none")

    $("#admin-driver-schedule-table").css("display", "none")
    $("#admin-driver-table").css("display", "block")


    $("#admin-all-drivers-title").css("display", "block")
    $("#admin-all-driverSchedule-title").css("display", "none")

    $("#enableSaveDriverBtn").css("display", "block");
    $("#enableSearchDriverBtn").css("visibility", "hidden");

    loadAllDrivers();
})

function loadTodayAvailableCars() {
    $.ajax({
        url: baseUrl + "car/availableOrRentalCarsByDate?pick_up_date=" + today + "&return_date=&status=Available",
        method: 'GET',
        success: function (resp) {
            if (resp.status === 200) {
                carList = resp.data
                // loadDataToDiv()
                loadAllCars("allCarDetail")
            }
        },
        error: function (err) {
            console.log(err);
        }
    });
}

//--Payment
$("#adminPaymentBtn").click(function () {
    $("#adminPayments").css("display", "inline-flex")

    $("#adminDrivers").css("display", "none")
    $("#adminCustomer").css("display", "none")
    $("#adminCars").css("display", "none")
    $("#adminReservation").css("display", "none")
    $("#adminDailySummary").css("display", "none")

    $("#admin-all-drivers-title").css("display", "block")
    $("#admin-all-driverSchedule-title").css("display", "none")


    $("#enableSaveDriverBtn").css("display", "block");
    $("#enableSearchDriverBtn").css("visibility", "hidden");

    loadAllDrivers()


})

function clearAllReservationDetails() {
    $("#customer-reservationStatus").text("No Reservation")
    $("#customer-reservationStatus").css("color", "black")

    $("#driverStatus").text("Not Required")
    $("#driverStatus").css("color", "black")


    $('#customer-reservation-driver-id,#customer-reservation-driver-name, #customer-reservation-driver-license,#customer-reservation-driver-mobile, #customer-reservation-driver-joinDate').text("")
    $('#customer-reservation-id,#customer-reservation-name,#customer-reservation-vehicle,#customer-reservation-venue,#customer-reservation-pickUp-time,#customer-reservation-pickUp-date,#customer-reservation-return-date,#customer-reservation-days').text("")
    $("#customer-upcoming-reservation-table").empty();

}

$(window).on('load', function () {

    const loadAllCars = (allCarDetail) => {
        
    };
    loadAllCars("allCarDetail");
})

let divArray = ["#div-one", "#div-two", "#div-three"];

//--Admin Dashboard
function loadIncome() {
    $.ajax({
        url: baseUrl + "payment/daily_weekly_Annually_Income?type=Daily&start_date=&end_date=",
        method: "GET",
        success: function (resp) {
            if (resp.code === 200) {
                $("#admin-daily-income").text(resp.data)
            }
        }
    });
    $.ajax({
        url: baseUrl + "payment/daily_weekly_Annually_Income?type=Monthly&start_date=&end_date=",
        method: "GET",
        success: function (resp) {
            if (resp.code === 200) {
                $("#admin-Monthly-income").text(resp.data)
            }
        }
    });
    $.ajax({
        url: baseUrl + "payment/daily_weekly_Annually_Income?type=Weekly&start_date=&end_date=",
        method: "GET",
        success: function (resp) {
            if (resp.code === 200) {
                $("#admin-weekly-income").text(resp.data)
            }
        }
    });
    $.ajax({
        url: baseUrl + "payment/daily_weekly_Annually_Income?type=Yearly&start_date=&end_date=",
        method: "GET",
        success: function (resp) {
            if (resp.code === 200) {
                $("#admin-Yearly-income").text(resp.data)
            }
        }
    });

}

function loadAvailableAndRentalCar() {
    $.ajax({
        url: baseUrl + "car/availableOrRentalCarsByDate?pick_up_date=" + today + "&return_date=&status=Available",
        method: "GET",
        success: function (resp) {
            if (resp.code === 200) {
                $("#admin-daily-available-cars").text(resp.data.length)
            }
        }
    });
    $.ajax({
        url: baseUrl + "car/availableOrRentalCarsByDate?pick_up_date=" + today + "&return_date=&status=Rental",
        method: "GET",
        success: function (resp) {
            if (resp.code === 200) {
                $("#admin-daily-rental-cars").text(resp.data.length)
            }
        }
    });
}

function loadAvailableAndOccupiedDrivers() {
    $.ajax({
        url: baseUrl + "driver/todayAvailableAndOccupiedDrivers/Available",
        method: "GET",
        success: function (resp) {
            if (resp.code === 200) {
                $("#admin-daily-available-drivers").text(resp.data.length)
            }
        }
    });
    $.ajax({
        url: baseUrl + "driver/todayAvailableAndOccupiedDrivers/Occupied",
        method: "GET",
        success: function (resp) {
            if (resp.code === 200) {
                $("#admin-daily-occupied-cars").text(resp.data.length)
            }
        }
    });
}

function loadTodayReservations() {
    $("#admin-daily-reservation-table").empty();

    $.ajax({
        url: baseUrl + "reservation/todayReservation",
        method: "GET",
        success: function (resp) {
            for (const reservation of resp.data) {
                let row = `<tr><td>${reservation.reserve_id}</td><td>${reservation.car.registrationId}</td><td>${reservation.customer.nic}</td></tr>`;
                $("#admin-daily-reservation-table").append(row);
            }
        }
    });

}

function loadTodayPayments() {
    $("#admin-daily-payment-table").empty();

    $.ajax({
        url: baseUrl + "payment/todayIncomeList",
        method: "GET",
        success: function (resp) {
            for (const payment of resp.data) {
                let row = `<tr><td>${payment.bill_id}</td><td>${payment.carReservation.reserve_id}</td><td>${payment.pay_date}</td><td>${payment.total_payment}</td></tr>`;
                $("#admin-daily-payment-table").append(row);
            }
        }
    });
}

function loadDailySummary() {
    loadIncome();
    loadAvailableAndRentalCar();
    loadAvailableAndOccupiedDrivers();
    loadTodayReservations();
    loadTodayPayments()
}


let baseUrl = "http://localhost:8080/02_Back_End_war_exploded/";


/*
let baseUrl = "http://localhost:8080/02_Back_End_war_exploded/"*/
