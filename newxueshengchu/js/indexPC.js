/**
 * Created by chao on 2016/3/19.
 */

$(document).ready(function () {
    //获取浏览器窗口宽度
    window.onresize = setNewWidth;
    setNewWidth();
    function setNewWidth() {
        //----参数部分
        var windowWidth = $(window).width();
        var news = $(".new");
        var padWidthOneNew = 10;
        var newsWidth = windowWidth/(news.length)*0.5;
        //-------------

        news.width(newsWidth);
        newsWidth += padWidthOneNew*2;
        var marginLeft = -1*newsWidth/2;
        news.css({"margin-left":marginLeft+'px',"left":windowWidth/2+'px'});

        //起始动画加载部分
        var newsOnePer = 1/((news.length+1)*2-2);
        for(var i=1;i<=5;i++){
            if(i==1){
                $("#new" + i).animate({left: newsOnePer * windowWidth}, 1000);
            }else if(i==5){
                $("#new" + i).animate({left: (newsOnePer +(newsOnePer*(i-1)*2)) * windowWidth}, 1000);
            }else {
                $("#new" + i).animate({left: ((newsOnePer * (i-1)*2)+newsOnePer) * windowWidth}, 1000);
            }
        }

        newsWidth -=padWidthOneNew*2;
        var time = 300;
        news.mouseover(function () {
            var bei = 2;
            var willMarginLeft = (parseInt($(this).css("marginLeft")) + (newsWidth * bei - newsWidth) / 2 * -1) * -1;
            var willLeftMoveWidth = (newsWidth * bei - newsWidth) / 2;
            var offLeft = $(this)[0].offsetLeft;
            var offRight = windowWidth - offLeft-newsWidth-padWidthOneNew*2;

            if (offLeft < willLeftMoveWidth) {
                $(this).animate({
                    width: newsWidth * bei,
                    marginLeft: (parseInt($(this).css("marginLeft")) * -1 + offLeft - 10) * -1//-----像右移动offLeft-10个单位
                }, time);
            }
            else if (windowWidth - offLeft - newsWidth-padWidthOneNew*2 < willLeftMoveWidth) {
                $(this).animate({
                    width: newsWidth * bei,
                    marginLeft: (parseInt($(this).css("marginLeft")) * -1 +willLeftMoveWidth+willLeftMoveWidth-(offRight - 10)) * -1
                }, time);
            } else {
                $(this).animate({
                    width: newsWidth * bei,
                    marginLeft: willMarginLeft*-1
                }, time);
            }
        });
        news.mouseout(function () {
            $(this).animate({width: newsWidth, marginLeft: marginLeft}, time);
        });
    }
});
