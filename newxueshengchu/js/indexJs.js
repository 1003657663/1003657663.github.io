var navigatorLi;
var navigatorPanel;
var skip,main,allskip,photoskip,infoskip;
var infoLi;

(function(){
    var top;
    var topHeight;
    var photo;
    var photoHeight;
	var list;
	var picture;

    setNavigator();
    main = document.getElementById("navigatorskip");
    allskip = main.getElementsByTagName("div");
    window.onresize = setNavigator;
    function setNavigator(){
        top = document.getElementById("top");
        list = document.getElementById("list");
		picture = document.getElementById("picture");
        navigatorLi = list.getElementsByTagName("li");
		infoLi = picture.getElementsByTagName("li");
        topHeight = top.offsetHeight;
    }
})();
function changeLi(e){
    for(i=0;i<navigatorLi.length;i++)
    {
         navigatorLi[i].style.background = "rgba(255,255,255,1)";
		 navigatorLi[i].style.color = "rgba(0,0,0,1)";
    }
    for(h=0;h<allskip.length;h++)
    {
        allskip[h].style.display = "none";
    }

    e.style.backgroundColor = "rgba(25,101,255,1)";
	e.style.color = "rgba(255,255,255,1)";
    skip = document.getElementById(e.id+"skip");
    skip.style.display = "block";
}
function varyLi(e){
    for(i=0;i<infoLi.length;i++)
    {
        infoLi[i].style.background = "rgba(255,255,255,1)";
		 infoLi[i].style.color = "rgba(0,0,0,1)";
    }
    for(h=1;h<=3;h++)
    {
		skip = document.getElementById("infoLi"+h+"skip").style.display="none";
    }

    e.style.backgroundColor = "rgba(25,101,255,1)";
	e.style.color = "rgba(255,255,255,1)";
    skip = document.getElementById(e.id+"skip");
    skip.style.display = "block";
};