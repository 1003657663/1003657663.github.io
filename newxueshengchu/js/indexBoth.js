
first();
function first(){
    console.info("执行first");
    var liWidth = $(".left-div .bd").width();
    $(".left-div .bd li p").width(liWidth -80);
};