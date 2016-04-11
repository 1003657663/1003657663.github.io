
$(document).ready(function(){
    setWidth();
    window.onresize = setWidth;
});

function setWidth() {
    $(".list-group-item").each(function (index) {
        $(this).find(".tit").width($(".head-title").width() - $(this).find(".time").width() - $(this).find(".readtime").width()-50);
    });
}