var ismouse = false;
var downx = 0, downy = 0;//鼠标xy坐标记录
var map, poplayer, windows, maptab, allmap;
var l, t;
var num = 2;
var movex, movey;//记录鼠标移动时的坐标
var scrollzoom = 2;//当前的缩放级别
var img1, img2, img3, img4;//分别代表了map1234中的所有图片的数组
var win_width, win_height;
var windows, namespan, placeimg, introductiontext, upimg;//包括弹出窗口的id存储变量
var mapcontrol;
var rownum, cellnum;//---在屏幕上显示的行数列数
var h1 = 1, h2 = 9, i1 = 8, i2 = 3, jia = 2, rowtop = 2, cellleft = 2;//----初始显示第二级的数据,最后两个代表顶部和左边空余的行列数，即未显示在屏幕上的未加载的
var allimg, alltr, alltd, alltrnum;//---所有的img的数组，所有行的数组，所有td的数组，所有行的数目alltrnum
//------禁止选中
document.ondragstart = function () {
    return false;
};
document.draggable = "false";
window.onresize = findsize;
function first() {
	allmap = document.getElementById("allmap");
	maptab = document.getElementById("maptab");
	map = document.getElementById("map");
	poplayer = document.getElementById("poplayer");
	windows = document.getElementById("windows");
	namespan = document.getElementById("namespan");
	placeimg = document.getElementById("placeimg");
	introductiontext = document.getElementById("introductiontext");
	upimg = document.getElementById("upimg");
	mapcontrol = document.getElementById("mapcontrol");
	//--------------------------------------------------------------------------------------------以上是读取html页面dom的代码，再页面加载完成后读取	
	allmap.style.cursor = "url(signimage/n.cur),auto";//设置allmap里的鼠标样式为手没有握拳样式
	//禁止选中和右键
	allmap.oncontextmenu = new Function('event.returnValue=false;');
	allmap.onselectstart = new Function('event.returnValue=false;');
	findsize();
	upimg.useMap = "#redian2";//初始显示的第二级数据
	map.style.left = -515 + 'px';
	map.style.top = -516 + 'px';
	display();
	signname();//署名函数--------------未完成
	allmap.style.height = win_height + 'px';
}
var size = 1;//------------------------------------size变量用来重载页面时的限制无限重载
function findsize() //函数：获取尺寸
{
	//通过深入Document内部对body进行检测，获取窗口大小
	if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
		win_height = document.documentElement.clientHeight;
		win_width = document.body.clientWidth;
	}
	if (size > 1)
	{ location.reload(); }//------重载页面
	size++;
}
//--------------------------------显示并创建---------------------------//
function display() {
	//----------------------------计算窗口加载的行列数量-----------//
	cellnum = Math.ceil(win_width / 256) + 1;
	if (cellnum > h2 - h1 + 1)
	{ cellnum = h2 - h1 + 1; cellleft = 0; }
	rownum = Math.ceil(win_height / 256) + 1;
	if (rownum > i1 - i2 + 1)
	{ rownum = i1 - i2 + 1; rowtop = 0; }
	if (cellleft + cellnum >= h2 - h1 + 1 && cellnum < h2 - h1 + 1)//------放大缩小时候会出现cellleft或者rowtop和行列数加起来大于总行列数的情况，下面吧cellleft或rowtop减小消掉bug
	{ cellleft = h2 - h1 + 1 - cellnum; }
	if (rowtop + rownum >= i1 - i2 + 1 && rownum < i1 - i2 + 1)
	{ rowtop = i1 - i2 + 1 - rownum; }
	//-----------------------------------------加载部分屏幕中央图片-----------//
	for (i = i1; i >= i2; i--) {
		if (i <= i1 - rowtop && i > i1 - rowtop - rownum) {
			tr = document.createElement("tr");
			maptab.appendChild(tr);
			for (h = h1; h <= h2; h++) {
				if (h >= h1 + cellleft && h < h1 + cellleft + cellnum) {
					//----------------------添加表格-------------//
					td = document.createElement("td");
					tr.appendChild(td);
					td.width = "256px";
					td.height = "256px";
					img = document.createElement("img");
					td.appendChild(img);
					img.src = "images" + jia + "/" + h + "-" + i + ".gif";
					//img.alt="images"+jia+"/"+h+"-"+i+".gif";
				}
			}
		}
	}
	maptab.style.left = cellleft * 256 + 'px';//----------maptab相对于map进行移动，移动距离是256倍数
	maptab.style.top = rowtop * 256 + 'px';
	allimg = maptab.getElementsByTagName("img");//----------------把img，tr等量赋值存储到数组
	alltr = maptab.getElementsByTagName("tr");
	alltrnum = alltr.length;
	map.style.width = 256 * (h2 - h1 + 1) + 'px';
	map.style.height = 256 * (i1 - i2 + 1) + 'px';
	upimg.style.width = 256 * (h2 - h1 + 1) + 'px';
	upimg.style.height = 256 * (i1 - i2 + 1) + 'px';
}
//----------------------------------------------鼠标移到热点上弹出函数--------------//
function spacename(e) {
    var e = e || window.event;
    var obj = e.srcElement || e.target;
	var tagname = obj.tagName;
	var namee = obj.alt;
	movex = e.clientX;
	movey = e.clientY;
	if (tagname == "AREA") {
		var tempnum = parseInt(namee);
		poplayer.innerHTML = objplace[tempnum].placename;
		allmap.style.cursor = "pointer";
		poplayer.style.display = "block";
		poplayer.style.left = movex + 15 + 'px';
		poplayer.style.top = movey + 10 + 'px';
	}
}
//----------------------------------------------鼠标移zou热点隐藏函数--------------//
function hideWindow(e) {
	allmap.style.cursor = "url(signimage/n.cur),auto";
	var e = e || window.event;
    var obj = e.srcElement || e.target;
	var tagname = obj.tagName;
	if (tagname == "AREA") {
		poplayer.style.display = "none";
	}
}
//------------------------------------------鼠标点击弹出窗口----------------------//
function popWindow(e) {
	var e = e || window.event;
    var obj = e.srcElement || e.target;
	var tagname = obj.tagName;
	var namee = obj.alt;
	if (tagname == "AREA" && downx == movex && downy == movey) {
		var tempnum = parseInt(namee);
		namespan.innerHTML = objplace[tempnum].placename;
		if(introduce[tempnum]) {
			introductiontext.innerHTML = introduce[tempnum];
		}
		placeimg.src = "placeimages/" + objplace[tempnum].placename + ".jpg";
		placeimg.height = 140;
		placeimg.onerror = function () { placeimg.height = 0; windows.style.top = windows.offsetTop + 140 + 'px'; }
		windows.style.display = "block";
		movewhere(objplace[tempnum].placex[zoom - 1], objplace[tempnum].placey[zoom - 1]);
		windows.style.left = objplace[tempnum].placex[zoom - 1] - 130 + 'px';
		windows.style.top = objplace[tempnum].placey[zoom - 1] - windows.offsetHeight + 'px';
	}
}
var xunhuan;
var wintop;
function movewhere(x, y) {
	var zuobian = win_width / 2 - x - map.offsetLeft;
	var shangbian = win_height / 2 - y - map.offsetTop + 100;
	wintop = y - map.offsetTop;
	var aver = 20;
	var linshi = 0;
	zuobian = zuobian / aver;
	shangbian = shangbian / aver;
	xunhuan = setInterval(function () {
		linshi++;
		map.style.left = map.offsetLeft + (zuobian) + 'px';
		map.style.top = map.offsetTop + (shangbian) + 'px';
		if (linshi == 20) {
			linshi = 0;
			clearInterval(xunhuan);
		}
		changetab();
	}, 20);
}
//-----------------------------点击x然后关闭弹窗-----------------//
function closepop() {
	introductiontext.style.height = 100 + 'px';
	windows.style.display = "none";
}
//------------------------------滚轮滚动，然后缩放函数--------------//
var signStop = 0;
var zoom = 2;
var changeleft, changetop;
var cl, rt;
function change(w) {//w传递 减小或放大
	var hh = h2 - h1 + 1, ii = i1 - i2 + 1;
	var nowWidth;
	var fo1, fo2;
	//----------------关闭弹窗
	closepop();
	//--------------------------消掉搜索出现的小图标
	if (searchImage.length != 0) {
		for (i = 0; i < searchImage.length; i++) {
			map.removeChild(searchImage[i]);
		}
		searchImage.length = 0;
	}

	cl = cellleft;
	rt = rowtop;
	alltr = maptab.getElementsByTagName("tr");
	if (w == "reduce" && signStop == 0 && zoom > 1)//--------缩小
	{
		//-----------关闭测距
		canvasClose();
		//---------------------------移除另一个图层
		if (maptabTemp) {
			map.removeChild(maptabTemp);
			maptab.style.zIndex = "10";
		}
		//-----------------------------------------
		zoom--;
		signStop--;
		//---------减小的时候数组赋值给热点------//
		upimg.useMap = "#redian2";
		nowWidth = (map.offsetWidth / hh) / 2;
		speed = nowWidth / 8;
		fo1 = setInterval(function foor() {
			signStop--;
			nowWidth = map.offsetWidth / hh;
			//------------------------------更改表格宽高，和图片宽高
			for (i = 0; i < alltr.length; i++) {
				alltd = alltr[i].getElementsByTagName("td");
				for (h = 0; h < alltd.length; h++) {
					alltd = alltr[i].getElementsByTagName("td");
					alltd[h].width = nowWidth - speed + 'px';
					alltd[h].style.height = nowWidth - speed + 'px';
					img = alltd[h].getElementsByTagName("img");
					img[0].style.width = nowWidth - speed + 'px';
					img[0].style.height = nowWidth - speed + 'px';
				}
			}
			var b1 = (movey - map.offsetTop) / map.offsetHeight;
			//******一次放大变化之前记录数据*********
			var a1 = (movex - map.offsetLeft) / map.offsetWidth;
			var a2 = movex - map.offsetLeft;
			var b2 = movey - map.offsetTop;
			//**变化map
			map.style.width = (nowWidth - speed) * hh + 'px';
			map.style.height = (nowWidth - speed) * ii + 'px';
			maptab.style.left = (nowWidth - speed) * cellleft + 'px';
			maptab.style.top = (nowWidth - speed) * rowtop + 'px';
			//*****计算一次变化中应该相对偏移的xy值**********
			var x = a2 - (map.offsetWidth * a1);
			var y = b2 - (map.offsetHeight * b1);
			//******进行偏移*********
			everywhere(x, y);

			if (signStop == -9) {
				signStop = 0;
				clearInterval(fo1);
				displayagain(0);
			}
		}, 50);
	}
	if (w == "boost" && signStop == 0 && zoom < 4)//------放大
	{
		//-----------关闭测距
		canvasClose();
		//---------------------------移除另一个图层
		if (maptabTemp) {
			map.removeChild(maptabTemp);
			maptab.style.zIndex = "10";
		}
		//--------------------------------------------
		zoom++;
		signStop++;
		//---------放大的时候数组赋值给热点------//
		upimg.useMap = "#redian3";
		nowWidth = (map.offsetWidth / hh);
		speed = nowWidth / 8;
		fo2 = setInterval(function foor() {
			signStop++;
			nowWidth = map.offsetWidth / hh;
			//------------------------------图片宽高
			//------------------------------更改表格宽高，和图片宽高
			for (i = 0; i < alltr.length; i++) {
				alltd = alltr[i].getElementsByTagName("td");
				for (h = 0; h < alltd.length; h++) {
					alltd = alltr[i].getElementsByTagName("td");
					alltd[h].width = nowWidth + speed + 'px';
					alltd[h].style.height = nowWidth + speed + 'px';
					img = alltd[h].getElementsByTagName("img");
					img[0].style.width = nowWidth + speed + 'px';
					img[0].style.height = nowWidth + speed + 'px';
				}
			}
			//******一次放大变化之前记录数据*********
			var a1 = (movex - map.offsetLeft) / map.offsetWidth;
			var a2 = movex - map.offsetLeft;
			var b1 = (movey - map.offsetTop) / map.offsetHeight;
			var b2 = movey - map.offsetTop;
			//**变化map
			map.style.width = (nowWidth + speed) * hh + 'px';
			map.style.height = (nowWidth + speed) * ii + 'px';
			maptab.style.left = (nowWidth + speed) * cellleft + 'px';
			maptab.style.top = (nowWidth + speed) * rowtop + 'px';
			//*****计算一次变化中应该相对偏移的xy值**********
			var x = a2 - (map.offsetWidth * a1);
			var y = b2 - (map.offsetHeight * b1);
			//******进行偏移*********
			everywhere(x, y);

			if (signStop == 9) {
				signStop = 0;
				clearInterval(fo2);
				displayagain(1);
			}
		}, 50);
	}
}
//-----------------------------------------------------画出相应级数的地图-----------//
var maptabTemp;
function displayagain(beforezoom) {
	if (zoom == 1 && signStop == 0)//--------------------1级
	{
		if (beforezoom == 1)
		{ changeleft = 0; changetop = 0; }
		else
		{ changeleft = -2; changetop = 0; }
		h1 = 2; h2 = 6; i1 = 12; i2 = 10;
		jia = 1;
		gongyong();
		upimg.useMap = "#redian1";
	}
	if (zoom == 2 && signStop == 0)//--------------------2级
	{
		if (beforezoom == 1)
		{ changeleft = 0; changetop = 0; }
		else
		{ changeleft = -125; changetop = -131; }
		h1 = 1; h2 = 9; i1 = 8; i2 = 3;
		jia = 2;
		gongyong();
		upimg.useMap = "#redian2";
	}
	if (zoom == 3 && signStop == 0)//--------------------3级
	{
		if (beforezoom == 1)
		{ changeleft = 253; changetop = 261; }
		else
		{ changeleft = 0; changetop = -130; }
		h1 = 9; h2 = 25; i1 = 47; i2 = 37;
		jia = 3;
		gongyong();
		upimg.useMap = "#redian3";
	}
	if (zoom == 4 && signStop == 0)//--------------------4级
	{
		if (beforezoom == 1)
		{ changeleft = 0; changetop = 255; }
		else
		{ changeleft = 0; changetop = 0; }
		h1 = 18, h2 = 51, i1 = 93, i2 = 73;
		jia = 4;
		gongyong();
		upimg.useMap = "#redian4";
	}
	function gongyong()//---------------------减少代码量分离共用代码--//
	{
		//----------------------------计算左和右的空出的行列数--//
		cellleft = maptab.offsetLeft / 256;
		rowtop = maptab.offsetTop / 256;

		if (cellleft % 1 == 0.5)//----------------再缩小的过程中会出项左边是0.5列或上边0.5行的情况，下面消掉这种情况
		{
			maptab.style.left = maptab.offsetLeft - 128 + 'px';
			cellleft -= 0.5;
		}
		if (rowtop % 1 == 0.5) {
			maptab.style.top = maptab.offsetTop - 128 + 'px';
			rowtop -= 0.5;
		}
		if (cellleft + cellnum >= h2 - h1 + 1 && cellnum < h2 - h1 + 1)//------放大缩小时候会出现cellleft或者rowtop和行列数加起来大于总行列数的情况，下面吧cellleft或rowtop减小消掉bug
		{ cellleft = h2 - h1 + 1 - cellnum; }
		if (rowtop + rownum >= i1 - i2 + 1 && rownum < i1 - i2 + 1)
		{ rowtop = i1 - i2 + 1 - rownum; }

		if (zoom == 2 && beforezoom == 0) {
			maptabTemp = document.createElement("table");//---------建立一个新的table
			map.appendChild(maptabTemp);
			for (n = 0; n < alltrnum; n++)//--------删除所有的表格行，清空表格-----//
			{ maptab.deleteRow(0); }
			display();
			map.style.left = map.offsetLeft + changeleft + 'px';
			map.style.top = map.offsetTop + changetop + 'px';
		}
		else {
			var maptabCopy = document.createElement("table");//---------建立一个新的table
			maptabCopy.style.border = "0px";
			maptabCopy.style.borderCollapse = "collapse";
			maptabCopy.style.borderSpacing = "0px";
			maptabCopy.style.position = "absolute";
			maptabCopy.style.zIndex = "11";
			maptabCopy.style.left = maptab.style.left;
			maptabCopy.style.top = maptab.style.top;
			map.appendChild(maptabCopy);
			maptabTemp = maptab;
			maptab = maptabCopy;

			display();
			map.style.left = map.offsetLeft + changeleft + 'px';
			map.style.top = map.offsetTop + changetop + 'px';

			maptabTemp.style.left = maptab.offsetLeft - changeleft + 'px';
			maptabTemp.style.top = maptab.offsetTop - changetop + 'px';
			if (beforezoom == 0) {
				maptabTemp.style.left = maptab.offsetLeft + cl * 128 + 'px';
				maptabTemp.style.top = maptab.offsetTop + rt * 128 + 'px';
			}
		}
		do { changetab(); }//先用一个changetab计算获取初始值，下面的while用来判断是否继续循环，继续循环补全出现的屏幕地图空缺
		while ((rowtop > 0 && tab_top >= 0) || (rowtop + rownum < i1 - i2 + 1 && tab_bottom >= 0) || (cellleft > 0 && tab_left >= 0) || (cellleft + cellnum < h2 - h1 + 1 && tab_right >= 0))
		//---------------缩放之后仍然保留搜索结果
	}
}
//---------------------------------缩放的时候移动的函数
function everywhere(x, y) {
	map.style.left = map.offsetLeft + x + 'px';
	map.style.top = map.offsetTop + y + 'px';
}

