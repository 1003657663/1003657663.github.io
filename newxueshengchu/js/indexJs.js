
setBackMargin();

function setBackMargin() {
    if(document.body.offsetWidth < 750){
        document.getElementsByClassName("back").item(0).style.marginTop = 0 + "px";
    }else {
        document.getElementsByClassName("back").item(0).style.marginTop = document.body.offsetHeight * 0.4 + "px";
    }
    $(".bottom-div").css("margin", "100px 0 0 0");
    if (document.body.offsetWidth > 750) {
        $(".bottom-div .bottom-img-div").each(function(index,element){
            element.style.width = '163px';
            element.style.height = '100px';
        });


        var width = $(".bottom-div").width();
        var imgWidth = 163;//$(".bottom-img-div img").eq(0).width();
        var toMargin = (width - imgWidth * 4) / 3;
        $(".bottom-div .bottom-img-div").each(function (index, element) {
            if (index != 0) {
                element.style.marginLeft = toMargin + 'px';
            }
        });

    } else {
        $(".bottom-div .bottom-img-div").each(function(index,element){
            /*element.style.width = '98px';
            element.style.height = '60px';*/
            element.style.margin = '0';
        });
    }
}