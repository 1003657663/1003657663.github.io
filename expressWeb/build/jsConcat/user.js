/**
 * Created by songchao on 16/6/15.
 */
//$.support.cors = true;
var User = {
    isLogin:false,
    name:"",
    telephone:"",
    password:"",
    token:"",
    id:"",
    
    //用户组件
    UserInfo:"",
    //Navbar
    NavBar:"",
    //Main
    Main:"",

    cookieLogin:function () {
        if(getCookieValue("isLogin") == "true") {
            this.isLogin = getCookieValue("isLogin") == "true" ? true : false;
            this.name = getCookieValue("name");
            this.telephone = getCookieValue("telephone");
            this.password = getCookieValue("password");
            this.token = getCookieValue("token");
            this.id = getCookieValue("id");
        }
    },
    login:function (name, telephone, password, token, id) {
        this.isLogin = true;
        this.name = name;
        this.telephone = telephone;
        this.password = password;
        this.token = token;
        this.id = id;
        this.NavBar.setState({isLogin:true});
        this.UserInfo.setState({name:name,telephone:telephone,isLogin:true});

        addCookie("username", name);
        addCookie("token", token);
        addCookie("isLogin", "true");
        addCookie("telephone", telephone);
        addCookie("password",password);
        addCookie("id", id);
    },

    logout:function () {
        this.isLogin = false;
        this.name = "";
        this.telephone = "";
        this.id = "";
        this.password = "";
        this.token = "";
        this.UserInfo.setState({isLogin: false});
        this.NavBar.setState({name:"",telephone:"",isLogin: false});

        deleteCookie(["isLogin","name","telephone","id","password","token","UserInfo",
            "NavBar"
        ]);
    }
};


var Url = {
    //header:"http://10.101.242.35:8080"
    //header:"http://182.254.214.97:8080/ExTrace_Server"
    //header:"http://127.0.0.1:8080/ExTrace_Server"
    header:"http://139.129.24.149/ExTrace_Server"
};

//初始登录
User.cookieLogin();
/**
 * Created by songchao on 16/6/19.
 */

/**
 * 充满中间容器的,宽度100%的,p元素
 */
var FillWidthP = React.createClass({displayName: "FillWidthP",
    render: function () {
        var classes = Tools.classSet(
            'fill_width_margin_8',
            'width_all',
            this.props.className
        );
        return (
            React.createElement("p", {className: classes, style: this.props.style}, 
                React.Children.map(this.props.children,function (child) {
                    return child;
                })
            )
        )
    }
});
/**
 * 充满中间容器的,宽度100%的div元素
 */
var FillWidthDiv = React.createClass({displayName: "FillWidthDiv",
    render: function () {
        var classes = Tools.classSet(
            'fill_width_margin',
            'width_all',
            this.props.classNames
        );
        return (
            React.createElement("div", {className: classes, style: this.props.style}, 
                React.Children.map(this.props.children,function (child) {
                    return child;
                })
            )
        )
    }
});
/**
 * Created by songchao on 16/6/18.
 */

/**
 * 返回上一个界面的按钮
 */
var BeforeButton = React.createClass({displayName: "BeforeButton",
    propTypes:{
        onCloseClick:React.PropTypes.func
    },
    getInitialState: function () {
        return {mouseOn:false};
    },
    handleMouseOn: function () {
        this.setState({mouseOn:!this.state.mouseOn});
    },
    render: function () {
        var onSrc = "../images/index/close_on.png";
        var outSrc = "../images/index/close.png";
        return (
            React.createElement("div", {className: "row before_button"}, 
                React.createElement("img", {src: this.state.mouseOn?onSrc:outSrc, 
                      onMouseOver: this.handleMouseOn, onMouseOut: this.handleMouseOn, 
                        onClick: this.props.onCloseClick}
                )
            )
        );
    }
});
/**
 * Created by songchao on 16/6/14.
 */
/**
 * 姓名组件
 */
var NameLogin = React.createClass({displayName: "NameLogin",
    getInitialState: function () {
        return {nameText: ""}
    },
    handleNameChange: function (event) {
        var value = event.target.value;
        if (value.length > 20) {
            if (this.props.onError != null) {
                this.props.onError("姓名太长");
            }
        } else {
            this.props.onError("");
            this.setState({nameText: value});
            if (this.props.hanleChange != undefined) {
                this.props.hanleChange(value);
            }
        }
    },
    render: function () {
        return (
            React.createElement("input", {type: "text", value: this.state.nameText, className: "login_name", placeholder: "姓名", 
                   onChange: this.handleNameChange})
        );
    }
});
/**
 * 电话号组件
 */
var Tel = React.createClass({displayName: "Tel",
    getInitialState: function () {
        return {telephone: ""};
    },
    handleChange: function (event) {
        var telNum = event.target.value;
        if (Tools.isNum(telNum)) {
            if (telNum.length > 11) {
                this.props.onError("电话号长度11位");
            } else {
                this.props.onError("");
                if (this.props.handleChange != undefined) {
                    this.props.handleChange(telNum);
                }
                this.setState({telephone: telNum});
            }
        } else {
            if (this.props.onError != null) {
                this.props.onError("电话号必须是数字");
            }
        }

    },
    render: function () {
        return (
            React.createElement("div", null, 
                React.createElement("input", {type: "text", value: this.state.telephone, onChange: this.handleChange, placeholder: "电话号", 
                       className: "login_tel"})
            )
        );
    }
});

/**
 * 密码组件
 */
var Password = React.createClass({displayName: "Password",
    getInitialState: function () {
        return {password: ""};
    },
    handleChange: function (event) {
        if (this.props.handleChange != undefined) {
            this.props.handleChange(event.target.value);
        }
        this.setState({password: event.target.value});
    },
    render: function () {
        return (
            React.createElement("div", null, 
                React.createElement("input", {type: "password", placeholder: "密码", onChange: this.handleChange, value: this.state.password, 
                       className: "login_password"})
            )
        );
    }
});

/**
 * 关闭按钮
 */