//-----------------------------------鼠标动作函数-按下，起来，移动----------------//
var mouseLocationx = [], mouseLocationy = [];
var scrolltemp = 0;
var scrollinterval = 1;
var Mdown = function () {
	downx = movex;//记录鼠标按下的坐标
	downy = movey;
	l = map.offsetLeft;
	t = map.offsetTop;
	//每次按下鼠标，记录鼠标坐标的数组清空
	mouseLocationx.length = 0;
	mouseLocationy.length = 0;
	//鼠标形状，按下后改变
	allmap.style.cursor = "url(signimage/d.cur),auto";
	ismouse = true;
	//----------------开始惯性移动
	if (scrollinterval != 0) {
		clearInterval(scrollinterval);
		scrollinterval = 0;
	}
	scrollinterval = setInterval(scrolllast, 7);
}
addEvent(document, "mousemove", function (ev)//移动
{
	var Event = ev || window.event;
	movex = Event.clientX;
	movey = Event.clientY;
	if (ismouse == true) {
		move(movex, movey);
	}
}
);
addEvent(document, "mouseup", function ()//鼠标抬起执行
{
	l = map.offsetLeft;
	t = map.offsetTop;
	ismouse = false;
	allmap.style.cursor = "url(signimage/n.cur),auto";//抬起后再次设置鼠标样式
}
);

