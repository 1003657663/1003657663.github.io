/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var cityInput = document.getElementById("aqi-city-input");
    var valueInput = document.getElementById("aqi-value-input");
    var firstText = cityInput.value = cityInput.value.trim();
    var secondText = valueInput.value = valueInput.value.trim();
    if(check(firstText,secondText)){
        aqiData[firstText] = secondText;
    }
}
function check(text1,text2){//使用正则表达式检验输入正确性
    var re = /^[\u4e00-\u9fa5\u0041-\u005a\u0061-\u007a]+$/;
    if(!re.test(text1)){
        alert("城市名称需要是中文或者英文");
        return false;
    }
    re = /^[0-9]+$/;
    if(!re.test(text2)){
        alert("空气指数必须为整数");
        return false;
    }
    return true;
}
/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var tab = document.getElementById("aqi-table");
    var tableIn = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
    for(data in aqiData){
        tableIn+="<tr><td>"+data+"</td><td>"+aqiData[data]+"</td><td><button>删除</button></td></tr>";
    }
    tab.innerHTML = tableIn;

    var delButton = tab.getElementsByTagName("button");
    for(var i=0;i<delButton.length;i++) {
        delButton[i].onclick = delBtnHandle;
    }
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
var test;
function delBtnHandle() {
    // do sth.
    var parentTr = this.parentElement.parentElement;
    var cityName = parentTr.firstChild.innerText;
    delete aqiData[cityName];//删除
    renderAqiList();
}

function init() {

    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数

    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数

    var btn = document.getElementById("add-btn");
    btn.onclick = addBtnHandle;
}

init();




