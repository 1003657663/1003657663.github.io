$(document).ready(function(){
    $("#CalendarMain").remove();
    $(".time").each(function () {
        var va = $(this).text().split('.');
        $(this).text(va[1]+'.'+va[2]);
    });

    setWidth();
});

function setWidth() {
    $(".list-group-item").each(function (index) {
        $(this).find(".tit").width($(".head-title").width() - $(this).find(".time").width() - $(this).find(".readtime").width()-15);
    });
}