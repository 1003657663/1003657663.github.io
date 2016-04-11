delWeather();
setpad();
function delWeather(){
    document.getElementsByClassName("weather").item(0).remove();
}
function setpad() {
    $(".bottom-img-div").css("padding","5px");
}