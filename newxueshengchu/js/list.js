
$(document).ready(function(){
    setWidth();
});

function setWidth() {
    console.info($(".content").width());
    $(".list-group-item").each(function (index) {
        $(this).find(".tit").width($(".head-title").width() - $(this).find(".time").width() - $(this).find(".readtime").width()-50);
        console.info($(this).find(".time"));
        console.info($(this).find(".readtime"));
    });
}