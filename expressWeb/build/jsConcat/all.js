/**
 * 新增 获取 删除cookie
 */

function addCookie(name,value){   /**添加设置cookie**/
    var days = 30;
    var path = Url.header;
    var name = decodeURI(name);
    var value = decodeURI(value);
    var expires = new Date();  
    expires.setTime(expires.getTime() + days * 3600000 * 24);  
    //path=/，表示cookie能在整个网站下使用，path=/temp，表示cookie只能在temp目录下使用  
    path = path == "" ? "" : ";path=" + path;  
    //GMT(Greenwich Mean Time)是格林尼治平时，现在的标准时间，协调世界时是UTC  
    //参数days只能是数字型  
    var _expires = (typeof days) == "string" ? "" : ";expires=" + expires.toUTCString();  
    document.cookie = name + "=" + value + _expires + path;
}  
function getCookieValue(name){  /**获取cookie的值，根据cookie的键获取值**/  
    //用处理字符串的方式查找到key对应value  
    var name = decodeURI(name);
    //读cookie属性，这将返回文档的所有cookie  
    var allcookies = document.cookie;         
    //查找名为name的cookie的开始位置  
    name += "=";  
    var pos = allcookies.indexOf(name);      
    //如果找到了具有该名字的cookie，那么提取并使用它的值  
    if (pos != -1){                                             //如果pos值为-1则说明搜索"version="失败  
        var start = pos + name.length;                  //cookie值开始的位置  
        var end = allcookies.indexOf(";",start);        //从cookie值开始的位置起搜索第一个";"的位置,即cookie值结尾的位置  
        if (end == -1) end = allcookies.length;        //如果end值为-1说明cookie列表里只有一个cookie  
        var value = allcookies.substring(start,end); //提取cookie的值  
        return (decodeURI(value));                           //对它解码
    }else{  //搜索失败，返回空字符串  
        return "";  
    }  
}  
function deleteCookie(name,path){   /**根据cookie的键，删除cookie，其实就是设置其失效**/  
    var name = decodeURI(name);
    var expires = new Date(0);  
    path = path == "" ? "" : ";path=" + path;  
    document.cookie = name + "="+ ";expires=" + expires.toUTCString() + path;  
}
  


/**
 * Created by songchao on 16/6/18.
 */

var dialogList = {};//存储所有的dialog的id用于关闭
/*function closeAllDialog() {
 for (var key in dialogList) {
 $('#' + key).modal('hide');
 }
 }*/

function showDialog(dialogID, dialogHead, dialogContent, hasClose, closeFunction, hasSubmit, submitFunction, isNextClose) {
    if (isNextClose == undefined) {
        isNextClose = true;
    }
    if (dialogList[dialogID] != undefined) {
        dialogList[dialogID].setState({
            dialogID: dialogID,
            dialogHead: dialogHead,
            dialogContent: dialogContent,
            hasClose: hasClose,
            hasSubmit: hasSubmit,
            submitFunction: submitFunction,
            closeFunction: closeFunction,
            isNextClose: isNextClose,
        });
    } else {
        ReactDOM.render(
            React.createElement(Dialog, {
                dialogID: dialogID, 
                dialogHead: dialogHead, 
                dialogContent: dialogContent, 
                hasClose: hasClose, 
                closeFunction: closeFunction, 
                hasSubmit: hasSubmit, 
                submitFunction: submitFunction, 
                isNextClose: isNextClose}
            ), document.getElementById("dialog"));
    }
}
/**
 * 模态框--参数:id,标题,内容,是否有关闭按钮,按钮的值是什么,是否有提交按钮,提交按钮点击后的反应
 */
