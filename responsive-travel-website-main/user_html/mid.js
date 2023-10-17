$(document).ready(function () {
    $("#button2").on("click", function () {
        const midValue = $(this).data("mid");
alert(midValue);
        if (typeof Storage !== "undefined") {
            localStorage.setItem("MID", midValue);
            alert("MID saved in local storage");
        } else {
            alert("Sorry, your browser does not support local storage.");
        }
    });
});
