var navigatorLi;
var navigatorPanel;
var skip,main,allskip,photoskip,infoskip;
var infoLi;

setBackMargin();

function setBackMargin(){
    document.getElementsByClassName("back").item(0).style.marginTop = document.body.offsetHeight * 0.4 + "px";

    var width = $(".bottom-div").width();
    var imgWidth = $(".bottom-img-div img").eq(0).width();
    var toMargin = (width-imgWidth*4)/3;
    $(".bottom-div .bottom-img-div").each(function (index,element) {
        if(index!=0){
            element.style.marginLeft = toMargin + 'px';
        }
    });
}