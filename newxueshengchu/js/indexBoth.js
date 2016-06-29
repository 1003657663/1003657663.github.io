
first();
function first(){
    $(document).ready(function () {
        console.info("执行first");
        var liWidth = $(".left-top-nav").width();
        if(isMoOrPC()=='pc'){
            $(".left-div .bd li p").width(liWidth -100);
        }else {
            $(".left-div .bd li p").width(liWidth -80);
        }
    });
}