function move(x, y)//-------------------------------仅在拖动的时候此函数有用,,移动函数
{
	map.style.left = x - downx + l + 'px';
	map.style.top = y - downy + t + 'px';
	changetab();//一边拖动一边补全屏幕地图空白
}
//----------------------补全屏幕地图空缺函数，用途广泛
var tab_bottom;
var tab_top;
var tab_left;
var tab_right;
function changetab() {
	//--------------计算left top bottom和right----//
	var map_bottom = map.offsetHeight + map.offsetTop - win_height;
	tab_bottom = (map.offsetHeight - maptab.offsetHeight - maptab.offsetTop) - map_bottom;
	tab_top = maptab.offsetTop + map.offsetTop;
	tab_left = maptab.offsetLeft + map.offsetLeft;
	var map_right = map.offsetWidth + map.offsetLeft - win_width;
	tab_right = (map.offsetWidth - maptab.offsetWidth - maptab.offsetLeft) - map_right;
	//----------------------------------------------------判断增加减少行列数----------//
	if (rowtop > 0 && tab_top >= 0) {
		tr = maptab.insertRow(0);//先在前面插上一行，再反复循环插上所有的列
		for (h = h1 + cellleft + cellnum - 1; h >= h1 + cellleft; h--)//------------top
		{
			td = tr.insertCell(0);
			td.width = "256px";
			td.height = "256px";
			img = document.createElement("img");
			td.appendChild(img);
			ai = i1 - rowtop + 1;
			img.src = "images" + jia + "/" + h + "-" + ai + ".gif";
		}
		maptab.style.top = maptab.offsetTop - 256 + 'px';//---添加一行之后移动表格
		maptab.deleteRow(-1);//前面添加了一行，后面删除最后一行
		rowtop--;//rowtop相应要减少1
	}
	if (rowtop + rownum < i1 - i2 + 1 && tab_bottom >= 0)//------------------bottom
	{
		tr = document.createElement("tr");
		tr.height = "256px";
		maptab.appendChild(tr);
		for (h = h1 + cellleft + cellnum - 1; h >= h1 + cellleft; h--) {
			td = tr.insertCell(0);
			td.width = "256px";
			td.height = "256px";
			img = document.createElement("img");
			td.appendChild(img);
			ai = i1 - rowtop - rownum;
			img.src = "images" + jia + "/" + h + "-" + ai + ".gif";
		}
		maptab.deleteRow(0);
		maptab.style.top = maptab.offsetTop + 256 + 'px';
		rowtop++;
	}
	if (cellleft > 0 && tab_left >= 0)//-----------------------------left
	{
		var h = 0;
		for (i = i1 - rowtop; i > i1 - rowtop - rownum; i--)//反复循环再每一行的最前面插上一列
		{
			td = alltr[h].insertCell(0);
			td.width = "256px";
			td.height = "256px";
			alltr[h].deleteCell(cellnum);
			h++;
			img = document.createElement("img");
			td.appendChild(img);
			ah = h1 + cellleft - 1;
			img.src = "images" + jia + "/" + ah + "-" + i + ".gif";
			img.alt = "images" + jia + "/" + ah + "-" + i + ".gif";
		}
		maptab.style.left = maptab.offsetLeft - 256 + 'px';
		cellleft--;
	}
	if (cellleft + cellnum < h2 - h1 + 1 && tab_right >= 0)//------------right
	{
		var h = 0;
		for (i = i1 - rowtop; i > i1 - rowtop - rownum; i--) {
			td = alltr[h].insertCell(-1);
			td.width = "256px";
			td.height = "256px";
			alltr[h].deleteCell(0);
			h++;
			img = document.createElement("img");
			td.appendChild(img);
			ah = h1 + cellleft + cellnum;
			img.src = "images" + jia + "/" + ah + "-" + i + ".gif";
			img.alt = "images" + jia + "/" + ah + "-" + i + ".gif";
		}
		maptab.style.left = maptab.offsetLeft + 256 + 'px';
		cellleft++;
	}
}
//-----------------------------地图控制的按钮函数-------------//
function more() {
	var hei = introductiontext.offsetHeight;
	introductiontext.style.height = "auto";
	windows.style.top = windows.offsetTop - (introductiontext.offsetHeight - hei) + 'px';
	mapControl("bottom", introductiontext.offsetHeight - hei - 50);
}
function mapControl(direction, num) {
	var x = 0;
	if (direction == "top") {
		var intervalt = setInterval(function subtop() {
			map.style.top = map.offsetTop - 3 + 'px';
			changetab();
			x++;
			if (x == 100) {
				x = 0;
				clearInterval(intervalt);
			}
		}, 1);
	}
	else if (direction == "right") {
		var intervalr = setInterval(function addleft() {
			map.style.left = map.offsetLeft + 3 + 'px';
			changetab();
			x++;
			if (x == 100) {
				x = 0;
				clearInterval(intervalr);
			}
		}, 1);
	}
	else if (direction == "bottom") {
		var intervalb = setInterval(function addtop() {
			map.style.top = map.offsetTop + Math.ceil(num / 100) + 'px';
			changetab();
			x++;
			if (x == 100) {
				x = 0;
				clearInterval(intervalb);
			}
		}, 1);
	}
	else if (direction == "left") {
		var intervall = setInterval(function subleft() {
			map.style.left = map.offsetLeft - 3 + 'px';
			changetab();
			x++;
			if (x == 100) {
				x = 0;
				clearInterval(intervall);
			}
		}, 1);
	}
}
function controlimg(state, direction) {
	if (state == "over")
	{ mapcontrol.style.backgroundPosition = "0px " + -(direction * 42 + direction * 2) + 'px'; }
	if (state == "out")
	{ mapcontrol.style.backgroundPosition = "0px 0px"; }
}
/*-------------------------------------------------------判断滚轮滚动方向 -----------------------//
* 函数：判断滚轮滚动方向  
* 参数：event
* 返回：滚轮方向 1：向上 -1：向下 
-*/
var scrollFunc = function (e) {
    var direct = 0;
    e = e || window.event;

    var chrome;
	var firefox;
	if (e.wheelDelta) {//IE/Opera/Chrome 
        chrome = e.wheelDelta;
    } else if (e.detail) {//Firefox 
        firefox = e.detail;
    }
	if (chrome == -120 || firefox == 3) {
		downx = movex;
		downy = movey;
		change("reduce");
	}
	if (chrome == 120 || firefox == -3) {
		downx = movex;
		downy = movey;
		change("boost");
	}
}
/*注册事件*/
if (document.addEventListener) {
    document.addEventListener('DOMMouseScroll', scrollFunc, false);
}//W3C 
window.onmousewheel = document.onmousewheel = scrollFunc;//IE/Opera/Chrome 

