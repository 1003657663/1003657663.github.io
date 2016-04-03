/* 数据格式演示
 var aqiSourceData = {
 "北京": {
 "2016-01-01": 10,
 "2016-01-02": 10,
 "2016-01-03": 10,
 "2016-01-04": 10
 }
 };
 */

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = '';
    for (var i = 1; i < 92; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}

var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
    nowSelectCity: -1,
    nowGraTime: "day"
};

/**
 * 渲染图表
 */
function renderChart() {
    var main = document.getElementsByClassName("aqi-chart-wrap").item(0);
    main.innerHTML = "";
    var width = window.screen.width*0.8;
    var height = 500;
    var cityOp = document.getElementById("city-select").getElementsByTagName("option").item(pageState.nowSelectCity);
    var city = cityOp.innerHTML;

    var i=1;
    var h=0;
    for(tim in chartData[city][pageState.nowGraTime]){//计算子元素数量
        h++;
    }
    var liWidth = width/h*0.8;
    var pad = width/h*0.2;
    for(tim in chartData[city][pageState.nowGraTime]){
        var chil = document.createElement("div");
        chil.style.height = chartData[city][pageState.nowGraTime][tim] +'px';
        chil.style.width = liWidth+'px';
        //随机出现颜色
        var color = {
            r:parseInt(Math.random()*255),
            g:parseInt(Math.random()*255),
            b:parseInt(Math.random()*255)
        };
        chil.style.background = "rgb("+color.r+","+color.g+","+color.b+")";
        chil.style.left = (i-1)*(width/h) +'px';
        chil.style.marginLeft = pad/2 + 'px';
        chil.style.marginRight = pad/2 + 'px';
        chil.title = tim+"&"+chartData[city][pageState.nowGraTime][tim];
        showTitle(chil);
        i++;
        main.appendChild(chil);
    }
}

function showTitle(chil){
    var titleDiv = document.getElementById("show-title");
    switch (pageState.nowGraTime){
        case "day":
            chil.onmousemove = function(ev){
                titleDiv.style.display  = "block";
                titleDiv.style.left = ev.x+10+'px';
                titleDiv.style.top = ev.y-10+'px';
                titleDiv.getElementsByTagName("p").item(0).innerHTML = chil.title.split("&")[0];
                titleDiv.getElementsByTagName("p").item(1).innerHTML = "质量指数:"+chil.title.split("&")[1];
            };
            chil.onmouseout = function(){
                titleDiv.style.display = "none";
            };
            break;
        case "week":
            chil.onmousemove = function(ev){
                titleDiv.style.display  = "block";
                titleDiv.style.left = ev.x+10+'px';
                titleDiv.style.top = ev.y-10+'px';
                titleDiv.getElementsByTagName("p").item(0).innerHTML = "第"+chil.title.split("&")[0]+"周";
                titleDiv.getElementsByTagName("p").item(1).innerHTML = "质量指数:"+chil.title.split("&")[1];
            };
            chil.onmouseout = function(){
                titleDiv.style.display = "none";
            };
            break;
        case "month":
            chil.onmousemove = function(ev){
                titleDiv.style.display  = "block";
                titleDiv.style.left = ev.x+10+'px';
                titleDiv.style.top = ev.y-10+'px';
                titleDiv.getElementsByTagName("p").item(0).innerHTML = chil.title.split("&")[0]+"月份";
                titleDiv.getElementsByTagName("p").item(1).innerHTML = "质量指数:"+chil.title.split("&")[1];
            };
            chil.onmouseout = function(){
                titleDiv.style.display = "none";
            };
            break;
    }
}


/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(ev) {
    var clickInput = ev.target;
    // 确定是否选项发生了变化
    var isChange = false;
    if(clickInput.value != pageState.nowGraTime){
        isChange = true;
    }

    if(isChange){
        // 设置对应数据
        pageState.nowGraTime = clickInput.value;
        // 调用图表渲染函数
        renderChart();
    }
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange(ev) {
    var isChange = false;
    // 确定是否选项发生了变化
    if(ev.target.value != pageState.nowSelectCity){
        isChange = true;
    }

    if(isChange) {
        // 设置对应数据
        pageState.nowSelectCity = ev.target.value;
        // 调用图表渲染函数
        renderChart();
    }
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    var radios = document.getElementById("form-gra-time").getElementsByTagName("input");
    for(var i=0;i<radios.length;i++){
        radios.item(i).onclick = graTimeChange;
    }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    var city = document.getElementById("city-select");
    city.innerHTML = "";
    var cityOption = "";
    var i = 0;
    for(source in aqiSourceData){
        cityOption += "<option value='"+i+"'>"+source+"</option>"
        i++;
    }
    city.innerHTML = cityOption;
    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    var sel = document.getElementById("city-select");
    sel.onchange = citySelectChange;
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    // 将原始的源数据处理成图表需要的数据格式
    // 处理好的数据存到 chartData 中
    for(source in aqiSourceData){
        var location = source;//获取位置
        var monThis = 0;
        var sum = 0;
        var weekSum = 0;
        var i=0;//h，i是遍历标志
        var h=-1;
        var weekThis = 0;
        for(tim in aqiSourceData[source]) {//循环遍历当前位置下的日期信息
            //--------------------------------------------------月信息计算
            var month = tim.split("-")[1];//单独分离月份信息
            if(monThis!=month){//利用motemp判断是否遍历到了一个新的月份
                //遍历到一个新月份后，赋值，求和，上一月份平均数求
                if(sum!=0){//不等0说明已经遍历完一个月份
                    var average = sum/i;
                    chartData[location]["month"][monThis] = Math.round(average);
                    sum = aqiSourceData[source][tim];
                }else{//等于0说明第一次读取数据
                    sum+=aqiSourceData[source][tim];
                    i++;
                    chartData[location] = {};
                    chartData[location]["month"] = {};
                }
                monThis = month;
            }else{//遍历同一个月份
                sum +=aqiSourceData[source][tim];
                i++;//i代表遍历的数据量，求平均值用
            }
            //---------------------------------------------周信息计算
            //每7天一个周
            if(h==-1){//初始化week对象
                h=0;
                chartData[source]["week"] = {};
                chartData[source]["day"] = {};
            }
            h++;
            if(h%7 == 0){
                weekThis++;
                weekSum += aqiSourceData[source][tim];
                var average = weekSum/7;
                chartData[source]["week"][weekThis] = Math.round(average);
                weekSum = 0;
            }else{
                weekSum += aqiSourceData[source][tim];
            }

            //-----------------------------------天信息写入
            chartData[source]["day"][tim] = aqiSourceData[source][tim];
        }
        //位置信息遍历完之后，在这里进行最后一个月的赋值和计算
        var average = sum/i;
        chartData[location]["month"][monThis] = Math.round(average);
        if(h%7 != 0){
            var average = weekSum/(h%7);
            chartData[source]["week"][weekThis+1] = Math.round(average);
        }
    }
}

/**
 * 初始化函数
 */
function init() {
    initGraTimeForm();
    initCitySelector();
    initAqiChartData();
    pageState.nowSelectCity = 0;
    renderChart();
}

init();
