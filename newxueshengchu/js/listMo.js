$(document).ready(function(){
    $(".time").each(function () {
        var d = $(this).text().split('-');
        var date = new Date();

        //更改时间如果是今天就写今天,如果没有gaicheng月日
        if(parseInt(d[0]) == date.getUTCFullYear() && parseInt(d[1]) == date.getUTCMonth()+1 && parseInt(d[2]) == date.getUTCDate()){
            $(this).html("&nbsp;今天&nbsp;");
        }else {
            $(this).text(d[1]+'.'+d[2]);
        }
    });

    setWidth();
});

function setWidth() {
    $(".list-group-item").each(function (index) {
        $(this).find(".tit").width($(".head-title").width() - $(this).find(".time").width() - $(this).find(".readtime").width()-25);
    });
}