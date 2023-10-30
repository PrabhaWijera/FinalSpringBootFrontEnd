$("#button1,#button2,#button3,#button4").on("click",(event)=>{
    localStorage.setItem("packageName",JSON.stringify(event.target.id))
    if(!JSON.parse(localStorage.getItem("userAuthToken"))){
        event.preventDefault();
        console.log("sufbfbofbesf");
        return window.location.href = 'loginPage.html';

    }


})
$("#button1").on("click",()=>{
    localStorage.setItem("packageName",JSON.stringify("regular"))
})
$("#button2").on("click",()=>{
    localStorage.setItem("packageName",JSON.stringify("mid"))
})
$("#button3").on("click",()=>{
    localStorage.setItem("packageName",JSON.stringify("luxury"))
})
$("#button4").on("click",()=>{
    localStorage.setItem("packageName",JSON.stringify("superLux"))
})