//---------------------------------------------------------------------惯性滚动函数----------------//
var scrolllast = function () {
	if (ismouse == true) {
		//---------------鼠标坐标记录函数，记录后最后10个来计算惯性和速度-----在鼠标按下利用setinterval 20秒记录一次-//
		if (mouseLocationx.length < 10 || mouseLocationy.length < 10) {
			mouseLocationx.unshift(movex);
			mouseLocationy.unshift(movey);
		}
		else {
			mouseLocationx.pop();
			mouseLocationy.pop();
		}
	}
	else {
		//首先计算鼠标后10次的差值
		var xlength = mouseLocationx.length;
		var ylength = mouseLocationy.length;
		var averagebeforex = (mouseLocationx[xlength - 1] - mouseLocationx[0]) / 10;
		var averagebeforey = (mouseLocationy[ylength - 1] - mouseLocationy[0]) / 10;
		//定义变量
		var xiaoshu = (20 - scrolltemp) / 20;
		var addleft = xiaoshu * averagebeforex;
		var addtop = xiaoshu * averagebeforey;
		map.style.left = -addleft + map.offsetLeft + 'px';
		map.style.top = -addtop + map.offsetTop + 'px';
		changetab();
		scrolltemp++;
		if (scrolltemp >= 20) {
			clearInterval(scrollinterval);
			scrollinterval = 1;
			scrolltemp = 0;
		}
	}
}
//--------------------------------------增加署名div---------------------------//
function signname() {
    var signdiv = document.createElement("div");
    allmap.appendChild = signdiv;
    signdiv.style.zIndex = 500;
    signdiv.innerText = "宋超";
	signdiv.style.position = "fixed";
	signdiv.style.right = "100px";
	signdiv.style.bottom = "100px";
	signdiv.style.width = "200px";
	signdiv.style.height = "200px";
	signdiv.style.background = "red";
}
//------------------------------------下面是事件添加函数----------------------------//

