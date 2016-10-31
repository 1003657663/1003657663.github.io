//-----------------------------------------------------搜索
var searchInput;
var searchButton;
var input;
var searchi;
var searchImage=[];
var div=[];
var divWord=[];
var canvas;
var searchchange=0;
//------------------------------回车执行搜索
function enterSearch(e)
{
	searchchange=0;
	var keynum;
	var keychar;
	var numcheck;
	if(window.event) // IE
	{
		keynum = e.keyCode;
	}
	else if(e.which) // Netscape/Firefox/Opera
	{
		keynum = e.which;
	}
	if(keynum==13)
	{mapSearch();return false;}
	
}
function mapSearch()//--------搜索函数
{
	searchInput = document.getElementById("searchInput");
	searchButton = document.getElementById("searchButton");
	input = searchInput.value;
	mapSearchModule(input);
}
//----------------------判断是否有大些“一二三四”和小写1234------//
function transform(input)
{
	var numChina = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];
	var numUS = ["0","1","2","3","4","5","6","7","8","9"];
	var trans=input.split("");
	for(h=0;h<trans.length;h++)
		for(q=0;q<numUS.length;q++)
		{
			if(trans[h]==numUS[q])
				trans[h]=numChina[q];
			else if(trans[h]==numChina[q])
				trans[h]=numUS[q];
		}
	input=trans.join("");
	searchchange=1;
	return input;
}
function mapSearchModule(input)
{
	var temp,I;
	var tempSearch=0;
	var p=0;
	for(i=0;i<searchImage.length;i++)
	{
		map.removeChild(searchImage[i]);
	}
	searchImage.length=0;
	var trans=input.split("");
	
	for(searchi=1;searchi<198;searchi++)
	{
		if(objplace[searchi].placename)
		{
			if(objplace[searchi].placename.indexOf(input)>-1)
			{
				searchImage[p] = document.createElement("div");
				searchImage[p].style.position="absolute";
				searchImage[p].style.height="32px";
				searchImage[p].style.width="20px";
				searchImage[p].style.left=objplace[searchi].placex[zoom-1]-10+'px';
				searchImage[p].style.top=objplace[searchi].placey[zoom-1]-32+'px';
				searchImage[p].style.zIndex="99";
				searchImage[p].style.backgroundImage = "url(signimage/searchImage.png)";
				
				if(zoom==1)
				{searchImage[p].style.backgroundPosition = "0px -116px";}
				else if(p<10)
				{searchImage[p].style.backgroundPosition = -21.2*p+"px 0px";}
				else if(p<20&&p>=10)
				{searchImage[p].style.backgroundPosition = -21.2*(p-10)+"px -32px";}
				else
				{searchImage[p].style.backgroundPosition = "0px -116px";}
				map.appendChild(searchImage[p]);
				if(p==0)
				{temp=searchi;}
				p++;
			}
		}
	}
	if(searchImage.length==0)//-----------------------------如果字符串匹配找不到地点就用单字匹配
	{
		if(searchchange==0)//-------------------------------把搜索中的数字转换成大写数字，大写数字转换成数字后再搜索一遍直到找不到结果为止
			{mapSearchModule(transform(input));return}
		for(searchi=1;searchi<198;searchi++)
		{
			if(objplace[searchi].placename)
			{
				var numObjplace = objplace[searchi].placename.split("");;
				for(searchh=0;searchh<trans.length;searchh++)
				{
					for(searchm=0;searchm<numObjplace.length;searchm++)
					{
						if(numObjplace[searchm]==trans[searchh])
						{
							tempSearch++;
							break;
						}
					}
				}
				if(tempSearch>=trans.length)
				{
					searchImage[p] = document.createElement("div");
					searchImage[p].style.position="absolute";
					searchImage[p].style.height="32px";
					searchImage[p].style.width="20px";
					searchImage[p].style.left=objplace[searchi].placex[zoom-1]-10+'px';
					searchImage[p].style.top=objplace[searchi].placey[zoom-1]-32+'px';
					searchImage[p].style.zIndex="99";
					searchImage[p].style.backgroundImage = "url(signimage/searchImage.png)";
					
					if(zoom==1)
					{searchImage[p].style.backgroundPosition = "0px -116px";}
					else if(p<10)
					{searchImage[p].style.backgroundPosition = -21.2*p+"px 0px";}
					else if(p<20&&p>=10)
					{searchImage[p].style.backgroundPosition = -21.2*(p-10)+"px -32px";}
					else
					{searchImage[p].style.backgroundPosition = "0px -116px";}
					map.appendChild(searchImage[p]);
					if(p==0)
					{temp=searchi;}
					p++;
				}
				tempSearch=0;
			}
		}
	}
	if(searchImage.length==0)
	{
		if(searchImage.length==0)
			alert("未找到此地点,可以尝试减少关键字数再搜索");
	}
	else if(searchImage.length!=0)
	{movewhere(objplace[temp].placex[zoom-1],objplace[temp].placey[zoom-1]);}
}
//------------------------------------------------测距
function range()
{
	canvas = document.createElement("canvas");
	canvas.width = map.offsetWidth;
	canvas.height = map.offsetHeight;
	canvas.style.zIndex = "103";
	canvas.style.position = "absolute";
	canvas.style.left = "0px";
	canvas.style.top = "0px";
	map.appendChild(canvas);
	canvas.style.cursor = "url(signimage/range.cur),auto";
	var context = canvas.getContext("2d");
	var i=0;
	
	var divmove = document.createElement("div");
	divmove.style.position = "absolute";
	divmove.style.zIndex = "104";
	divmove.innerHTML = "<strong>单击确定起点</strong>";
	divmove.style.border = "#f00 solid 1px";
	divmove.style.padding = "5px";
	divmove.style.background = "#fff";
	map.appendChild(divmove);
	canvas.onmousemove = function()
	{
		divmove.style.left = movex-map.offsetLeft+30+'px';
		divmove.style.top = movey-map.offsetTop+'px';
	}
	
	canvas.onmousedown = function()
	{
		downx = movex;
		downy = movey;
	}
	var upx,upy;
	var long=0;
	canvas.onmouseup = function()
	{
		if(i==0&&movex==downx&&movey==downy)
		{
			context.beginPath();
			context.moveTo(movex-map.offsetLeft,movey-map.offsetTop);
			
			div[i] = document.createElement("div");
			div[i].style.position = "absolute";
			div[i].style.backgroundImage = "url(signimage/searchImage.png)";
			div[i].style.backgroundPosition = "-68px -116px";
			div[i].style.left = movex-map.offsetLeft-10+'px';
			div[i].style.top = movey-map.offsetTop-30+'px';
			div[i].style.width = "21px";
			div[i].style.height = "28px";
			div[i].style.zIndex = "102";
			map.appendChild(div[i]);
			
			divWord[i] = document.createElement("div");
			divWord[i].style.position = "absolute";
			divWord[i].style.left = movex-map.offsetLeft+10+'px';
			divWord[i].style.top = movey-map.offsetTop-10+'px';
			divWord[i].style.zIndex = "102";
			divWord[i].innerHTML = "<strong>起点</strong>";
			divWord[i].style.border = "#000 solid 1px";
			divWord[i].style.borderRadius = "5px";
			divWord[i].style.padding = "2px 5px 2px 5px";
			divWord[i].style.background="#fff";
			map.appendChild(divWord[i]);
			
			divmove.innerHTML = "<strong>再次单击选点</strong><br />双击结束";
			upx = downx;
			upy = downy;
			i++;
		}
		else if(i>0&&movex==downx&&movey==downy)
		{
			context.lineTo(movex-map.offsetLeft,movey-map.offsetTop);
			context.lineWidth = 2;
			context.strokeStyle = 'rgba(255,0,0,0.5)';
			context.stroke();
			div[i] = document.createElement("div");
			div[i].style.position = "absolute";
			div[i].style.backgroundImage = "url(signimage/searchImage.png)";
			div[i].style.backgroundPosition = "-68px -116px";
			div[i].style.left = movex-map.offsetLeft-10+'px';
			div[i].style.top = movey-map.offsetTop-30+'px';
			div[i].style.width = "21px";
			div[i].style.height = "28px";
			div[i].style.zIndex = "102";
			map.appendChild(div[i]); 
			long+= Math.sqrt((movex-upx)*(movex-upx)+(movey-upy)*(movey-upy))*(2.44/(728/Math.pow(2,zoom-1)));//(zoom*2);
			divWord[i] = document.createElement("div");
			divWord[i].style.position = "absolute";
			divWord[i].style.left = movex-map.offsetLeft+10+'px';
			divWord[i].style.top = movey-map.offsetTop-10+'px';
			divWord[i].style.zIndex = "102";
			divWord[i].innerHTML = "<strong>"+"<font color='red'>"+long.toFixed(2)+"</font>"+"公里"+"</strong>";
			divWord[i].style.border = "#000 solid 1px";
			divWord[i].style.borderRadius = "5px";
			divWord[i].style.padding = "2px 5px 2px 5px";
			divWord[i].style.background="#fff";
			map.appendChild(divWord[i]);
			
			upx = downx;
			upy = downy;
			i++;
		}
	};
	canvas.ondblclick = function canvasEnd()
	{
		divWord[i-1].innerHTML = "<strong>"+"总长："+"<font color='red'>"+long.toFixed(2)+"</font>"+"公里"+"</strong>";
		divWord[i-1].style.zIndex = "104";
		divWord[i-1].style.cursor = "auto";
		canvas.onmouseup = function(){};
		canvas.style.cursor = "auto";
		var canvasCloseImg = document.createElement("img");
		canvasCloseImg.src="signimage/close.png";
		canvasCloseImg.style.width="12px";
		canvasCloseImg.style.marginLeft="5px";
		canvasCloseImg.style.border="#000 solid 1px";
		canvasCloseImg.style.cursor = "pointer";
		divWord[i-1].appendChild(canvasCloseImg);
		map.removeChild(divmove);
		canvasCloseImg.onclick = function()
		{
			map.removeChild(canvas);
			canvas=undefined;
			for(h=0;h<div.length;h++)
			{
				map.removeChild(div[h]);
				map.removeChild(divWord[h]);
			}
		}
		long=0;
	}
}
function canvasClose()
{
	if(canvas)
	{
		map.removeChild(canvas);canvas=undefined;
		for(h=0;h<div.length;h++)
		{
			map.removeChild(div[h]);
			map.removeChild(divWord[h]);
		}
	}
}