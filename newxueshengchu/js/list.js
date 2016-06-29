
$(document).ready(function(){
    setWidth();
    window.onresize = setWidth;

    //判断日期,是今天的日期改成"今天"
    $(".time").each(function () {
        var datestr = $(this).text();
        var d = datestr.split('-');
        var date = new Date();
        if(parseInt(d[0]) == date.getUTCFullYear() && parseInt(d[1]) == date.getUTCMonth()+1 && parseInt(d[2]) == date.getUTCDate()){
            $(this).html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;今天&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
        }
    });
});

function setWidth() {
    $(".list-group-item").each(function (index) {
        $(this).find(".tit").width($(".head-title").width() - $(this).find(".time").width() - $(this).find(".readtime").width()-50);
    });
}