var Dialog = React.createClass({displayName: "Dialog",
    getDefaultProps: function () {
        return {hasSubmit: false}
    },
    getInitialState: function () {
        var config = {};
        config.dialogID = this.props.dialogID;
        config.dialogHead = this.props.dialogHead;
        config.dialogContent = this.props.dialogContent;
        config.hasClose = this.props.hasClose;
        for (key in config) {
            if (config[key] == undefined) {
                console.error("dialog 参数有空,请补全:" + key);
                return null;
            }
        }
        config.hasSubmit = this.props.hasSubmit;
        config.submitFunction = this.props.submitFunction;
        config.closeFunction = this.props.closeFunction;
        config.isNextClose = this.props.isNextClose;

        dialogList[this.props.dialogID] = this;
        return config;
    },
    componentDidMount: function () {
        $(this.refs.dialog).modal('show');
    },
    componentDidUpdate: function () {
        $(this.refs.dialog).modal('show');
    },
    handleClick: function (event) {
        if (this.state.closeFunction != undefined) {
            this.state.closeFunction();
        }
        $(".modal-backdrop").remove();
    },
    submitFunction: function () {
        if (this.state.submitFunction != undefined) {
            this.state.submitFunction();
        }
    },
    render: function () {
        var CloseButton = undefined;
        var SubmitButton = undefined;
        if (this.state.hasClose) {
            CloseButton =
                React.createElement("button", {type: "button", className: "btn btn-default", "data-dismiss": this.state.isNextClose?"modal":"", 
                        onClick: this.handleClick}, 
                    "确定");
        }
        if (this.state.hasSubmit) {
            SubmitButton =
                React.createElement("button", {type: "button", className: "btn btn-primary", onClick: this.state.submitFunction}, "提交");
        }
        return (
            //模态框（Modal）
            React.createElement("div", {ref: "dialog", className: "modal fade", id: this.props.dialogID, tabindex: "-1", role: "dialog", 
                 "aria-labelledby": "myModalLabel", "aria-hidden": "true"}, 
                React.createElement("div", {className: "modal-dialog"}, 
                    React.createElement("div", {className: "modal-content"}, 
                        React.createElement("div", {className: "modal-header"}, 
                            React.createElement("button", {type: "button", className: "close", "data-dismiss": "modal", "aria-hidden": "true"}, 
                                "×"
                            ), 
                            React.createElement("h4", {className: "modal-title", id: "myModalLabel"}, 
                                this.state.dialogHead
                            )
                        ), 
                        React.createElement("div", {className: "modal-body"}, 
                            this.state.dialogContent
                        ), 
                        React.createElement("div", {className: "modal-footer"}, 
                            CloseButton, 
                            SubmitButton
                        )
                    )
                )
            )
        );
    }
});


var Progress = React.createClass({displayName: "Progress",
    render: function () {
        return (
            React.createElement("div", {className: "progress_container"}, 
                React.createElement("img", {src: "../images/progress.png"})
            )
        );
    }
});

/**
 * 空组件
 */
var EmptyComponent = React.createClass({displayName: "EmptyComponent",
    render: function () {
        return null;
    }
});

function showProgress() {
    ReactDOM.render(
        React.createElement(Progress, null),
        document.getElementById("progress")
    )
    setTimeout(hideProgress, 3000);
}

function hideProgress() {
    ReactDOM.render(
        React.createElement(EmptyComponent, null),
        document.getElementById("progress")
    )
}
/**
 * Created by songchao on 16/6/15.
 */
var Tools = {
    //---------合并两个类2 ==> 1
    extend: function (obj1, obj2) {
        for (var key in obj2) {
            obj1[key] = obj2[key];
        }
        return obj1;
    },
    extendNoReplace: function (obj1, obj2) {
        for (var key in obj2) {
            if (obj1.hasOwnProperty(key))
                continue;
            obj1[key] = obj2[key];
        }
        return obj1;
    },

    isNum: function (num) {
        if (!isNaN(num)) {
            return true;
        } else {
            return false;
        }
    },
    myAjax: function (config, hasToken) {//data是对象类型
        var con = ["type", "url", "data", "success", "error"];
        for (var i = 0; i < con.length; i++) {
            if (config[con[i]] == undefined && i != 2) {
                console.error("myajax config 参数错误");
                return;
            }
        }

        var url = config[con[1]];
        if (config.url.substring(0, 4) != "http") {
            url = Url.header + config[con[1]];
        }
        var type = config[con[0]];
        var data = config[con[2]];
        var success = config[con[3]];
        var error = config[con[4]];

        if (User.isLogin) {
            if ((type == "get" || type == "GET")) {
                type = "get";
                if (hasToken != false) {
                    if (url.substring(url.length - 1, url.length) == '/') {
                        url = url + User.token;
                    } else {
                        url = url + "/" + User.token;
                    }
                }
            }
        }
        var dataType;
        if(config.dataType==undefined){
            dataType = "json";
        }else{
            dataType = config.dataType;
        }

        var RequestComplete = false;
        setTimeout(function () {
            if(RequestComplete == false) {
                showProgress();
            }
        }, 500);
        $.ajax({
            type: type,
            url: url,
            data: type=="get"?data:JSON.stringify(data),
            dataType: dataType,
            headers: {
                Accept: "application/json",
                //"Content-Type": "application/json",
            },
            success: function (data) {
                hideProgress();
                RequestComplete = true;
                success(data);
            },
            error: function (data) {
                hideProgress(data);
                RequestComplete = true;
                error(data);
            }
        });
    },
    classSet: function () {
        var result = "";
        for (var i = 0; i < arguments.length; i++) {
            if (typeof arguments[i] == "string") {
                result += " " + arguments[i];
            }
            if (Array.isArray(arguments[i])) {
                var ary = arguments[i];
                for (index in ary) {
                    result += " " + ary[index];
                }
            }
        }
        return result;
    }
};