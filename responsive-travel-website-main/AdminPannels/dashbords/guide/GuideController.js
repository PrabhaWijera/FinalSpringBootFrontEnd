import { Guide } from "./Guide.js";
import { AlertController } from "../AlertController.js";
import { LocalStorageDB } from "../LocalStorageDB.js";

// Save Function
$("#guideAddButton").on("click", function () {
    const GuideIMG = $("#guideIMG")[0].files[0];
    const NICimage = $("#gNICimg")[0].files[0];
    const GuidingIDIMG = $("#gudingIDimg")[0].files[0];

    const GId = $("#gId").val();
    const GName = $("#gName").val();
    const Age = $("#age").val();
    const Address = $("#gAddress").val();
    const Gender = $("#gender").val();
    const Experience = $("#gExperience").val();
    const ManValue = $("#mandayValue").val();
    const Remark = $("#gremark").val();

    const detailsSave = {
        GuideIMG: GuideIMG.name,
        NICimage: NICimage.name,
        GuidingIDIMG: GuidingIDIMG.name,
        GId: GId,
        GName: GName,
        Age: Age,
        Address: Address,
        Gender: Gender,
        Experience: Experience,
        ManValue: ManValue,
        Remark: Remark,
    };

    $.ajax({
        url: "http://localhost:8080/save", // Replace with the correct save endpoint
        method: "POST",
        async: true,
        data: JSON.stringify(detailsSave),
        contentType: "application/json",
        success: function (resp) {
            console.log(resp);
            alert(resp.message);
            loadImage();
        },
        error: function (error) {
            let pas = JSON.parse(error.responseText);
            alert(pas.message);
        },
    });
});

// Load Image Function for Saving
function loadImage() {
    const data = new FormData();

    const GuideIMG = $("#guideIMG")[0].files[0];
    const GNICimg = $("#gNICimg")[0].files[0];
    const GudingIDimg = $("#gudingIDimg")[0].files[0];

    data.append("myFile1", GuideIMG);
    data.append("myFile2", GNICimg);
    data.append("myFile3", GudingIDimg);

    $.ajax({
        url: "http://localhost:8080/upload", // Replace with the correct upload endpoint
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

// Update Function
$("#gUpdateButton").on("click", function () {
    const GuideIMG = $("#uguideIMG")[0].files[0];
    const NICimage = $("#ugNICimg")[0].files[0];
    const GuidingIDIMG = $("#ugudingIDimg")[0].files[0];

    const GId = $("#ugId").val();
    const GName = $("#ugName").val();
    const Age = $("#uage").val();
    const Address = $("#ugAddress").val();
    const Gender = $("#ugender").val();
    const Experience = $("#ugExperience").val();
    const ManValue = $("#umandayValue").val();
    const Remark = $("#ugremark").val();

    const detailsUpdate = {
        GuideIMG: GuideIMG.name,
        NICimage: NICimage.name,
        GuidingIDIMG: GuidingIDIMG.name,
        GId: GId,
        GName: GName,
        Age: Age,
        Address: Address,
        Gender: Gender,
        Experience: Experience,
        ManValue: ManValue,
        Remark: Remark,
    };

    $.ajax({
        url: "http://localhost:8080/update", // Replace with the correct update endpoint
        method: "PUT",
        async: true,
        data: JSON.stringify(detailsUpdate),
        contentType: "application/json",
        success: function (resp) {
            console.log(resp);
            alert(resp.message);
            loadImageUpdate();
        },
        error: function (error) {
            let pas = JSON.parse(error.responseText);
            alert(pas.message);
        },
    });
});

// Load Image Function for Updating
function loadImageUpdate() {
    const data = new FormData();

    const GuideIMG = $("#uguideIMG")[0].files[0];
    const GNICimg = $("#ugNICimg")[0].files[0];
    const GudingIDimg = $("#ugudingIDimg")[0].files[0];

    data.append("myFile1", GuideIMG);
    data.append("myFile2", GNICimg);
    data.append("myFile3", GudingIDimg);

    $.ajax({
        url: "http://localhost:8080/upload", // Replace with the correct upload endpoint
        method: 'PUT',
        async: true,
        contentType: false,
        processData: false,
        data: data,
        success: function (resp) {
            alert("Successfully Uploaded" + resp);
        },
        error: function (err) {
            console.log(err + "error");
        }
    });
}
