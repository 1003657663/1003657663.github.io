/**
 * Created by chao on 2016/3/19.
 */

$(document).ready(function () {
    //获取浏览器窗口宽度
    var isFirst = 0;
    window.onresize = function(){
        window.location.reload();
    };

    setNewWidth();
    function setNewWidth() {
        //----参数部分
        var windowWidth = $(window).width();
        windowWidth = parseInt(windowWidth);
        var news = $(".new");
        var padWidthOneNew = 10;
        var newsWidth = windowWidth/(news.length)*0.5;
        //-------------

        news.width(newsWidth);
        news.css({"paddingLeft":padWidthOneNew+'px',"paddingRight":padWidthOneNew+'px'});
        newsWidth += padWidthOneNew*2;
        var marginLeft = -1*newsWidth/2;
        news.css({"margin-left":marginLeft+'px',"left":windowWidth/2+'px'});

        //起始动画加载部分
        var newsOnePer = 1/((news.length+1)*2-2);
        for(var i=1;i<=5;i++){
            if(i==1){
                $("#new" + i).animate({left: newsOnePer * windowWidth}, 2000);
            }else if(i==5){
                $("#new" + i).animate({left: (newsOnePer +(newsOnePer*(i-1)*2)) * windowWidth}, 2000);
            }else if(i==3){
                $("#new" + i).animate({left: ((newsOnePer * (i-1)*2)+newsOnePer) * windowWidth}, 2000 ,enterToBig);
            } else{
                $("#new" + i).animate({left: ((newsOnePer * (i-1)*2)+newsOnePer) * windowWidth}, 2000);
            }
        }

        newsWidth -=padWidthOneNew*2;
        var time = 300;
        var bei = 2;//放大倍数
        function enterToBig(the){
            for(var i=1;i<=5;i++) {
                if($("#new" + i).width()>=newsWidth){
                    leaveToSmall("#new"+i);
                }
            }
            var oneWidth = $(this).width();
            if(oneWidth <= newsWidth+1 && oneWidth >=newsWidth-1) {
                if ($(this).attr("class") && $(this).attr("class").indexOf("new") != -1) {
                    the = this;
                }

                var willMarginLeft = (parseInt($(the).css("marginLeft")) + (newsWidth * bei - newsWidth) / 2 * -1) * -1;
                var willLeftMoveWidth = (newsWidth * bei - newsWidth) / 2;
                var offLeft = $(the)[0].offsetLeft;
                var offRight = windowWidth - offLeft - newsWidth - padWidthOneNew * 2;

                if (offLeft < willLeftMoveWidth) {
                    $(the).animate({
                        width: newsWidth * bei,
                        marginLeft: (parseInt($(the).css("marginLeft")) * -1 + offLeft - 10) * -1//-----像右移动offLeft-10个单位
                    }, time);
                }
                else if (windowWidth - offLeft - newsWidth - padWidthOneNew * 2 < willLeftMoveWidth) {
                    $(the).animate({
                        width: newsWidth * bei,
                        marginLeft: (parseInt($(the).css("marginLeft")) * -1 + willLeftMoveWidth + willLeftMoveWidth - (offRight - 10)) * -1
                    }, time);
                } else {
                    $(this).animate({
                        width: newsWidth * bei,
                        marginLeft: willMarginLeft * -1
                    }, time);
                }
            }
        }
        function leaveToSmall(the){
            if($(this).attr("class") && $(this).attr("class").indexOf("new") != -1){
                the = this;
            }
            //console.info("now width:"+$(shit.))
            if($(the).width() > newsWidth) {
                $(the).animate({width: newsWidth, marginLeft: marginLeft}, time);
            }
        }
        news.mouseenter(enterToBig);
        news.mouseleave(leaveToSmall);
    }
});