function addEvent(element,type,handler,useCapture){
	if(element["on"+type] === undefined){
		return new Error("事件类型错误");
	}
	if(useCapture === undefined){
		useCapture = false;
	}
	if(element.addEventListener){
		element.addEventListener(type,handler,useCapture);
		return;
	}

	if(element.attachEvent){
		element.attachEvent(type,handler,useCapture);
		return;
	}

	if(element["ev"+type] == undefined || !isArray(element["ev"+type])){
		element["ev"+type] = [];
	}

	element["ev"+type].push(handler);
	if(!element["on"+type]){
		element["on"+type] = function (event) {
			event = event || window.event;
			for (var i = 0; i < element["ev" + type].length; i++) {
				if (typeof element["ev" + type][i] == "function") {
					element["ev" + type][i](event);
				} else {
					console.error("事件执行中遇到参数不是function，无法执行此参数");
					console.error(element["ev"+type][i]);
				}
			}
		}
	}
}

function removeEvent(element, type, handler,useCapture) {
	if(element["on"+type] === undefined){
		return new Error("事件类型错误:"+type);
	}
	if(element.removeEventListener){
		element.removeEventListener(type,handler,useCapture);
		return;
	}
	if(element.detachEvent){
		element.detachEvent(type,handler);
		return;
	}
	if(element["ev"+type] && isArray(element["ev"+type])){
		for(var i=0;i<element["ev"+type].length;i++){
			if(element["ev"+type][i] === handler){
				element["ev"+type].split(i,1);
			}
		}
	}
}