var CloseButton = React.createClass({displayName: "CloseButton",
    getInitialState: function () {
        return {src: "../images/index/close.png"};
    },
    handleMouseOve: function () {
        this.setState({src: "../images/index/close_on.png"});
    },
    handleMouseOu: function () {
        this.setState({src: "../images/index/close.png"});
    },
    handleClick: function () {
        if (this.props.onClose != undefined) {
            this.props.onClose();
        }
    },
    render: function () {
        return (
            React.createElement("img", {className: "login_close", onClick: this.handleClick, onMouseOver: this.handleMouseOve, 
                 onMouseOut: this.handleMouseOu, src: this.state.src})
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

/**
 * 登陆组件
 */
var Login = React.createClass({displayName: "Login",
    getInitialState: function () {
        var temp;
        if (this.props.isLogin != undefined && this.props.isLogin == "true") {
            temp = {isLogin: true}
        } else {
            temp = {isLogin: false}
        }
        return Tools.extend(temp, {
            telephone: "", password: "", name: "",
            errorMessage: ""
        });
    },
    handleSubmitClick: function (event) {
        //这里开始登陆
        var config = {
            telephone: this.state.telephone,
            password: this.state.password,
            name: this.state.name
        };
        if (config.telephone.length != 11) {
            this.handleError("电话号码长度错误");
            return;
        }
        if(!this.state.isLogin && config.name == ""){
            this.handleError("必须输入名字");
            return;
        }
        if(config.password <6){
            this.handleError("密码长度不对");
            return;
        }
        startLogin(this, config, this.state.isLogin, this.onSuccess);
    },
    handleSubmitStart: function (event) {
        event.preventDefault();
    },
    handleToRegister: function () {
        ReactDOM.render(
            React.createElement(Login, {isLogin: "false", key: "noLogin"}),
            document.getElementById("login_container")
        );
    },
    handleError: function (message) {
        this.setState({errorMessage: message});
    },
    onClose: function () {
        ReactDOM.render(React.createElement(EmptyComponent, null), document.getElementById("login_container"));
    },
    onSuccess: function () {
        ReactDOM.render(
            React.createElement(Content, {update: true}),
            document.getElementById("content")
        );
        this.onClose();
    },
    //回收参数
    handleTelChange: function (telephone) {
        this.setState({telephone: telephone});
    },
    handlePasswordChange: function (password) {
        this.setState({password: password});
    },
    handleNameChange: function (name) {
        this.setState({name: name});
    },
    render: function () {
        var h3Style = {textAlign: "center", width: "100%", paddingBottom: "10px"};
        var aStyle = {color: "#2aabd2"};
        var errorStyle = {color: "red"};
        var nameCom;
        var head = "登陆";
        if (this.state.isLogin) {
            nameCom = undefined;
        } else {
            nameCom = React.createElement(NameLogin, {hanleChange: this.handleNameChange, onError: this.handleError});
            head = "注册";
        }
        return (
            React.createElement("form", {onSubmit: this.handleSubmitStart, method: "get", className: "login_window"}, 
                React.createElement(CloseButton, {onClose: this.onClose}), 
                React.createElement("h3", {style: h3Style}, head), 
                React.createElement(Tel, {handleChange: this.handleTelChange, onError: this.handleError}), 
                nameCom, 
                React.createElement(Password, {handleChange: this.handlePasswordChange, onError: this.handleError}), 
                React.createElement("div", null, React.createElement("input", {type: "button", className: "login_submit", onClick: this.handleSubmitClick, defaultValue: "提交"})
                ), 
                React.createElement("p", null, "还没有账号?", React.createElement("a", {href: "#", onClick: this.handleToRegister, style: aStyle}, "注册新账号")), 
                React.createElement("p", {style: errorStyle}, this.state.errorMessage)
            )
        );
    }
});

function startLogin(props, config, isLogin, onSuccess) {
    if (isLogin) {//-------登陆
        var url = "/REST/Domain/login";

        Tools.myAjax({
            type: "post",
            url:url,
            data: {telephone: config.telephone, password: config.password},
            success: function (data) {
                if (data.loginstate == 'true') {
                    doSuccess(data);
                    showDialog("dialog", "恭喜", "登陆成功", true, onSuccess);

                } else if (data.loginstate == "deny") {
                    showDialog("dialog", "警告", "电话号码长度错误", true);
                } else if (data.loginstate == 'null') {
                    showDialog("dialog", "警告", "请填写完整登陆信息", true);
                } else {
                    showDialog("dialog", "警告", "登陆失败,请重试", true);
                }
            }.bind(props),
            error: function (data) {
                console.error(data);
                showDialog("dialog", "警告", "登陆失败" + data.state(), true);

            }.bind(props)
        });
    } else {//------注册
        var url = "/REST/Domain/register";

        Tools.myAjax({
            type: "post",
            url:url,
            data: {telephone: config.telephone, password: config.password, name: config.name},
            success: function (data) {
                if (data.registerstate == 'true') {
                    doSuccess(data);
                    showDialog("dialog", "恭喜", "注册成功", true, onSuccess);
                } else if (data.registerstate == 'deny') {
                    showDialog("dialog", "警告", "手机号已经注册过,请登录");
                } else if (data.registerstate == 'null') {
                    showDialog("dialog", "警告", "请填写完整登陆信息", true);
                } else {
                    showDialog("dialog", "警告", "注册失败", true);
                }
            }.bind(props),
            error: function (data) {
                console.error(data);
                showDialog("dialog", "警告", "注册失败", true);
            }.bind(props)
        });
    }

    function doSuccess(data) {
        var name = data.name;
        if (data.name == undefined) {
            name = config.name;
        }
        User.login(name, config.telephone, config.password, data.token, data.id);

    }
}
/**
 * Created by songchao on 16/6/21.
 */

var SearchResult = React.createClass({displayName: "SearchResult",
    getInitialState: function () {
        var config = {};
        config.mapicon = "../images/search/mapicon.png";
        return config;
    },
    onCloseClick: function () {
        User.Main.onCloseClick([true]);//传入true参数,默认跳转到Main本身页面
    },
    iconOn: function () {
        this.setState({mapicon:"../images/search/mapicon_on.png"});
    },
    iconOut: function () {
        this.setState({mapicon:"../images/search/mapicon.png"});
    },
    iconClick: function () {
        Tools.myAjax({
            type:"get",
            url:"/REST/Domain/getSendEmployeesInfos/"+this.props.searchID,
            success: function (data) {
                if(data.length == 0){
                    showDialog("dialog","警告","没有轨迹点信息",true);
                    return;
                }
                showBaiduMap(data);
            },
            error: function (data) {
                console.error(data);
            }
        })
    },
    render: function () {
        return (
            React.createElement("div", {className: "address_container"}, 
                React.createElement("div", {key: "searchHead", className: "row address_head"}, 
                    React.createElement("span", {key: "headspan"}, this.props.searchID, "的物流信息"), 
                    React.createElement("img", {key: "headicon", title: "实时轨迹地图", onClick: this.iconClick, onMouseOver: this.iconOn, onMouseOut: this.iconOut, className: "address_add_img", src: this.state.mapicon})
                ), 
                this.props.searchResult.map(function (data, index) {
                     return React.createElement("p", {key: index}, data.info)
                }), 
                React.createElement(BeforeButton, {key: "searchbeforebutton", onCloseClick: this.onCloseClick})
            )
        );
    }
});
/**
 * Created by songchao on 16/6/15.
 */
/**
 * 搜索框
 */
var SearchInput = React.createClass({displayName: "SearchInput",
    getInitialState: function () {
        return {value: ""};
    },
    handleClick: function () {
        var id = this.state.value;
        if (id.length < 11 || isNaN(id)) {
            showDialog("dialog", "警告", "快递单号错误", true);
            return;
        }
        //----这里执行网络操作---ajax---
        Tools.myAjax({
            type: "get",
            url: "/REST/Domain/getExpresslogisticsInfosByExpressId/" + this.state.value,
            success: function (data) {
                if (data.length == 0) {
                    showDialog("dialog", "警告", "您查的快递号还没有物流信息",true);
                    return;
                }
                                                      
                User.Main.setState({
                    child: [
                        React.createElement(UserInfo, {key: "userinfo"}),
                        React.createElement(SearchResult, {key: "searchresult", searchID: id, searchResult: data}),
                    ]
                });
            },
            error: function (data) {
                console.error(data);
            }
        })
    },
    handleInputChange: function (event) {
        var inputValue = event.target.value;
        if (!isNaN(inputValue)) {
            this.setState({value: inputValue});
        }
    },
    onKeyDown: function (e) {
        if (e.which == 13) {
            this.handleClick();
            e.preventDefault();
        }
    },
    render: function () {
        return (
            React.createElement("form", {className: "searchForm", method: "get", onKeyPress: this.onKeyDown}, 
                React.createElement("span", null, 
                    React.createElement("img", {src: "../images/searchIcon.png", width: "15px", height: "15px", className: "searchIcon", 
                         onClick: this.handleClick})
                ), 
                React.createElement("input", {type: "text", className: "searchInput", value: this.state.value, placeholder: "搜索", 
                       onChange: this.handleInputChange})
            )
        );
    }
});

/**
 * 左边商标
 */
var LeftBrand = React.createClass({displayName: "LeftBrand",
    render: function () {
        return (
            React.createElement("div", {className: "brand_container"}, 
                React.createElement("div", {className: "brandicon_container"}, 
                    React.createElement("img", {src: "../images/github-pure.png", className: "brand_icon"})
                ), 
                React.createElement("p", {className: "brand_name"}, "快递吧")
            )
        );
    }
});

/**
 * 右边登录注册按钮
 */
var LoginAndReg = React.createClass({displayName: "LoginAndReg",
    getInitialState: function () {
        User.NavBar = this;
        return {isLogin: User.isLogin}
    },
    handleLoginClick: function () {
        ReactDOM.render(
            React.createElement(Login, {isLogin: "true", key: "isLogin"}),
            document.getElementById("login_container")
        );
    },
    handleLogout: function () {
        //注销
        User.logout();
        User.Main.onCloseClick([true]);
    },
    render: function () {
        var chil;
        if (this.state.isLogin) {
            chil =
                (React.createElement("a", {href: "#", onClick: this.handleLogout}, 
                    React.createElement("span", {className: "glyphicon glyphicon-user"}), 
                    "注销"
                ));
        } else {
            chil =
                (React.createElement("a", {href: "#", onClick: this.handleLoginClick}, 
                    React.createElement("span", {className: "glyphicon glyphicon-user"}), 
                    "登录"
                ));
        }
        return (
            React.createElement("div", {className: "loginAndReg"}, 
                chil
            )
        );
    }
});

/**
 * 顶部导航栏
 */
var NavBar = React.createClass({displayName: "NavBar",
    render: function () {
        return (
            React.createElement("nav", {className: "nav_bar"}, 
                React.createElement(LeftBrand, null), 
                React.createElement(SearchInput, null), 
                React.createElement(LoginAndReg, null)
            )
        );
    }
});
/**
 * Created by songchao on 16/6/16.
 */

var Footer = React.createClass({displayName: "Footer",
    onAboutClick:function () {
        var child = [
            React.createElement(UserInfo, {key: "userinfo"}),
            React.createElement(AboutOus, {key: "aboutous", onCloseClick: this.props.onCloseClick})
        ];
        this.props.onCloseClick(child);
    },
    render: function () {
        return (
            React.createElement("div", {className: "row footer"}, 
                React.createElement("ul", null, 
                    React.createElement("li", {className: "point", onClick: this.onAboutClick}, "关于我们"), 
                    React.createElement("li", {className: "point", onClick: this.onAboutClick}, "隐私")
                )
            )
        );
    }
});
/**
 * Created by songchao on 16/6/18.
 */


/**
 * 寄快递页面,,,待实现---wait---重新选择地址
 */
var SendExpressComponent = React.createClass({displayName: "SendExpressComponent",
    propTypes: {
        onClose:React.PropTypes.func,
        sendAddress:React.PropTypes.object,
        receiveAddress:React.PropTypes.object,
    },
    handleSubmitClick: function () {
        Tools.myAjax({
            type:"get",
            url:"/REST/Domain/prepareSendExpress/customerId/"+
                User.id+"/sendAddressId/"+this.props.sendAddress.aid +
                "/recAddressId/"+this.props.receiveAddress.aid,
            success: function (data) {
                if(data.state!=undefined){
                    showDialog("dialog","恭喜","寄快递成功\r\n单号请记好:"+data.state,true,this.props.onClose);
                }else{
                    showDialog("dialog","警告","寄快递失败,请重试",true);
                }
            }.bind(this),
            error: function (data) {
                console.error({"提交快递数据错误":data});
            }.bind(this)
        })
    },
    render: function () {
        var sendAddress = this.props.sendAddress;
        var receiveAddress = this.props.receiveAddress;
        var headStyle = {background:"#cc3c14"};
        return (
            React.createElement("div", null, 
                React.createElement("div", {key: "head", className: "row address_head", style: headStyle}, 
                    React.createElement("span", null, "寄快递")
                ), 
                React.createElement("div", {key: "smallheadsend", className: "small_head_title"}, "发件人信息"), 
                React.createElement("div", null, 
                    React.createElement(FillWidthP, null, "姓名:", sendAddress.name), 
                    React.createElement(FillWidthP, null, "电话:", sendAddress.telephone), 
                    React.createElement(FillWidthP, null, "地址:", sendAddress.province+sendAddress.city+sendAddress.region), 
                    React.createElement(FillWidthP, null, "详细地址:", sendAddress.address)
                ), 
                React.createElement("div", {key: "smallheadreceive", className: "small_head_title"}, "收件人信息"), 
                React.createElement("div", null, 
                    React.createElement(FillWidthP, null, "姓名:", receiveAddress.name), 
                    React.createElement(FillWidthP, null, "电话:", receiveAddress.telephone), 
                    React.createElement(FillWidthP, null, "地址:", receiveAddress.province+receiveAddress.city+receiveAddress.region), 
                    React.createElement(FillWidthP, null, "详细地址:", receiveAddress.address)
                ), 
                React.createElement("input", {key: "sendexpresssubmit", onClick: this.handleSubmitClick, type: "button", value: "提交快件信息", className: "login_submit"})
            )
        );
    }
});
/**
 * Created by songchao on 16/6/18.
 */


/**
 * 单个历史记录item
 */
var ExpressHistoryItem = React.createClass({displayName: "ExpressHistoryItem",
    propTypes: {
        itemClick: React.PropTypes.func,
    },
    handleItemClick: function () {
        this.props.itemClick(this.props);
    },
    render: function () {
        return (
            React.createElement("div", {className: "history_item", onClick: this.handleItemClick}, 
                React.createElement("p", null, "单号:", this.props.ID), 
                React.createElement(FillWidthDiv, {classNames: ["display-table"]}, 
                    React.createElement("span", {className: "float_left"}, 
                        "发件人:", this.props.sname
                    ), 
                    React.createElement("span", {className: "float_right"}, 
                        "发件时间:", this.props.outTime == "null" || this.props.outTime == undefined ? "未揽收" : this.props.outTime
                    )
                ), 
                React.createElement("div", {className: "clearfix"}), 
                React.createElement("div", {className: "fill_width_margin_5 display-table width_all"}, 
                    React.createElement("span", {className: "float_left"}, 
                        "收件人:", this.props.rname
                    ), 
                    React.createElement("span", {className: "float_right"}, 
                        "收件时间:", this.props.getTime == "null" || this.props.getTime == undefined ? "未签收" : this.props.getTime
                    )
                ), 
                React.createElement("div", {className: "clearfix"})
            )
        );
    }
});


var HistoryContainer = React.createClass({displayName: "HistoryContainer",
    getDefaultProps: function () {
        return null;
    },
    propTypes: {
        isSend: React.PropTypes.bool,
        headText: React.PropTypes.string,
        historyList: React.PropTypes.array,
        itemClick: React.PropTypes.func,
    },
    getInitialState: function () {
        var config = {};
        if (this.props.historyList == undefined) {
            console.error("历史数据有误,list为undefined");
            return;
        }
        return config;
    },
    render: function () {
        var style = {marginLeft: "10px", marginRight: "10px"};
        return (
            React.createElement("div", {className: "row"}, 
                React.createElement("p", {className: "address_head"}, this.props.headText), 
                this.props.historyList.length == 0 ?
                    (React.createElement(FillWidthP, {style: style}, "无", this.props.headText)) : "", 
                
                this.props.historyList.map(function (history, index) {
                    return (
                        React.createElement(ExpressHistoryItem, React.__spread({
                            key: "historyitem"+index}, 
                            history, 
                            {itemClick: this.props.itemClick
                        })
                        )
                    )
                }.bind(this))
            )
        );
    }
});

/**
 * 历史详情页面
 */
var HistoryDetail = React.createClass({displayName: "HistoryDetail",
    render: function () {
        return (
            React.createElement("div", null, 
                React.createElement(FillWidthP, null, 
                    "快递单号:", this.props.ID
                ), 
                React.createElement(FillWidthP, null, 
                    "收件人:", this.props.rname
                ), 
                React.createElement(FillWidthP, null, 
                    "收件人电话:", this.props.rtel
                ), 
                React.createElement(FillWidthP, null, 
                    "收件人地址:", this.props.radd
                ), 
                React.createElement(FillWidthP, null, 
                    "签收时间:", this.props.getTime == "null" || this.props.getTime == undefined ? "未签收" : this.props.getTime
                ), 
                React.createElement(FillWidthP, null, 
                    "发件人姓名:", this.props.sname
                ), 
                React.createElement(FillWidthP, null, 
                    "发件人电话号:", this.props.stel
                ), 
                React.createElement(FillWidthP, null, 
                    "发件人地址:", this.props.sadd
                ), 
                React.createElement(FillWidthP, null, 
                    "发件时间:", this.props.outTime == "null" || this.props.outTime == undefined ? "未揽收" : this.props.outTime
                ), 
                React.createElement(FillWidthP, null, 
                    "快件重量:", this.props.weight + "Kg"
                ), 
                React.createElement(FillWidthP, null, 
                    "费用:", this.props.tranFee + "元"
                )
            )
        )
    }
});


/**
 * 历史记录整体,容器
 */
var ExpressHistotyComponent = React.createClass({displayName: "ExpressHistotyComponent",
    getInitialState: function () {
        return {
            addressList: [],
            historyReceiveList: [],
            historySendList: [],
            child: gethistoryComponentChild(this, [], []),
        }
    },

    componentDidMount: function () {
        //获取收件记录
        var sendOK = false;
        var receiveOk = false;
        Tools.myAjax({
            type: "get",
            url: "/REST/Domain/getRercvExpressInfoByCustomerId/" + User.id,
            success: function (data) {
                receiveOk = true;
                this.state.historyReceiveList = data;
                if (sendOK && this.isMounted()) {
                    this.setState({
                        child: gethistoryComponentChild(this, this.state.historyReceiveList, this.state.historySendList)
                    });
                }
            }.bind(this),
            error: function (data) {
                console.error(data);
                showDialog("dialog", "警告", "获取历史收件数据出错", true);
            }.bind(this)
        });
        //获取发件记录
        Tools.myAjax({
            type: "get",
            url: "/REST/Domain/getSendExpressInfoByCustomerId/" + User.id,
            success: function (data) {
                sendOK = true;
                this.state.historySendList = data;
                if (receiveOk && this.isMounted()) {
                    this.setState({
                        child: gethistoryComponentChild(this, this.state.historyReceiveList, this.state.historySendList)
                    });
                }
            }.bind(this),
            error: function () {
                console.error(data);
                showDialog("dialog", "警告", "获取历史发件数据出错", true);
            }.bind(this)
        });
    },
    handleHistoryItemClick: function (pro) {
        this.setState({
            child: [
                React.createElement(HistoryDetail, React.__spread({key: "historydetail"},  pro))
            ]
        });
    },
    handleCloseClick: function () {
        this.props.onCloseClick([true]);
    },
    render: function () {
        return (
            React.createElement("div", {className: "address_container"}, 
                this.state.child, 
                React.createElement(BeforeButton, {onCloseClick: this.handleCloseClick, key: "beforebutton"})
            )
        );
    }
});

/**
 * 返回历史记录的容器元素,通过给定参数,传入list
 * @param the
 * @param historyReceiveList
 * @param historySendList
 * @returns {XML[]}
 */
function gethistoryComponentChild(the, historyReceiveList, historySendList) {
    return [
        React.createElement(HistoryContainer, {
            itemClick: the.handleHistoryItemClick, 
            historyList: historyReceiveList, 
            headText: "收件历史", 
            isSend: false, 
            key: "receivehistory"}
        ),

        React.createElement(HistoryContainer, {
            itemClick: the.handleHistoryItemClick, 
            historyList: historySendList, 
            headText: "发件历史", 
            isSend: true, 
            key: "sendhistory"}
        )
    ]
}
/**
 * Created by songchao on 16/6/19.
 */

var BeautifulSelect = React.createClass({displayName: "BeautifulSelect",
    render: function () {
        return (
            React.createElement("div", null)
        );
    }
});

var EditAddressComponent = React.createClass({displayName: "EditAddressComponent",
    statics: {
        Address: {
            regionId: "",
            address: "",
            customerId: "",
            name: "",
            telephone: "",
            rank: "",
            status: ""
        }
    },
    propTypes: {
        isSend: React.PropTypes.bool,
        isNew: React.PropTypes.bool,
    },
    getInitialState: function () {
        return {
            placeholderName: this.props.isSend ? "发件人姓名" : "收件人姓名",
            placeholderTel: this.props.isSend ? "发件人电话号" : "收件人电话号",
            headText: this.props.isSend ? "编辑发件人地址" : "编辑收件人地址",
            errorMessage: "",
            isDefault: this.props.addressRank == 0 ? true : false,
            
            nameValue: this.props.isNew ? "":this.props.addressUserName,
            telephoneValue: this.props.isNew?"":this.props.addressTelephone,
            detailValue: this.props.isNew?"":this.props.addressDetail,
            province: [],
            city: [],
            area: [],
        }
    },
    componentDidMount: function () {
        if (!this.props.isNew) {
            getStartValue(this, this.props.province, this.props.city, this.props.region);
        } else {
            Tools.myAjax({
                type: "get",
                url: "/REST/Misc/getAllProvince",
                success: function (message) {
                    var provinces = [];
                    for (var key in message) {
                        provinces.push(message[key]);
                    }
                    this.setState({province: provinces});
                }.bind(this),
                error: function () {

                }.bind(this)
            });
        }
    },
    handleProvinceChange:function(event){
        var value = event.target.value;
        this.setState({provinceValue: value});
        //获取城市
        Tools.myAjax({
            type: "get",
            url: "/REST/Misc/getCityList/" + value,
            success: function (message) {
                var citys = [];
                for (var key in message) {
                    citys.push(message[key]);
                }
                this.setState({city: citys});
            }.bind(this),
            error: function () {

            }.bind(this)
        })
    },
    handleCityChange:function(event){
        var value = event.target.value;
        this.setState({cityValue: value});
        //获取区域
        Tools.myAjax({
            type: "get",
            url: "/REST/Misc/getRegionList/" + value,
            success: function (message) {
                var areas = [];
                for (var key in message) {
                    areas.push(message[key]);
                }
                this.setState({area: areas});
            }.bind(this),
            error: function () {

            }.bind(this)
        })
    },
    handleAreaChange:function(event){
        var value = event.target.value;
        this.setState({areaValue: value});
    },
    handleSubmitClick: function () {
        var Address = EditAddressComponent.Address;
        Address.address = this.state.detailValue + "";
        Address.name = this.state.nameValue + "";
        Address.telephone = this.state.telephoneValue + "";

        var rank = this.state.isDefault ? 0 : 1;
        if (this.props.addressRank == 0) {
            rank = 0;
        }
        Address.rank = rank;
        if(!this.props.isNew) {
            Address.id = parseInt(this.props.aid);
        }
        Address.regionId = parseInt(this.state.areaValue);
        Address.customerId = parseInt(User.id);

        var status;
        if (this.props.isSend) {
            status = 1;
        } else {
            status = 2;
        }
        Address.status = status;

        var url = this.props.isNew? "/REST/Misc/newAddress":"/REST/Misc/updateAddress";
        Tools.myAjax({
            type: "post",
            url: url,
            data: Address,
            success: function (data) {
                if(this.props.isNew){//如果是新建地址
                    if(data.newAddstate == "true"){
                        showDialog("dialog", "恭喜", "地址新增成功", true, this.onSubmitSuccess);
                    }else{
                        showDialog("dialog", "警告", "地址新增失败,请重试", true);
                    }
                }else {
                    if (data.updateAddstate == "true") {
                        showDialog("dialog", "恭喜", "地址更新成功", true, this.onSubmitSuccess);
                    } else {
                        showDialog("dialog", "警告", "地址更新失败,请重试", true);
                    }
                }
            }.bind(this),
            error: function (data) {
                console.error(data);
                showDialog("dialog", "警告", "地址提交失败,请重试", true);
            }.bind(this)
        })
    },
    onSubmitSuccess: function () {
        this.props.onAddressSubmitSuccess();
    },
    handleNameChange: function (e) {
        var value = e.target.value;
        this.setState({nameValue: value});
    },
    handleTelChange: function (e) {
        var value = e.target.value;
        if (value.length > 11) {
            this.setState({errorMessage: "电话号不能大于11位"});
        } else {
            this.setState({errorMessage: "", telephoneValue: value});
        }
    },
    handleDetailChange: function (e) {
        var value = e.target.value;
        this.setState({detailValue: value});
    },
    defaultChange: function (e) {
        if (this.state.isDefault) {
            this.setState({isDefault: false});
        } else {
            this.setState({isDefault: true});
        }
    },
    render: function () {
        var style = {width: "33%"};
        var pStyle = {textAlign: "center"};
        var divStyle = {textAlign: "right"};
        return (
            React.createElement("form", {className: "padding-l-r-20"}, 
                React.createElement("p", {key: "p1", className: "address_head"}, this.state.headText), 
                React.createElement("input", {key: "input1", type: "text", onChange: this.handleNameChange, value: this.state.nameValue, 
                       className: "login_name", placeholder: this.state.placeholderName}), 
                React.createElement("input", {key: "input2", type: "text", onChange: this.handleTelChange, value: this.state.telephoneValue, 
                       className: "login_name", placeholder: this.state.placeholderTel}), 

                React.createElement("select", {key: "select1", style: style, onChange: this.handleProvinceChange, 
                        value: this.state.provinceValue, className: "form-control float_left"}, 
                    React.createElement("option", {value: "-1"}, "选择省"), 
                    this.state.province.map(function (data, index) {
                        return React.createElement("option", {key: index, value: data.pid}, data.pname)
                    })
                ), 
                React.createElement("select", {key: "select2", style: style, onChange: this.handleCityChange, value: this.state.cityValue, 
                        className: "form-control float_left"}, 
                    React.createElement("option", {key: "-1", value: "-1"}, "选择市"), 
                    this.state.city.map(function (data, index) {
                        return React.createElement("option", {key: index, value: data.cid}, data.cname)
                    })
                ), 
                React.createElement("select", {key: "select3", style: style, onChange: this.handleAreaChange, value: this.state.areaValue, 
                        className: "form-control float_left"}, 
                    React.createElement("option", {key: "-1", value: "-1"}, "选择区"), 
                    this.state.area.map(function (data, index) {
                        return React.createElement("option", {key: index, value: data.id}, data.area)
                    })
                ), 

                React.createElement("div", {className: "clearfix"}), 
                React.createElement("input", {key: "input3", type: "text", onChange: this.handleDetailChange, value: this.state.detailValue, 
                       className: "login_name", placeholder: "详细地址"}), 
                this.props.addressRank == 0 ? "" :
                    (
                        React.createElement(FillWidthDiv, {key: "div1", style: divStyle}, 
                            React.createElement("label", null, React.createElement("input", {key: "input5", checked: this.state.isDefault, onChange: this.defaultChange, 
                                          type: "radio"}), "设为默认")
                        )
                    ), 
                
                React.createElement("input", {key: "input4", type: "button", onClick: this.handleSubmitClick, className: "login_submit", value: "提交"}), 
                React.createElement(FillWidthP, {key: "p2", style: pStyle}, this.state.errorMessage), 

                React.createElement(BeforeButton, {onCloseClick: this.props.onEditClose})
            )
        );
    }

});

function getStartValue(the, province, city, area) {
    var provinceKey;
    var cityKey;
    var areaKey;

    Tools.myAjax({
        type: "get",
        url: "/REST/Misc/getAllProvince",
        success: function (message) {
            var provinces = [];
            for (var key in message) {
                provinces.push(message[key]);
                if (message[key].pname == province) {
                    provinceKey = message[key].pid;
                }
            }
            the.setState({province: provinces, provinceValue: provinceKey});
            //------开始获取市信息
            Tools.myAjax({
                type: "get",
                url: "/REST/Misc/getCityList/" + provinceKey,
                success: function (message) {
                    var citys = [];
                    for (var key in message) {
                        citys.push(message[key]);
                        if (message[key].cname == city) {
                            cityKey = message[key].cid;
                        }
                    }
                    the.setState({city: citys, cityValue: cityKey});

                    //-----------------开始获取区域信息
                    //获取区域
                    Tools.myAjax({
                        type: "get",
                        url: "/REST/Misc/getRegionList/" + cityKey,
                        success: function (message) {
                            var areas = [];
                            for (var key in message) {
                                areas.push(message[key]);
                                if (message[key].area == area) {
                                    areaKey = message[key].id;
                                }
                            }
                            the.setState({area: areas, areaValue: areaKey});
                        }.bind(the),
                        error: function () {

                        }.bind(the)
                    });


                }.bind(the),
                error: function () {

                }.bind(the)
            });
        }.bind(the),
        error: function () {

        }.bind(the)
    });
}





/**
 * Created by songchao on 16/6/15.
 */
var AddressItem = React.createClass({displayName: "AddressItem",
    getDefaultProps: function () {
        return {hasEditButton: true, isSendExpress: true};
    },
    propTypes: {
        onEditClick: React.PropTypes.func,
        hasEditButton: React.PropTypes.bool,
        isSend: React.PropTypes.bool,
        isSendExpress: React.PropTypes.bool,
    },
    getInitialState: function () {
        var config = {};
        config.topClass = this.props.isSendExpress == true ? "address_item_on address_item" : "address_item";
        config.itemStyle = {outline: "none"};
        return config;
    },
    handleEditClick: function () {
        //点击之后,把地址信息回传到main中,然后控制main进入地址编辑模块
        this.props.onEditClick(this.props);
    },
    handleItemClick: function (e) {
        if (this.props.isSendExpress) {
            this.props.onItemClick(this.props.isSend, this.props.address);
            this.props.doItemClick(this);
        }
    },
    handleItemOn: function () {

    },
    handleItemOut: function () {

    },
    render: function () {
        return (
            
            React.createElement("div", {className: this.state.topClass, 
                 onMouseOver: this.props.isSendExpress?this.handleItemOn:"", 
                 onMouseOut: this.props.isSendExpress?this.handleItemOut:"", 
                 style: this.state.itemStyle, onClick: this.handleItemClick}, 
                React.createElement("div", {className: "address_info"}, 
                    React.createElement("div", {className: "fill_width_margin_8"}, 
                        this.props.addressRank != 0 ? "" :
                            React.createElement("span", {className: "address_default_sign"}, "默认"), 
                        
                        React.createElement("span", {className: "address_user_name"}, this.props.addressUserName), 
                        React.createElement("span", {className: "address_telephone"}, this.props.addressTelephone)
                    ), 
                    React.createElement("p", {className: "fill_width_margin_8 address_city_all"}, this.props.addressAddress), 
                    React.createElement("p", {className: "fill_width_margin_8 address_detail"}, this.props.addressDetail)
                ), 
                React.createElement("div", {className: "address_edit_button"}, 
                    React.createElement("img", {src: "../images/address/edit.png", onClick: this.handleEditClick})
                )
            )
        );
    }
});

var AddressContainer = React.createClass({displayName: "AddressContainer",
    getDefaultProps: function () {
        return {isNew: false};
    },
    propTypes: {
        headText: React.PropTypes.string,
        addressList: React.PropTypes.array,
    },
    getInitialState: function () {
        if (this.props.addressList == undefined) {
            console.error("地址参数有误,list为undefined");
            return;
        }
        return {addImg: "../images/address/add.png", beforeSend: "", beforeReceive: ""};
    },
    handleAddImgOn: function () {
        this.setState({addImg: "../images/address/add_on.png"});
    },
    handleAddImgOut: function () {
        this.setState({addImg: "../images/address/add.png"});
    },
    handleAddImgClick: function () {
        this.props.onEditClick({isNew: true, isSend: this.props.isSend});
    },
    doItemClick: function (e) {
        if (this.props.isSend) {
            if (this.state.beforeSend != "") {
                this.state.beforeSend.setState({itemStyle: {}});
                e.setState({itemStyle: {background: "#bfbfbf", color: "#ffffff"}})
            } else {
                e.setState({itemStyle: {background: "#bfbfbf", color: "#ffffff"}})
            }
            this.state.beforeSend = e;
        } else {
            if (this.state.beforeReceive != "") {
                this.state.beforeReceive.setState({itemStyle: {}});
                e.setState({itemStyle: {background: "#bfbfbf", color: "#ffffff"}})
            } else {
                e.setState({itemStyle: {background: "#bfbfbf", color: "#ffffff"}})
            }
            this.state.beforeReceive = e;
        }
    },
    render: function () {
        var pStyle = {marginLeft: "10px", marginRight: "10px"};
        return (
            React.createElement("div", {className: "row"}, 
                React.createElement("div", {className: "address_head"}, 
                    React.createElement("span", null, this.props.headText), 
                    React.createElement("img", {title: "新增", onClick: this.handleAddImgClick, onMouseOver: this.handleAddImgOn, 
                         onMouseOut: this.handleAddImgOut, className: "address_add_img", src: this.state.addImg})
                ), 
                
                    this.props.addressList.length == 0 ?
                        (React.createElement(FillWidthP, {style: pStyle}, 
                            this.props.isSend == true ? "没有发件地址,请添加" : "", 
                            this.props.isSend == false ? "没有收件地址,请添加" : ""
                        )) : "", 
                
                this.props.addressList.map(function (address, index) {
                    return (
                        React.createElement(AddressItem, React.__spread({
                            key: "addressitem"+index}, 
                            address, 
                            this.props, 
                            {address: address, 
                            doItemClick: this.doItemClick, 
                            addressUserName: address.name, 
                            addressTelephone: address.telephone, 
                            addressRank: address.rank, 
                            addressAddress: address.province+address.city+address.region, 
                            addressDetail: address.address})
                        )
                    )
                }.bind(this))
            )
        );
    }
});

/**
 * 地址总容器
 */
var Address = React.createClass({displayName: "Address",
    propTypes: {
        isSendExpress: React.PropTypes.bool,
    },
    getDefaultProps: function () {
        return {isSendExpress: false};
    },
    onItemClick: function (isSend, address) {
        if (isSend) {
            this.state.chooseSendAddress = address;
        } else {
            this.state.chooseReceiveAddress = address;
        }
    },
    getInitialState: function () {
        return {
            receiveAddress: [],
            sendAddress: [],
            sendOK: false,
            receiveOk: false,
            child: getChild(this, [], []),
            chooseSendAddress: "",
            chooseReceiveAddress: ""
        }
    },
    onEditClick: function (pro) {
        this.setState({
            child: [
                React.createElement(EditAddressComponent, React.__spread({
                    onEditClose: this.onEditClose, 
                    onAddressSubmitSuccess: this.onAddressSubmitSuccess, 
                    key: "editaddresscomponent"},  pro))
            ]
        });
    },
    onAddressSubmitSuccess: function () {
        this.componentDidMount();
    },
    onAddressChoice: function () {
        if (this.state.chooseSendAddress == "" || this.state.chooseReceiveAddress == "") {
            showDialog("dialog", "警告", "请选择发件地址和收件地址", true);
            return;
        }
        this.setState({
            child: [
                React.createElement(SendExpressComponent, {key: "sendexpresscom", sendAddress: this.state.chooseSendAddress, 
                                      receiveAddress: this.state.chooseReceiveAddress, 
                                      onClose: this.handleCloseClick}),//关闭方法传入
                React.createElement(BeforeButton, {key: "beforebutton", onCloseClick: this.handleCloseClick})
            ]
        });
    },
    componentDidMount: function () {
        Tools.myAjax({//send
            type: "get",
            url: "/REST/Misc/getSendAddress/customertel/" + User.telephone,
            success: function (data) {
                this.setState({sendAddress: data});
                this.setState({sendOK: true});

                if (this.state.receiveOK) {
                    var child = getChild(this, this.state.receiveAddress, data);
                    this.setState({child: child});
                }
            }.bind(this),
            error: function (data) {
            }
        });
        //收货
        Tools.myAjax({
            type: "get",
            url: "/REST/Misc/getAccAddress/customertel/" + User.telephone,
            success: function (data) {
                this.setState({receiveAddress: data});
                this.setState({receiveOK: true});

                if (this.state.sendOK) {
                    var child = getChild(this, data, this.state.sendAddress);
                    this.setState({child: child});
                }
            }.bind(this),
            error: function (data) {
            }
        });
    },
    onEditClose: function () {//编辑界面的关闭按钮点击
        this.componentDidMount();
    },
    handleCloseClick: function () {
        this.props.onCloseClick([true]);
    },
    render: function () {
        return (
            React.createElement("div", {className: "address_container"}, 
                this.state.child
            )
        );
    }
});

function getChild(the, receiveAddressList, sendAddressList) {
    var expressAdButton = "";
    if (the.props.isSendExpress) {
        expressAdButton = (
            React.createElement("input", {key: "input4", type: "button", onClick: the.onAddressChoice, className: "login_submit", value: "地址选择完成"}));
    }
    return [
        React.createElement(AddressContainer, {addressList: receiveAddressList, onEditClick: the.onEditClick, headText: "收件地址", 
                          isSend: false, key: "receiveaddress", 
                          isSendExpress: the.props.isSendExpress, onItemClick: the.onItemClick}),
        React.createElement(AddressContainer, {addressList: sendAddressList, onEditClick: the.onEditClick, 
                          headText: "发件地址", isSend: true, key: "sendaddress", 
                          isSendExpress: the.props.isSendExpress, onItemClick: the.onItemClick}),
        expressAdButton,
        React.createElement(BeforeButton, {key: "beforebutton", onCloseClick: the.handleCloseClick})
    ]
}
/**
 * Created by songchao on 16/6/23.
 */


var ChangePassword = React.createClass({displayName: "ChangePassword",
    getInitialState: function () {
        return {
            oldPassword:"",
            newPassword1:"",
            newPassword2:"",
            errorMessage:"",
        }
    },
    handleSubmitClick: function () {
        if(this.state.oldPassword != User.password){
            this.setState({errorMessage:"旧密码错误,请重新输入"});
            return;
        }
        //{"changepwd":"false"}
        Tools.myAjax({
            type:"get",
            url:"/REST/Domain/changePwd/tel/"+User.telephone+"/"+this.state.oldPassword+"/"+this.state.newPassword1,
            success: function(data) {
                console.info(data);
                if(data.changepwd == "true"){
                    User.password = this.state.newPassword1;
                    addCookie("password",this.state.newPassword1);
                    showDialog("dialog","恭喜","修改密码成功",true);
                }else{
                    showDialog("dialog","警告","修改密码失败",true);
                }
            }.bind(this),
            error: function (data) {
                console.info(data);
                showDialog("dialog","错误","修改密码失败",true);
            }.bind(this)
        });
    },
    handleBlur: function (e) {
        if(this.state.newPassword1 != this.state.newPassword2 || this.state.newPassword1==""){
            this.setState({errorMessage:"新旧密码不一致,请重新输入"});
        }else{
            this.setState({errorMessage:""});
        }
    },
    onChangeOld: function (e) {
        this.setState({oldPassword:e.target.value});
    },
    onChangeNew1: function (e) {
        this.setState({newPassword1:e.target.value});
    },
    onChangeNew2: function (e) {
        this.setState({newPassword2:e.target.value});
    },
    onCloseClick: function () {
        this.props.onCloseClick([true]);
    },
    render: function () {
        var pStyle = {textAlign:"center",color:"red"};
        return (
            React.createElement("div", {className: "address_container"}, 
                React.createElement("div", {key: "passwordhead", className: "address_head"}, 
                    React.createElement("span", {key: "span"}, "修改密码")
                ), 

                React.createElement("input", {key: "passwordold", type: "password", className: "login_password", onChange: this.onChangeOld, value: this.state.oldPassword, placeholder: "请输入旧密码"}), 
                React.createElement("input", {key: "passwordnew1", type: "password", className: "login_password", onChange: this.onChangeNew1, value: this.state.newPassword1, placeholder: "请输入新密码"}), 
                React.createElement("input", {key: "passwordnew2", type: "password", className: "login_password", onChange: this.onChangeNew2, value: this.state.newPassword2, onBlur: this.handleBlur, placeholder: "请再次输入新密码"}), 
                React.createElement("input", {key: "passwordsubmit", type: "button", className: "login_submit", onClick: this.handleSubmitClick, defaultValue: "提交"}), 
                React.createElement("p", {key: "errormessage", style: pStyle}, this.state.errorMessage), 
                React.createElement(BeforeButton, {key: "beforebutton", onCloseClick: this.onCloseClick})
            )
        );
    }
});
/**
 * Created by songchao on 16/6/22.
 */

var AboutOus = React.createClass({displayName: "AboutOus",
    onCloseClick: function () {
        
        this.props.onCloseClick([true]);
    },
    render: function () {
        return (
            React.createElement("div", null, 
                React.createElement(FillWidthP, null, "快递吧,一款实时跟踪的物流软件"), 
                React.createElement(BeforeButton, {onCloseClick: this.onCloseClick})
            )
        );
    }
});

/**
 * Created by songchao on 16/6/15.
 */

/**
 * 顶部-用户信息部分
 */
var UserInfo = React.createClass({displayName: "UserInfo",
    getInitialState: function () {
        User.UserInfo = this;
        var info = {headimg: "../images/head.jpg"};
        if (User.isLogin) {
            info.name = User.name;
            info.isLogin = User.isLogin;
            info.telephone = User.telephone;
        } else {
            info.isLogin = User.isLogin;
        }
        return info;
    },
    handlNoLoginClick: function () {
        if (!User.isLogin) {
            ReactDOM.render(
                React.createElement(Login, {key: "isLogin"}),
                document.getElementById("login_container")
            );
        }
    },
    onOver: function () {
        if (!User.isLogin) {
            this.setState({headimg: "../images/head_camera.png"});
        }
    },
    onOut: function () {
        this.setState({headimg: "../images/head.jpg"});
    },
    render: function () {
        return (
            React.createElement("div", {className: "row user_info"}, 
                React.createElement("div", {className: "user_icon"}, 
                    React.createElement("img", {src: this.state.headimg, onMouseOver: this.onOver, onMouseOut: this.onOut})
                ), 
                React.createElement("p", {className: "user_name"}, 
                    React.createElement("a", {href: "#", onClick: this.handlNoLoginClick}, 
                        this.state.isLogin == true ? this.state.name : "未登录"
                    )
                ), 
                React.createElement("p", {className: "user_tel"}, 
                    this.state.isLogin == true ? this.state.telephone : ""
                )
            )
        )
    }
});

/**
 * 寄快递按钮
 */
var SendExpressButton = React.createClass({displayName: "SendExpressButton",
    propTypes: {
        sendExpressClick: React.PropTypes.func
    },
    getInitialState: function () {
        return null;
    },
    render: function () {
        return (
            React.createElement("div", {className: "col-xs-6 send_express_button", onClick: this.props.sendExpressClick}, 
                React.createElement("div", {className: "send_icon_container"}, 
                    React.createElement("img", {src: "../images/main/send_express.png"})
                ), 
                React.createElement("p", {className: "send_express_text"}, "寄快递")
            )
        );
    }
});

/**
 * 历史记录按钮
 */
var ExpressHistoryButton = React.createClass({displayName: "ExpressHistoryButton",
    propTypes: {
        expressHistoryClick: React.PropTypes.func
    },
    render: function () {
        return (
            React.createElement("div", {className: "col-xs-6 express_history_container", onClick: this.props.expressHistoryClick}, 
                React.createElement("div", {className: "express_history_icon_container"}, 
                    React.createElement("img", {src: "../images/main/express_history.png"})
                ), 
                React.createElement("div", {className: "express_history_text"}, "历史记录")
            )
        );
    }
});

/**
 * Address查看或者修改按钮
 */
var AddressButton = React.createClass({displayName: "AddressButton",
    propTypes: {
        addressClick: React.PropTypes.func
    },
    render: function () {
        return (
            React.createElement("div", {className: "col-xs-6 address_button_container", onClick: this.props.addressClick}, 
                React.createElement("div", {className: "address_button_icon_container"}, 
                    React.createElement("img", {src: "../images/main/address_button.png"})
                ), 
                React.createElement("div", {className: "address_button_text"}, "地址管理")
            )
        )
    }
});

/**
 * 修改密码
 */
var ChangePasswordButton = React.createClass({displayName: "ChangePasswordButton",
    render: function () {
        return (
            React.createElement("div", {className: "col-xs-6 myinfo_button_container", onClick: this.props.onPasswordClick}, 
                React.createElement("div", {className: "myinfo_button_icon_container"}, 
                    React.createElement("img", {src: "../images/main/passwordbutton.png"})
                ), 
                React.createElement("div", {className: "myinfo_button_text"}, "修改密码")
            )
        );
    }
});

/**
 * 中间按钮部分
 */
var ButtonContainer = React.createClass({displayName: "ButtonContainer",
    propTypes: {
        sendExpressClick: React.PropTypes.func
    },
    render: function () {
        return (
            React.createElement("div", {className: "button-container"}, 
                React.createElement("div", {className: "row first_button_container"}, 
                    React.createElement(SendExpressButton, {sendExpressClick: this.props.sendExpressClick}), 
                    React.createElement(ExpressHistoryButton, {expressHistoryClick: this.props.expressHistoryClick})
                ), 
                React.createElement("div", {className: "row second_button_container"}, 
                    React.createElement(AddressButton, {addressClick: this.props.addressClick}), 
                    React.createElement(ChangePasswordButton, {onPasswordClick: this.props.onPasswordClick})
                )
            )
        );
    }
});

/**
 * 页面中间的主要内容
 */
var Main = React.createClass({displayName: "Main",
    onCloseClick: function (child) {
        //关闭按钮被点击处理
        if (child[0] == true) {
            this.setState({
                child: [
                    React.createElement(UserInfo, {key: "userinfo"}),
                    React.createElement(ButtonContainer, {
                        key: "buttoncontainer", 
                        sendExpressClick: this.sendExpressClick, 
                        expressHistoryClick: this.expressHistoryClick, 
                        addressClick: this.handleAddressClick, 
                        onPasswordClick: this.handlePasswordClick}
                    )
                ]
            });
        } else {
            this.setState({
                child: child
            });
        }
    }
    ,
    sendExpressClick: function () {
        if (!User.isLogin) {
            showDialog("dialog", "警告", "登录后才能寄快递", true);
            return;
        }

        this.setState({
            child: [
                React.createElement(UserInfo, {key: "userinfo"}),
                React.createElement(Address, {key: "sendexpress", onCloseClick: this.onCloseClick, isSendExpress: true}),
            ]
        });
    }
    ,
    expressHistoryClick: function () {
        if (!User.isLogin) {
            showDialog("dialog", "警告", "登录后查看历史记录", true);
            return;
        }
        this.setState({
            child: [
                React.createElement(UserInfo, {key: "userinfo"}),
                React.createElement(ExpressHistotyComponent, {onCloseClick: this.onCloseClick, key: "expresshistory"}),
            ]
        })
    }
    ,
    handleAddressClick: function () {
        if (!User.isLogin) {
            showDialog("dialog", "警告", "登录后才能管理地址", true);
            return;
        }
        this.setState({
            child: [
                React.createElement(UserInfo, {key: "userinfo"}),
                React.createElement(Address, {onCloseClick: this.onCloseClick, key: "addressmanage"}),
            ]
        })
    },
    handlePasswordClick: function () {
        if (!User.isLogin) {
            showDialog("dialog", "警告", "登录后才能修改地址", true);
            return;
        }
        this.setState({
            child:[
                React.createElement(UserInfo, {key: "userinfo"}),
                React.createElement(ChangePassword, {key: "changepassword", onCloseClick: this.onCloseClick})
            ]
        })
    },
    getInitialState: function () {
        User.Main = this;
        var init = {
            child: [
                React.createElement(UserInfo, {key: "userinfo"}),
                React.createElement(ButtonContainer, {
                    key: "buttoncontainer", 
                    sendExpressClick: this.sendExpressClick, 
                    expressHistoryClick: this.expressHistoryClick, 
                    addressClick: this.handleAddressClick, 
                    onPasswordClick: this.handlePasswordClick}
                ),
            ]
        };
        return init;
    }
    ,
    render: function () {
        return (
            React.createElement("div", {className: "container col-sm-6 col-md-4 main"}, 
                this.state.child, 
                React.createElement(Footer, {onCloseClick: this.onCloseClick, key: "footer"})
            )
        );
    }
});
/**
 * Created by songchao on 16/6/17.
 */

/**
 * 左边容器
 */
var Left = React.createClass({displayName: "Left",
    render: function () {
        return (
            React.createElement("div", {className: "hidden-xs col-sm-3 col-md-4 left-component"}
            )
        );
    }
});
/**
 * Created by songchao on 16/6/17.
 */
/**
 * 右边容器
 */
var Right = React.createClass({displayName: "Right",
    render: function () {
        return (
            React.createElement("div", {className: "hidden-xs col-sm-3 col-md-4 right-component"})
        );
    }
});
/**
 * Created by songchao on 16/6/14.
 */

/**
 * 中间所有部分容器,包括,左右
 */
var CenterComponent = React.createClass({displayName: "CenterComponent",
    render: function () {
        return (
            React.createElement("div", {className: "container-fluid center-component"}, 
                React.Children.map(this.props.children, function (child) {
                    return child;
                })
            )
        );
    }
});

var Content = React.createClass({displayName: "Content",
    render: function () {
        var conStyle = {height: "100%"};
        return (
            React.createElement("div", {style: conStyle}, 
                React.createElement(NavBar, null), 
                React.createElement(CenterComponent, null, 
                    React.createElement(Left, null), 
                    React.createElement(Main, null), 
                    React.createElement(Right, null)
                )
            )
        )
    }
});
/**
 * 分发组件到dom树
 */
ReactDOM.render(
    React.createElement(Content, null),
    document.getElementById("content")
);