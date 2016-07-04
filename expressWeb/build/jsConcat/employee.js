/**
 * Created by songchao on 16/6/15.
 */
$.support.cors = true;
//给数组添加是否包含方法
Array.prototype.contains = function (text) {
    var length = this.length;
    for(var i=0;i<length;i++){
        if(this[i] == text){
            return true;
        }
    }
    return false;
};

var User = {
    isLogin:false,
    name:null,
    telephone:null,
    password:null,
    token:null,
    id:null,
    job:null,//1,快递员,2分拣员,3司机
    jobText:null,
    outletsId:null,
    status:null,
    recvPackageId:null,
    sendPackageId:null,
    sortPakcageID:null,
    
    //用户组件
    UserInfo:null,
    //Navbar
    NavBar:null,
    //Main
    Main:null,
    //打包拆包组件
    Package:null,

    cookieLogin:function () {
        if(getCookieValue("isLogin") == "true") {
            this.isLogin = getCookieValue("employee_isLogin") == "true" ? true : false;
            this.name = getCookieValue("employee_name");

            this.telephone = getCookieValue("employee_telephone");
            this.password = getCookieValue("employee_password");
            this.token = getCookieValue("employee_token");
            this.id = getCookieValue("employee_id");
            this.job = getCookieValue("employee_job");
            this.jobText = getCookieValue("employee_jobText");
            this.outletsId = getCookieValue("employee_outletsId");
            this.status = getCookieValue("status");
        }
    },
    login:function (name, telephone, password, token,
                    id,job,jobText,outletsId,status) {
        this.isLogin = true;
        this.name = name;
        this.telephone = telephone;
        this.password = password;
        this.token = token;
        this.id = id;
        this.job = job;
        this.jobText = jobText;
        this.outletsId = outletsId;
        this.status = status;

        this.NavBar.setState({isLogin:true});
        this.UserInfo.setState({name:name,telephone:telephone,isLogin:true});

        addCookie("employee_token", token);
        addCookie("employee_isLogin", "true");
        addCookie("employee_name", name);
        addCookie("employee_telephone", telephone);
        addCookie("employee_password", password);
        addCookie("employee_id", id);
        addCookie("employee_text", jobText);
        addCookie("employee_job", job);
        addCookie("employee_outletsId", outletsId);
        addCookie("employee_status", status);
    },

    logout:function () {
        this.isLogin = false;
        this.name = null;
        this.telephone = null;
        this.id = null;
        this.password = null;
        this.token = null;
        this.UserInfo.setState({isLogin: false});
        this.NavBar.setState({name:null,telephone:null,isLogin: false});

        deleteCookie([
            "employee_name",
            "employee_token",
            "employee_isLogin",
            "employee_telephone",
            "employee_password",
            "employee_id",
            "employee_text",
            "employee_job",
            "employee_outletsId",
            "employee_status",
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
        var config = {};
        if (this.props.isUpdate) {
            config.nameText = this.props.employee.name;
            config.workType = this.props.employee.job;
            config.status = this.props.employee.status;
        } else {
            config.nameText = "";
            config.workType = "";
            config.status = "";
        }
        return config;
    },
    componentWillMount: function () {
        if (this.props.isUpdate) {
            this.props.handleStatusChange(this.props.employee.status);
            this.props.hanleChange(this.props.employee.name);
            this.props.handleWorkTypeChange(this.props.employee.job);
        }
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
    handleTypeChange: function (e) {
        if (e.target.value != 0) {
            this.setState({workType: e.target.value});
            this.props.handleWorkTypeChange(e.target.value);
        }
    },
    handleStatusChange: function (e) {
        if(e.target.value!=0){
            this.setState({status:e.target.value});
            this.props.handleStatusChange(e.target.value);
        }
    },
    render: function () {
        return (
            React.createElement("div", null, 
                React.createElement("input", {type: "text", value: this.state.nameText, className: "login_name", placeholder: "姓名", 
                       onChange: this.handleNameChange}), 
                React.createElement("select", {value: this.state.workType, onChange: this.handleTypeChange, className: "form-control"}, 
                    React.createElement("option", {value: "0"}, "请选择职位"), 
                    React.createElement("option", {value: "1"}, "快递员"), 
                    React.createElement("option", {value: "2"}, "分拣员"), 
                    React.createElement("option", {value: "3"}, "司机"), 
                    React.createElement("option", {value: "4"}, "经理")
                ), 
                React.createElement("select", {value: this.state.status, onChange: this.handleStatusChange, className: "form-control"}, 
                    React.createElement("option", {value: "0"}, "请选择员工状态"), 
                    React.createElement("option", {value: "1"}, "正常工作"), 
                    React.createElement("option", {value: "2"}, "休假")
                )
            )
        );
    }
});
/**
 * 电话号组件
 */
var Tel = React.createClass({displayName: "Tel",
    getInitialState: function () {
        if (this.props.value != undefined) {
            return {telephone: this.props.value}
        }
        return {telephone: ""};
    },
    componentWillMount: function () {
        if (this.props.value != undefined) {
            this.props.handleChange(this.props.value);
        }
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
        if (this.props.value != undefined) {
            return {password: this.props.value}
        }
        return {password: ""};
    },
    componentWillMount: function () {
        if (this.props.value != undefined) {
            this.props.handleChange(this.props.value);
        }
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
        temp = {isLogin:true};
        if (this.props.isLogin == "false" || this.props.isLogin == false) {
            temp = {isLogin: false}
        }
        return Tools.extend(temp, {
            telephone: "", password: "", name: "", workType: "", site: "",status:"", errorMessage: ""
        });
    },
    handleSubmitClick: function (event) {
        //这里开始登陆
        var config = {
            telephone: this.state.telephone+"",
            password: this.state.password+"",
            name: this.state.name+"",
            workType: this.state.workType,
            siteID: this.props.siteID,
            isUpdate: this.props.isUpdate,
            employee: this.props.employee,
        };
        if (config.telephone.length != 11) {
            this.handleError("电话号码长度错误");
            return;
        }
        if(config.password.length <6){
            this.handleError("密码长度不对");
            return;
        }
        if (!this.state.isLogin && this.props.siteID == undefined) {
            this.handleError("请重新选择站点然后添加员工");
            return;
        }
        if (!this.state.isLogin && this.state.workType == "") {
            this.handleError("请选择工作");
            return;
        }
        if (!this.state.isLogin && this.state.status == "") {
            this.handleError("请选择工作人员状态");
            return;
        }
        startLogin(this, config, this.state.isLogin, this.onSuccess);
    },
    handleSubmitStart: function (event) {
        event.preventDefault();
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
        if(!this.props.isLogin){
            this.props.onSuccess.componentDidMount();
        }
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
    handleWorkTypeChange: function (type) {
        this.setState({workType: type});
    },
    handleStatusChange: function (status) {
        this.setState({status:status});
    },
    render: function () {
        var h3Style = {textAlign: "center", width: "100%", paddingBottom: "10px"};
        var aStyle = {color: "#2aabd2"};
        var errorStyle = {color: "red"};
        var nameCom;
        var head = "";
        if (this.state.isLogin) {
            nameCom = undefined;
            head = "登陆";
        } else {
            nameCom = React.createElement(NameLogin, React.__spread({},  this.props, {handleWorkTypeChange: this.handleWorkTypeChange, 
                                                 handleSiteChange: this.handleSiteChange, 
                                                 hanleChange: this.handleNameChange, 
                                                 onError: this.handleError, 
                                                 handleStatusChange: this.handleStatusChange}));
            head = "管理员工";
        }
        return (
            React.createElement("form", {onSubmit: this.handleSubmitStart, method: "get", className: "login_window"}, 
                React.createElement(CloseButton, {onClose: this.onClose}), 
                React.createElement("h3", {style: h3Style}, head), 
                React.createElement(Tel, {handleChange: this.handleTelChange, value: this.props.isUpdate?this.props.employee.telephone:"", 
                     onError: this.handleError}), 
                nameCom, 
                React.createElement(Password, {handleChange: this.handlePasswordChange, 
                          value: this.props.isUpdate?this.props.employee.password:"", onError: this.handleError}), 
                React.createElement("div", null, React.createElement("input", {type: "button", className: "login_submit", onClick: this.handleSubmitClick, defaultValue: "提交"})
                ), 
                React.createElement("p", {style: errorStyle}, this.state.errorMessage)
            )
        );
    }
});

function startLogin(props, config, isLogin, onSuccess) {
    if (isLogin) {//-------登陆
        var url = "/REST/Domain/loginByEmployee";

        Tools.myAjax({
            type: "post",
            url: url,
            data: {telephone: config.telephone, password: config.password},
            success: function (data) {
                if (data.loginstate == 'true') {
                    doSuccess(data);
                    showDialog("dialog", "恭喜", "登陆成功", true, onSuccess);

                } else if (data.loginstate == "deny") {
                    showDialog("dialog", "警告", "电话号码长度重复", true);
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
        var url = "/REST/Domain/newEmployee";
        var jobText = "";
        if (config.workType == '1') {
            jobText = "快递员";
        } else if (config.workType == '2') {
            jobText = "分拣员";
        } else if (config.workType == '3') {
            jobText = "司机";
        } else if (config.workType == '4') {
            jobText = "经理";
        }

        var data;
        if (config.isUpdate) {
            url = "/REST/Domain/changeEmployeeInfo";
            config.employee.job = config.workType;
            config.employee.jobText = jobText;
            config.employee.name = config.name;
            config.employee.telephone = config.telephone;
            config.employee.password = config.password;
            config.employee.status = config.status;
            data = config.employee;
        }else{
            data = {
                telephone: config.telephone,
                password: config.password,
                name: config.name,
                job: config.workType,
                jobText: jobText,
                status: "1",
                outletsId: config.siteID
            }
        }
        Tools.myAjax({
            type: "post",
            url: url,
            data: data,
            success: function (data) {
                if(config.isUpdate){
                    if(data.changeEmployeeInfo == "true"){
                        showDialog("dialog", "恭喜", "修改成功", true, onSuccess);
                    }else{
                        showDialog("dialog", "警告", "修改失败", true);
                    }
                }else {
                    if (data.newEmployee == 'true') {
                        showDialog("dialog", "恭喜", "注册成功", true, onSuccess);
                    }
                    else {
                        showDialog("dialog", "警告", "注册失败", true);
                    }
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
        User.login(
            name, config.telephone, config.password, data.token, data.id,
            data.job, data.jobText, data.outletsId, data.status
        );

    }
}
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
        if(User.Package == null){
            showDialog("dialog","警告","请在打包或者拆包界面使用搜索框",true);
            return;
        }

        User.Package.addExpress(id);
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
                    React.createElement("img", {src: "../images/address/add_on.png", width: "15px", height: "15px", className: "em_searchIcon", 
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
 * Created by songchao on 16/6/26.
 */

/**
 * 打包和拆包的容器
 */
var Package = React.createClass({displayName: "Package",
    propTypes: {
        isPackageIn: React.PropTypes.bool,
    },
    getInitialState: function () {
        return {
            expresses: [],
            addExpress: this.addExpress,
            width: "",
            packageID: "",
        }
    },
    addExpress: function (expressId) {//向界面和state中增加expressID
        if (this.state.expresses.contains(expressId)) {
            showDialog("dialog", "警告", "这个快递已经在列表中", true);
            return;
        }
        if (User.job == 1) {//如果是快递员,那么包裹id是快递员自己的
            if (User.recvPackageId != null) {
                addExpressToPackage(this, User.recvPackageId, expressId);
            } else {
                showDialog("dialog", "警告", "快递员收件包裹id是空,请重试", true);
            }
        } else {
            if (User.sortPakcageID == "") {
                showDialog("dialog", "警告", "包裹id是空,请重新填写包裹id", true);
            } else {
                addExpressToPackage(this, User.sortPakcageID, expressId);
            }
        }
    },
    onCloseClick: function () {
        this.props.onCloseClick([true]);
    },
    componentDidUpdate: function () {
        var li = this.refs["li" + (this.state.expresses.length - 1)];
        setTimeout(function () {//----产生动画
            $(li).attr("class", "package_list_li package_list_li_on");
        }, 10);
    },
    sureButtonGetPackageID: function () {
        if (this.state.packageID != "") {//dialog点击确定后,获取包裹中的快递信息
            getExpressFromPackage(this.state.packageID, this.getExpressListSuccess);
        } else {
            showDialog("dialog", "警告", "包裹id是空,请重新填写包裹id", true);
            this.onCloseClick();//包裹好是空的,那么返回重新填写包裹号
        }
    },
    getExpressListSuccess: function (data) {
        var expresses = this.state.expresses;
        for (var i = 0; i < data.length; i++) {
            expresses.push(data[i].ID);
        }
        this.setState({expresses: expresses});
    },
    getPackageIDChange: function (e) {
        if (e.target.value != "" && !isNaN(e.target.value)) {//如果格式正确获取dialog中的输入
            this.setState({packageID: e.target.value});
        }
    },
    componentDidMount: function () {
        if (this.props.isPackageIn) {
            if (this.state.expresses.length == 0) {
                showDialog("dialog", "提醒", "请在顶部搜索框输入快递号,点击旁边的加号添加", true);
            }
        }
        if (!this.props.isPackageIn) {//---如果是拆包,那么弹出输入包裹id的dialog
            placeInputPackageID(this.sureButtonGetPackageID, this.getPackageIDChange);
        }
        User.Package = this;//进入时把这个部分的引用暴露出去

        initPackage(this.props.isPackageIn);//初始化包裹
    }
    ,
    componentWillUnmount: function () {
        User.Package = null;//退出的时候引用消除
    }
    ,
    smallCloseButtonOn: function (e) {
        e.target.src = "../images/index/close_on.png";
    }
    ,
    smallCloseButtonOut: function (e) {
        e.target.src = "../images/index/close.png";
    }
    ,
    smallRemoveClick: function (e) {
        var index = parseInt(e.target.dataset.index);
        var expresses = this.state.expresses;
        var willDelExpressID = expresses.splice(index, 1);
        if (this.props.isPackageIn) {//如果是打包,删除的时候必须进行网络请求
            if (User.job == 1) {
                delExpressFromPackage(this, User.recvPackageId, willDelExpressID, expresses);//打包,删除需要网络请求
            } else {
                delExpressFromPackage(this, this.state.packageID, willDelExpressID, expresses);//打包,删除需要网络请求
            }
        } else {
            this.setState({expresses: expresses});//拆包,直接去掉就可以
            if (expresses.length == 0) {
                showDialog("dialog", "提示", "快递列表为空请点击拆包按钮完成提交", true);
            }
        }
    }
    ,
    handleSubmit: function () {
        if (this.props.isPackageIn) {
            if(User.job = 1){//快递员，就提示打包的包裹，就是收件的包裹id号。
                showDialog("dialog","提示","您的收件包裹id是"+User.recvPackageId+"请记好",true);
            }else if(User.job = 2){//分拣员
                showDialog("dialog","提示","您的包裹id是"+User.sortPakcageID+"请记好",true);
            }
            this.onCloseClick();
        } else {
            //拆包网络请求,要拆的包裹id参数
            packageOut(this.state.packageID, this.onCloseClick);
        }
    },
    render: function () {
        return (
            React.createElement("div", {className: "row"}, 
                React.createElement("div", {key: "headtext", ref: "addressHead", className: "address_head"}, 
                    React.createElement("span", null, this.props.isPackageIn ? "快件打包" : "快件拆包")
                ), 
                React.createElement("ul", {key: "packagelist", className: "package_list"}, 
                    this.state.expresses.map(function (data, index) {
                        return (
                            React.createElement("li", {ref: "li"+index, className: "package_list_li", key: index}, 
                                data, 
                                React.createElement("img", {"data-index": index, src: "../images/index/close.png", 
                                     className: "package_one_remove", onMouseOver: this.smallCloseButtonOn, 
                                     onMouseOut: this.smallCloseButtonOut, onClick: this.smallRemoveClick})
                            )
                        )
                    }.bind(this))
                ), 
                React.createElement("button", {onClick: this.handleSubmit, 
                        className: "login_submit package_submit"}, this.props.isPackageIn ? "打包完成" : "拆包完成"), 
                React.createElement(BeforeButton, {onCloseClick: this.onCloseClick, key: "beforebutton"})
            )
        );
    }
});


/**
 * 49560510764476
 * 拆包
 * @param packageId
 * @param packageSuccess
 */
function packageOut(packageId, packageSuccess) {
    Tools.myAjax({
        type: "get",
        url: "/REST/Domain/openPackageByPackageId/" + packageId,
        success: function (data) {
            //拆包成功
            if (data.state == "1") {
                showDialog("dialog", "恭喜", "拆包成功", true, packageSuccess);
            } else {
                showDialog("dialog", "警告", "拆包出错,请重新点击拆包按钮尝试", true);
            }
        },
        error: function (data) {
            console.error(data);
            showDialog("dialog", "错误", "拆包出错,请重新点击拆包按钮尝试", true);
        }
    })
}

/**
 * 从包裹中删除快递
 * @param the
 * @param packageID
 * @param expressID
 * @param expresses
 */
function delExpressFromPackage(the, packageID, expressID, expresses) {
    ///deleteFromPackage/packageId/{packageId}/expressId/{expressId}/{token}
    Tools.myAjax({
        type: "get",
        url: "/REST/Domain/deleteFromPackage/packageId/" + packageID + "/expressId/" + expressID,
        success: function (data) {
            if (data.state == "1") {
                the.setState({expresses: expresses});
            } else {
                showDialog("dialog", "警告", "删除包裹失败,请重试", true);
            }
        },
        error: function (data) {
            console.info(data);
            showDialog("dialog", "错误", "删除包裹失败,请重试", true);
        }
    })
}

/**
 * 添加快递到包裹中
 * @param the
 * @param packageID
 * @param expressID
 */
function addExpressToPackage(the, packageID, expressID) {
    Tools.myAjax({
        type: "get",
        url: "/REST/Domain/loadIntoPackage/packageId/" + packageID + "/id/" + expressID + "/isPackage/0",
        success: function (data) {
            if (data.state == "1") {
                var expresses = the.state.expresses;
                expresses.push(expressID);
                the.setState({expresses: expresses});
            } else {
                showDialog("dialog", "警告", "加入包裹失败,请重试", true);
            }
        }.bind(this),
        error: function (data) {
            console.info(data);
            showDialog("dialog", "错误", "添加包裹错误,请重试", true);
        }
    })
}

/**
 * 初始化包裹信息,如果是快递员,那么创建收发包裹,如果是分拣员和司机那么,输入包裹号
 */
function initPackage(isPackageIn) {
    if (User.job == 1) {//----如果是快递员,如果包裹为空,那么创建派送包和揽收包
        if (User.sendPackageId == null) {
            createPackage(true);//创建快递员发件包裹
        }
        if (User.recvPackageId == null) {
            createPackage(false)//创建快递员收件包裹
        }
    } else if (User.job == 2) {//---如果是分拣员,首先选择快递起点和终点站点id
        if (isPackageIn) {
            placeChoiceSiteP();//--选择后创建包裹
        }
    }
}

/**
 * react组件,dialog中的选择站点部分的容器
 */
var SelectSiteDialog = React.createClass({displayName: "SelectSiteDialog",
    getInitialState: function () {
        return {
            sendSiteID: "",
            receiveSiteID: "",
            isPackage: this.props.isPackage == false? false : true,
        }
    },
    sendSiteChange: function (e) {
        this.props.getResult(e.target.value, null);
    },
    receiveSiteChange: function (e) {
        this.props.getResult(null, e.target.value);
    },
    render: function () {
        var selectStyle = this.state.isPackage?{width: "50%", float: "left"}:{width:"100%"};
        return (
            React.createElement("div", null, 
                React.createElement("select", {key: "selectsend", style: selectStyle, className: "form-control", onChange: this.sendSiteChange}, 
                    React.createElement("option", {value: "-1"}, this.state.isPackage ? "请选择起始站点" : "请选择一个站点"), 
                    this.props.data.map(function (d, index) {
                        return React.createElement("option", {key: "option"+index, value: d.id}, d.name)
                    })
                ), 
                this.state.isPackage ? (
                    React.createElement("select", {key: "selectreceive", style: selectStyle, className: "form-control", 
                            onChange: this.receiveSiteChange}, 
                        React.createElement("option", {value: "-1"}, "请选择终点站点"), 
                        this.props.data.map(function (d, index) {
                            return React.createElement("option", {key: "option"+index, value: d.id}, d.name)
                        })
                    )
                ) : "", 
                React.createElement("div", {className: "clearfix"})
            )
        );
    }
});

/**
 * 弹出请选择站点的窗口
 */
function placeChoiceSiteP() {
    ///Misc/getAllBranch/{token}
    //返回：List<OutletsEntity>
    var sendSiteID = undefined;
    var receiveSiteID = undefined;

    function getResult(getSendSiteID, getReceiveSiteID) {
        if (getSendSiteID != null) {
            sendSiteID = getSendSiteID;
        }
        if (getReceiveSiteID != null) {
            receiveSiteID = getReceiveSiteID;
        }
    }

    function sureButtonClick() {
        function returnMain() {
            User.Main.onCloseClick([true]);
        }

        if (sendSiteID == "-1" || sendSiteID == undefined || receiveSiteID == "-1" || receiveSiteID == undefined) {
            showDialog("dialog", "警告", "您的站点选择不正确", true, returnMain);
        } else {
            createPackage(true, sendSiteID, receiveSiteID);//创建分拣员包裹
        }
    }

    Tools.myAjax({
        type: "get",
        url: "/REST/Misc/getAllBranch/",
        success: function (data) {
            showDialog("dialog", "请选择包裹收发站点", React.createElement(SelectSiteDialog, {getResult: getResult, 
                                                                data: data}), true, sureButtonClick);
            //弹出选择框
        }.bind(this),
        error: function (data) {
            console.info(data);
            showDialog("dialog", "错误", "获取中转站点信息出错,请重试");
        }
    })
}

/**
 * CreateAPackage（fromID，toID，employeesID，isSorter，token）
 * 如果isSorter==1 就是分拣员 fromID toID对应物流信息
 * isSorter==0 的话就是快递员打包 如果fromID==1 为派送包 fromID==0为揽收包 toID无意义 随便填
 * @param isSend
 */
function createPackage(isSend, fromAddressID, toAddressID) {
    var isSort;
    var fromID;
    var toID;
    if (User.job == 1) {//快递员
        isSort = 0;
        if (isSend) {
            fromID = 1;
        } else {
            fromID = 0;
        }
        toID = 10;
    } else if (User.job == 2) {//分拣员
        isSort = 1;
        fromID = fromAddressID;
        toID = toAddressID;
    }

    createPackageAjax(fromID, toID, isSort, isSend);
}

/**
 * package请求网络创建
 * @param fromID
 * @param toID
 * @param isSorter
 * @param isSend
 */
function createPackageAjax(fromID, toID, isSorter, isSend) {
    //创建包裹返回
    //{
    // "closeTime":"Sun Jun 26 19:59:33 CST 2016",
    // "employeesID":71,"employeesName":"宋超","id":31187275451409
    // }
    Tools.myAjax({
        type: "get",
        url: "/REST/Domain/createPackage/fromID/" + fromID + "/toID/" + toID + "/employeesID/" + User.id + "/isSorter/" + isSorter,
        success: function (data) {
            if (User.job == 1) {
                if (isSend) {
                    User.sendPackageId = data.id;
                } else {
                    User.recvPackageId = data.id;
                }
            } else if (User.job == 2) {
                User.sortPakcageID = data.id;
            }
        },
        error: function (data) {
            console.error(data);
            showDialog("dialog", "错误", "创建包裹失败 isSend:" + isSend, true);
        }
    })
}

/**
 * 获取package
 * @param packageId
 */
function getPackage(packageId) {
    Tools.myAjax({
        type: "get",
        url: "/REST/Domain/getPackageInfoById/" + packageId,
        success: function (data) {

        },
        error: function (data) {

        }
    })
}

/**
 * 打包提交
 * @param expresses
 */
function expressToPackage(expresses) {
    Tools.myAjax({
        type: "post",
        url: "/REST/Domain/PackageLoadIntoPackage",
        data: expresses,
        success: function (data) {
            console.info(data);
        },
        error: function (data) {
            console.error(data);
            showDialog("dialog", "错误", "打包失败,请重试", true);
        }
    })
}

/**
 * 从包裹中获取快递列表
 * @param packageID
 */
function getExpressFromPackage(packageID, getSuccess) {
    Tools.myAjax({
        type: "get",
        url: "/REST/Domain/searchExpressInPackageById/" + packageID,
        success: function (data) {
            if (data.length == 0) {
                showDialog("dialog", "提醒", "包裹中没有快递", true);
            } else {
                getSuccess(data);
            }
        },
        error: function (data) {
            console.info(data);
            showDialog("dialog", "错误", "获取快递包裹中的快递列表错误,请重试", true);
        }
    })
}

/**
 * 请输入包裹id弹出
 * @param sureButton
 * @param onChange
 */
function placeInputPackageID(sureButton, onChange) {

    var inputStyle = {width: "100%"};
    showDialog(
        "dialog", "请输入要拆的包裹ID",
        (
            React.createElement("input", {onChange: onChange, style: inputStyle, placeholder: "请输入包裹ID"})
        ),
        true,
        sureButton
    );
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
            this.setState({errorMessage:"新密码错误,请重新输入"});
            return;
        }
        Tools.myAjax({
            
        })
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
                React.createElement("div", {className: "address_head"}, 
                    React.createElement("span", null, "修改密码")
                ), 

                React.createElement("input", {type: "password", className: "login_password", onChange: this.onChangeOld, value: this.state.oldPassword, placeholder: "请输入旧密码"}), 
                React.createElement("input", {type: "password", className: "login_password", onChange: this.onChangeNew1, value: this.state.newPassword1, placeholder: "请输入新密码"}), 
                React.createElement("input", {type: "password", className: "login_password", onChange: this.onChangeNew2, value: this.state.newPassword2, onBlur: this.handleBlur, placeholder: "请再次输入新密码"}), 
                React.createElement("input", {type: "button", className: "login_submit", onClick: this.handleSubmitClick, defaultValue: "提交"}), 
                React.createElement("p", {style: pStyle}, this.state.errorMessage), 
                React.createElement(BeforeButton, {onCloseClick: this.onCloseClick})
            )
        );
    }
});
/**
 * Created by songchao on 16/6/28.
 */

/**
 * 经理部分容器
 * 经理的职责有:
 * 增删员工,站点管理,修改快递信息
 */
var ManagerComponent = React.createClass({displayName: "ManagerComponent",
    onDoClick: function (child1, child2, child3) {
        if (child1 != null) {
            this.setState({child1: child1});
        }
        if (child2 != null) {
            this.setState({child2: child2});
        }
        if (child3 != null) {
            this.setState({child3: child3});
        }
    },
    getInitialState: function () {
        return {
            child1: [
                React.createElement(EmployeeManagerButton, {key: "employeemanagerbutton", onDoClick: this.onDoClick}),
                React.createElement(SiteWorkloadButton, {key: "siteworkloadbutton", onDoClick: this.onDoClick})
            ],
            child2: [],
            child3: [],
        }
    },
    onCloseClick: function () {
        this.props.onCloseClick([true]);
    },
    render: function () {
        return (
            React.createElement("div", null, 
                React.createElement(ButtonContainer, {key: "managerbuttoncontainer", 
                                 child1: this.state.child1, 
                                 child2: this.state.child2, 
                                 child3: this.state.child3}
                ), 
                React.createElement(BeforeButton, {onCloseClick: this.onCloseClick, key: "beforebuttonmanager"})
            )
        );
    }
});

/**
 * 经理管理员工的功能
 */
var EmployeeManagerComponent = React.createClass({displayName: "EmployeeManagerComponent",
    propTypes: {
        siteID: React.PropTypes.string
    },
    componentDidMount: function () {
        getAllEmployeeBySiteID(this.props.siteID, this.getEmployeeSuccess);
    },
    componentDidUpdate: function () {
        getAllEmployeeBySiteID(this.props.siteID, this.getEmployeeSuccess);
    },
    getEmployeeSuccess: function (data) {
        if (this.isMounted()) {
            this.props.onDoClick(null, null, [React.createElement(EmployeeListComponent, {onUpdate: this, siteID: this.props.siteID, data: data})]);
        }
    },
    addEmployee: function () {
        //跳转到注册页面直接注册员工
        ReactDOM.render(
            React.createElement(Login, {isLogin: false, key: "noLogin", siteID: this.props.siteID, onSuccess: this}),
            document.getElementById("login_container")
        );
    },
    render: function () {
        return (
            React.createElement("div", {key: "employeemanagercomponent", className: "employee_manager_component"}, 
                React.createElement("button", {key: "addemployee", onClick: this.addEmployee, className: "btn btn-default"}, "增加员工")
            )
        );
    }
});


var EmployeeListComponent = React.createClass({displayName: "EmployeeListComponent",
    propTypes: {
        data: React.PropTypes.array
    },
    getInitialState: function () {
        return {
            data: this.props.data,
            delIndex: "",
        };
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState({data: nextProps.data});
    },
    onDelClick: function (e) {
        e.stopPropagation();
        var index = e.target.dataset.index;
        this.setState({delIndex:index});
        showDialog("dialog","警告","确定删除这个员工?",true,this.sureDel,false,null,false);
    },
    sureDel: function () {//点击确定删除按钮执行
        var employee = this.state.data[this.state.delIndex];
        delEmployee(employee, this.state.delIndex, this.delSuccess);
    },
    delSuccess: function (index) {//删除成功
        var employeese = this.state.data;
        employeese.splice(index, 1);
        this.setState({data: employeese});
    },
    onLiClick: function (e) {
        var index = e.target.dataset.index;
        var employee = this.state.data[index];
        //跳转到注册页面直接注册员工
        ReactDOM.render(
            React.createElement(Login, {isLogin: false, 
                   isUpdate: true, key: "noLogin", 
                   employee: employee, 
                   siteID: this.props.siteID, 
                   onSuccess: this.props.onUpdate}),
            document.getElementById("login_container")
        );
    },
    render: function () {
        return (
            React.createElement("ul", {key: "employeelistcom", className: "manager_employee_list"}, 
                this.state.data.map(function (data, index) {
                    return (
                        React.createElement("li", {key: "li"+index, "data-index": index, onClick: this.onLiClick}, 
                            React.createElement("span", {key: "span"}, data.name + "  " + data.jobText), 
                            React.createElement("img", {"data-index": index, onClick: this.onDelClick, key: "delimg", 
                                 src: "../images/manager/delete.png"})
                        )
                    )
                }.bind(this))
            )
        );
    }
});

function getSiteWorkload(siteID) {
    showWorkload(siteID);
}

/**
 * 删除员工
 * @param employee
 * @param index
 * @param onSuccess
 */
function delEmployee(employee, index, onSuccess) {
    Tools.myAjax({
        type: "get",
        url: "/REST/Domain/deleteEmployee/" + employee.id,
        success: function (data) {
            if (data.deleteEmployee == "true") {
                showDialog("dialog", "恭喜", "删除员工成功", true);
                onSuccess(index);
            } else {
                showDialog("dialog", "警告", "删除员工错误,请重试", true);
            }
        },
        error: function (data) {
            console.error(data);
            showDialog("dialog", "错误", "删除员工错误,请重试", true);
        }
    })
}
/**
 * 通过站点id获取它的所有员工
 * /REST/Domain/findEmployeesInfoByOutletsId/{outletId}/{token}
 * @param siteID
 */
function getAllEmployeeBySiteID(siteID, onSuccess) {
    Tools.myAjax({
        type: "get",
        url: "/REST/Domain/findEmployeesInfoByOutletsId/" + siteID,
        success: function (data) {
            onSuccess(data);
        },
        error: function (data) {
            console.error(data);
            showDialog("dialog", "错误", "获取员工信息出错,请重试", true);
        }
    })
}

/**
 * 弹出请选择站点的窗口
 */
function placeChoiceSite(sureButton) {
    ///Misc/getAllBranch/{token}
    //返回：List<OutletsEntity>
    var sendSiteID = undefined;

    function getResult(getSendSiteID) {
        if (getSendSiteID != null) {
            sendSiteID = getSendSiteID;
        }
    }

    function sureButtonClick() {
        if (sendSiteID == "-1" || sendSiteID == undefined) {
            showDialog("dialog", "警告", "您的站点选择不正确", true, returnMain);
        } else {
            //选择站点之后,从这里跳转
            sureButton(sendSiteID);
        }
    }

    Tools.myAjax({
        type: "get",
        url: "/REST/Misc/getAllBranch/",
        success: function (data) {
            if (data.length != 0) {
                showDialog("dialog", "请选择站点", React.createElement(SelectSiteDialog, {isPackage: false, getResult: getResult, 
                                                                data: data}), true, sureButtonClick);
            } else {
                showDialog("dialog", "警告", "获取中转站点信息出错,请重试", true);
            }
            //弹出选择框
        }.bind(this),
        error: function (data) {
            console.error(data);
            showDialog("dialog", "错误", "获取中转站点信息出错,请重试", true);
        }
    })
}


/**
 * 经理管理员工按钮
 */
var EmployeeManagerButton = React.createClass({displayName: "EmployeeManagerButton",
    getInitialState: function () {
        return {
            siteID: "",
        }
    },
    setSiteID: function (siteID) {
        this.setState({siteID: siteID});
        this.props.onDoClick(null, [React.createElement(EmployeeManagerComponent, {onDoClick: this.props.onDoClick, siteID: siteID})]);
    },
    onClick: function () {
        placeChoiceSite(this.setSiteID);
    },

    render: function () {
        return (
            React.createElement("div", {key: "employeemanagerbutton", className: "col-xs-6 send_express_button", onClick: this.onClick}, 
                React.createElement("div", {key: "imgcontainer", className: "package_in_icon_container employee_manager_button"}, 
                    React.createElement("img", {key: "img", src: "../images/manager/managerpeople.png"})
                ), 
                React.createElement("p", {key: "textshow", className: "send_express_text"}, "员工管理")
            )
        );
    }
});

/**
 * 站点工作量查询按钮
 */
var SiteWorkloadButton = React.createClass({displayName: "SiteWorkloadButton",

    onClick: function () {
        placeChoiceSite(getSiteWorkload);
    },
    render: function () {
        return (
            React.createElement("div", {key: "siteworkloadbutton", className: "col-xs-6 send_express_button", onClick: this.onClick}, 
                React.createElement("div", {key: "container", className: "package_in_icon_container employee_manager_button"}, 
                    React.createElement("img", {key: "img", src: "../images/main/workload.png"})
                ), 
                React.createElement("p", {key: "showtext", className: "send_express_text"}, "站点工作量")
            )
        );
    }
});

/**
 * Created by songchao on 16/6/25.
 */

/**
 * 入口方法,调用显示工作量
 * @param employeeID
 */
function showWorkload(packageID) {
    if (packageID != undefined) {
        Workload.id = packageID;
        Workload.whichRequest = 1;
    }
    $(canvas).attr({width: $(canvas).width() + "px", height: $(canvas).height() + "px"});
    setTimeout(function () {
        ReactDOM.render(React.createElement(WorkloadInputComponent, null),
            document.getElementById("workload_input_container"))
    }, 1000);
    draw(canvas);
}

//-----获取响应元素
var canvas = document.getElementById("workload_canvas");
var toast = document.getElementById("workload_toast");
//-----数据配置存储类
var Workload = {
    Data: [],//数据
    type: 0,//类型,包括1,年,2,月,3,日,4自定义日期
    year: undefined,//年
    month: undefined,//月
    day: undefined,//存放当前选择日期
    days: undefined,//存放当前需要向服务器请求的日期数
    rectNum: 0,//存放需要在图上绘制的矩形个数
    mouseEvent: [],//时间绑定到这里

    id: User.id,//请求的id,默认是用户的id
    whichRequest: 0,//那个组织的工足量?0,默认,个人工作量,1,营业网点工作量

    width: function () {
        return $(canvas).width();
    },
    height: function () {
        return $(canvas).height();
    },
    offsetLeft: 40,
    offsetTop: 40,
    offsetRight: 40,
    offsetBottom: 40,
    arrowLength: 5,
    limitY: 0,
    unitLengthX: undefined,
    unitLengthY: function () {
        return (this.getYLength() - 40) / this.limitY;
    },
    getRectMaxH: function () {
        return this.getYLength() - 40;
    },
    getX: function (x) {
        return x + this.offsetLeft;
    },
    getY: function (y) {
        return this.height() - this.offsetBottom - y;
    },
    getXLength: function () {
        return this.width() - this.offsetLeft - this.offsetRight;
    },
    getYLength: function () {
        return this.height() - this.offsetTop - this.offsetBottom;
    },
    drawLine: function (context, x1, y1, x2, y2) {
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
    },
    setXLimit: function () {
        //this.rectNum = this.Data.length;
        switch (this.type) {
            case 0:
                Workload.unitLengthX = (Workload.getXLength() - 40) / 24;
                break;
            case 1:
                Workload.unitLengthX = (Workload.getXLength() - 40) / 62;
                break;
            case 2:
                Workload.unitLengthX = (Workload.getXLength() - 40) / 48;
                break;
            case 3:
                if (this.rectNum != undefined) {
                    Workload.unitLengthX = (Workload.getXLength() - 40) / (2 * this.rectNum);
                }
                break;
        }
    },
    init: function () {
        this.mouseEvent.length = 0;
        this.setXLimit();
        this.type = parseInt(this.type);
        this.year = parseInt(this.year);
        this.month = parseInt(this.month);
        this.day = parseInt(this.day);
        this.days = parseInt(this.days);
        this.rectNum = parseInt(this.rectNum);

        var dd = this.Data;
        this.limitY = Math.max.apply(null, dd);
    }
};

/**
 * 工作量容器
 */
var WorkloadInputComponent = React.createClass({displayName: "WorkloadInputComponent",
    getInitialState: function () {
        return {
            year: "2010",
            month: "1",
            day: "1",
            toDay: "",
        }
    },
    yearChange: function (e) {
        var value = e.target.value;
        this.setState({year: value});
        loadData(0, value);
    },
    monthChange: function (e) {
        var value = e.target.value;
        this.setState({month: value});
        loadData(1, this.state.year, value);
    },
    dayChange: function (e) {
        var value = e.target.value;
        this.setState({day: value});
        loadData(2, this.state.year, this.state.month, value);
    },
    inputBlur: function (e) {
        var value = e.target.value;
        if (value != "") {
            this.setState({toDay: value});
            loadData(3, this.state.year, this.state.month, this.state.day, value);
        }
    },
    render: function () {
        var month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        var year = [2010, 2011, 2012, 2013, 2014, 2015, 2016];
        var day = [];
        for (var i = 1; i <= 30; i++) {
            day.push(i);
        }
        return (
            React.createElement("div", null, 
                React.createElement("select", {onChange: this.yearChange, className: "form-control"}, 
                    
                        year.map(function (data, index) {
                            return React.createElement("option", {key: "option"+index, value: data}, data)
                        })
                    
                ), 
                React.createElement("select", {onChange: this.monthChange, className: "form-control"}, 
                    
                        month.map(function (data, index) {
                            return React.createElement("option", {key: "option"+index, value: data}, data)
                        })
                    
                ), 
                React.createElement("select", {onChange: this.dayChange, className: "form-control"}, 
                    
                        day.map(function (data, index) {
                            return React.createElement("option", {key: "option"+index, value: data}, data)
                        })
                    
                ), 
                React.createElement("input", {onBlur: this.inputBlur, type: "number", className: "form-control"})
            )
        );
    }
});

function loadData(type, year, month, day, toDay) {
    //type 1,year,2month,3day,4today
    //初始化workload类中的参数
    if (month < 10) {
        month = "0" + month;
    }
    if (day < 10) {
        day = "0" + day;
    }
    var fromTime = "";
    var days = 0;
    switch (type) {
        case 0:
            Workload.year = year;
            fromTime = year + "-01-01";
            Workload.days = 365;
            Workload.rectNum = 12;
            break;
        case 1:
            Workload.month = month;
            fromTime = year + "-" + month + "-01";
            Workload.days = 31;
            Workload.rectNum = 31;
            break;
        case 2:
            Workload.day = day;
            fromTime = year + "-" + month + "-" + day;
            Workload.days = 1;
            Workload.rectNum = 24;
            break;
        case 3:
            Workload.days = toDay;
            Workload.rectNum = toDay;
            fromTime = year + "-" + month + "-" + day;
            break;
    }

    var url = "";
    if (Workload.whichRequest == 0) {//0是个人工作量
        url = "/REST/Domain/getWork/employeeId/" + Workload.id + "/starttime/" + fromTime + "/days/" + Workload.days;
    } else if (Workload.whichRequest == 1) {//1是网点工作量
        url = "/REST/Domain/getWorkOfOutlets/outletId/" + Workload.id + "/starttime/" + fromTime + "/days/" + Workload.days;
    }

    
    Tools.myAjax({
        type: "get",
        url: url,
        success: function (data) {
            //通过时间区分工作量
            handleData(data, type);
        },
        error: function (data) {
            console.error(data);
            showDialog("dialog", "错误", "获取工作量错误fromtime:" + fromTime + "day:" + Workload.days, true);
        }
    });
}

function handleData(data, type) {
    var load = [];
    var i = 0;
    if (type == 0) {
        //统计一年中每个月的工作量
        for (i = 0; i < data.length; i++) {
            var dd = data[i];
            var month = new Date(dd.outTime).getMonth() + 1;
            if (load[month] == undefined) {
                load[month] = 1;
            } else {
                load[month]++;
            }
        }
    } else if (type == 1) {//月
        //统计一年中每个月的工作量
        for (i = 0; i < data.length; i++) {
            var dd = data[i];
            var day = new Date(dd.outTime).getDate();
            if (load[day] == undefined) {
                load[day] = 1;
            } else {
                load[day]++;
            }
        }
    } else if (type == 2) {//日
        for (i = 0; i < data.length; i++) {
            var dd = data[i];
            var hour = new Date(dd.outTime).getHours();
            if (load[hour] == undefined) {
                load[hour] = 1;
            } else {
                load[hour]++;
            }
        }
    } else if (type == 3) {
        for (i = 0; i < data.length; i++) {
            var dd = data[i];
            var day = new Date(dd.outTime).getDate();
            if (load[day] == undefined) {
                load[day] = 1;
            } else {
                load[day]++;
            }
        }
    }

    //把空值设为0
    if (type == 3) {
        for (i = 0; i <= parseInt(Workload.day) + parseInt(Workload.days); i++) {
            if (load[i] == undefined) {
                load[i] = 0;
            }
        }
    } else {
        for (i = 0; i <= Workload.rectNum; i++) {
            if (load[i] == undefined) {
                load[i] = 0;
            }
        }
    }
    Workload.Data = load;
    Workload.type = type;
    draw(canvas);
}


//type,0,代表年,1代表月,2代表日
//开始绘画
function draw(canvas) {
    var context = canvas.getContext("2d");
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, Workload.width(), Workload.height());
    context.font = "10px Georgia";

    lineXY(context);
    drawCloseButton(context);
    Workload.init();
    myClearInterval();
    drawPic(context);
}

function myClearInterval() {
    //清除所有动画
    for (var i = 0; i < time.length; i++) {
        clearInterval(time[i]);
    }
    time.length = 0;
}

function drawCloseButton(context) {
    var image = new Image();
    image.src = "../images/index/close.png";
    var imagex = Workload.width() - 37;
    var imagey = 5;
    if (image.complete) {
        context.drawImage(image, imagex, imagey);
    } else {
        image.onload = function () {
            context.drawImage(image, imagex, imagey);
        }
    }
}

//循环每一个矩形
function drawPic(context) {
    for (var i = 0; i <= Workload.rectNum; i++) {
        if (i == 0) {
            continue;
        }
        aniH(context, i, 0);
    }
    open();
}

//动画实现
//-----bug---动画进行中切换数据会出错
var time = [];
function aniH(context, i, hh) {
    var geadd = Workload.limitY / 2500;
    var getime = 10;
    var signTime = setInterval(function () {
        //通过i-1,把i==0,占用的空间去掉
        createRect(context, Workload.getX(Workload.unitLengthX * ((i - 1) * 2 + 1)), Workload.unitLengthX, hh += getime * geadd, i);
        if (hh >= (Workload.type == 3 ? Workload.Data[Workload.day + i - 1] : Workload.Data[i])) {
            window.clearInterval(signTime);
            createRect(context, Workload.getX(Workload.unitLengthX * ((i - 1) * 2 + 1)), Workload.unitLengthX, hh += getime * geadd, i, true);
        }
    }, 10);
    time.push(signTime);
}


//画出xy轴
function lineXY(context) {
    //画x,y轴
    context.beginPath();
    Workload.drawLine(context, Workload.getX(0), Workload.getY(0), Workload.getX(0), Workload.getY(Workload.getYLength()));
    Workload.drawLine(context, Workload.getX(0), Workload.getY(Workload.getYLength()), Workload.getX(0) - Workload.arrowLength, Workload.getY(Workload.getYLength()) + Workload.arrowLength);
    Workload.drawLine(context, Workload.getX(0), Workload.getY(Workload.getYLength()), Workload.getX(0) + Workload.arrowLength, Workload.getY(Workload.getYLength()) + Workload.arrowLength);
    context.fillText("工作量", Workload.getX(0), Workload.getY(Workload.getYLength()) - 5);
    context.stroke();


    Workload.drawLine(context, Workload.getX(0), Workload.getY(0), Workload.getX(Workload.getXLength()), Workload.getY(0));
    Workload.drawLine(context, Workload.getX(Workload.getXLength()), Workload.getY(0), Workload.getX(Workload.getXLength()) - Workload.arrowLength, Workload.getY(0) - Workload.arrowLength);
    Workload.drawLine(context, Workload.getX(Workload.getXLength()), Workload.getY(0), Workload.getX(Workload.getXLength()) - Workload.arrowLength, Workload.getY(0) + Workload.arrowLength);
    context.fillText("时间", Workload.getX(Workload.getXLength()) - 20, Workload.getY(0) - 20);
    context.stroke();

    //画xy轴上的字
    //y轴
    context.fillText(Workload.limitY + "", Workload.getX(-20), Workload.getY(Workload.getRectMaxH()));
    context.fillText("啦啦啦", 20, 80);

    context.stroke();
}

//创建矩形类,同时添加鼠标响应事件,同时把事件响应注册到数组里
function createRect(context, x, width, height, whichDay, isAddToEvent) {
    //每创建一个矩形就把它画出来
    var y = height * Workload.unitLengthY();
    if (isAddToEvent) {
        var o = new Object();
        o.x = x;
        o.width = width;
        o.height = height;
        o.whichDay = whichDay;
        o.y = Workload.getY(0) - y;
        o.mouseMove = function (e) {
            switch (Workload.type) {
                case 0:
                    toast.innerHTML = Workload.year + "-" + this.whichDay + " " + Workload.Data[this.whichDay] + "件";
                    break;
                case 1:
                    toast.innerHTML = Workload.year + "-" + Workload.month + "-" + this.whichDay + " " + Workload.Data[this.whichDay] + "件";
                    break;
                case 2:
                    toast.innerHTML = this.whichDay + "点" + Workload.Data[this.whichDay] + "件";
                    break;
                case 3:
                    toast.innerHTML = this.whichDay - 1 + Workload.day + "天" + Workload.Data[this.whichDay - 1 + Workload.day] + "件";
                    break;
            }
            toast.style.display = "block";
            toast.style.left = e.x + 20 + "px";
            toast.style.top = e.y + 20 + "px";
        };
        Workload.mouseEvent.push(o);
    }
    context.fillStyle = "#42b983";
    context.fillRect(x, Workload.getY(0) - y, width, y);
}
//添加事件到DOM上面
canvas.addEventListener("mousemove", function (e) {
    var onRect = false;
    //循环判断在哪个矩形上面
    for (var i = 0; i < Workload.mouseEvent.length; i++) {
        var x = e.clientX - e.target.offsetLeft;
        var y = e.clientY - e.target.offsetTop;
        var oo = Workload.mouseEvent[i];
        if (x >= oo.x && x <= oo.x + oo.width && y >= oo.y && y <= Workload.getY(0)) {
            oo.mouseMove(e);
            onRect = true;
        }
    }
    //如果鼠标不在任何一个矩形上面,那么让显示块消失
    if (!onRect) {
        toast.innerHTML = "";
        toast.style.display = "none";
    }
});
canvas.addEventListener("click", function (e) {
    //如果点击范围在关闭按钮上,那么关闭
    if (e.clientX - e.target.offsetLeft >= Workload.width() - 37 && e.clientY - e.target.offsetTop <= 37) {
        close();
    }
});

function close() {
    $(canvas).attr("class", "workload_canvas");
    ReactDOM.render(React.createElement(EmptyComponent, null),
        document.getElementById("workload_input_container"))
}

function open() {
    $(canvas).attr("class", "workload_canvas_on workload_canvas");
}
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
 * 打包按钮
 */
var PackageIn = React.createClass({displayName: "PackageIn",
    propTypes: {
        packageInClick: React.PropTypes.func
    },
    getInitialState: function () {
        return null;
    },
    onClick: function () {
        if (User.job == 3) {//如果是司机那么直接弹出司机绑定包裹弹窗
            driverDialog();
        } else {
            this.props.packageInClick();
        }
    },
    render: function () {
        return (
            React.createElement("div", {className: "col-xs-6 send_express_button", onClick: this.onClick}, 
                React.createElement("div", {className: "package_in_icon_container"}, 
                    React.createElement("img", {src: "../images/employee/package_in.png"})
                ), 
                React.createElement("p", {className: "send_express_text"}, "打包")
            )
        );
    }
});

/**
 * 司机点击打包后弹出
 */
function driverDialog() {
    var packageID;

    function sureButtonClick() {
        if (packageID != undefined && !isNaN(packageID) && packageID != "") {
            //把包裹和司机绑定
            Tools.myAjax({
                type: "get",
                url: "/REST/Domain/setDriverPackage/employeeId/" + User.id + "/packageId/" + packageID,
                success: function (data) {
                    if (data.state == "1") {
                        showDialog("dialog", "恭喜", "您获取包裹成功,请上路,别忘了开启手机客户端上传路径", true);
                    } else {
                        showDialog("dialog", "警告", "获取包裹失败,请检查包裹号是否正确", true);
                    }
                },
                error: function (data) {
                    console.error(data);
                    showDialog("dialog", "错误", "包裹绑定给司机出错,请重试", true);
                }
            })
        } else {
            showDialog("diaolg", "警告", "包裹号不可以为空和非数字字符", true);
        }
    }

    function onChange(e) {
        packageID = e.target.value;
    }

    var inputStyle = {width: "100%"};
    showDialog("dialog", "提示", (
        React.createElement("input", {onChange: onChange, style: inputStyle, placeholder: "请输入包裹ID"})
    ), true, sureButtonClick, null, null, false);
}

/**
 * 拆包按钮
 */
var PackageOut = React.createClass({displayName: "PackageOut",
    propTypes: {
        packageOutClick: React.PropTypes.func
    },
    render: function () {
        return (
            React.createElement("div", {className: "col-xs-6 express_history_container", onClick: this.props.packageOutClick}, 
                React.createElement("div", {className: "express_history_icon_container"}, 
                    React.createElement("img", {src: "../images/employee/package_out.png"})
                ), 
                React.createElement("div", {className: "express_history_text"}, "拆包")
            )
        );
    }
});

/**
 * 我是经理
 */
var ManagerButton = React.createClass({displayName: "ManagerButton",
    propTypes: {
        addressClick: React.PropTypes.func
    },
    handleClick: function () {
        if (User.job == 4) {
            this.props.managerClick();
        } else {
            showDialog("dialog", "警告", "只有经理才有权限进入", true);
        }
    },
    render: function () {
        return (
            React.createElement("div", {className: "col-xs-6 address_button_container", onClick: this.handleClick}, 
                React.createElement("div", {className: "address_button_icon_container"}, 
                    React.createElement("img", {src: "../images/main/manager.png"})
                ), 
                React.createElement("div", {className: "address_button_text"}, "我是经理")
            )
        )
    }
});

/**
 * 查看工作记录
 */
var CheckWorkloadButton = React.createClass({displayName: "CheckWorkloadButton",
    render: function () {
        return (
            React.createElement("div", {className: "col-xs-6 myinfo_button_container", onClick: this.props.onCheckWorkload}, 
                React.createElement("div", {className: "myinfo_button_icon_container"}, 
                    React.createElement("img", {src: "../images/main/workload.png"})
                ), 
                React.createElement("div", {className: "myinfo_button_text"}, "查看工作量")
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
    getDefaultProps: function () {
        return {
            child1:[],
            child2:[],
            child3:[],
        }
    },
    componentWillReceiveProps: function () {
        console.info("updata");
    },
    render: function () {
        return (
            React.createElement("div", {className: "button-container"}, 
                React.createElement("div", {key: "row1", className: "row first_button_container"}, 
                    this.props.child1.map(function (data, index) {
                        return data
                    })
                ), 
                React.createElement("div", {key: "row2", className: "row second_button_container"}, 
                    this.props.child2.map(function (data, index) {
                        return data
                    })
                ), 
                this.props.child3.map(function (data, index) {
                    return data
                })
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
                    React.createElement(ButtonContainer, {
                        child1: [
                            React.createElement(PackageIn, {key: "packagein", packageInClick: this.handlePackageInClick}),
                            React.createElement(PackageOut, {key: "packageout", packageOutClick: this.handlerPackageOutClick})
                        ], 
                        child2: [
                            React.createElement(ManagerButton, {key: "managerbutton", managerClick: this.handleManaberClick}),
                            React.createElement(CheckWorkloadButton, {key: "checkworkload", onCheckWorkload: this.onCheckWorkload})
                        ], 
                        key: "buttoncontainer"}
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
    handlePackageInClick: function () {
        if (!User.isLogin) {
            showDialog("dialog", "警告", "登录后才能打包", true);
            return;
        }
        if(User.job == 4){
            showDialog("dialog","警告","经理不可以打包",true);
            return;
        }

        this.setState({
            child: [
                React.createElement(Package, {isPackageIn: true, onCloseClick: this.onCloseClick, key: "packagein"})
            ]
        });
    }
    ,
    handlerPackageOutClick: function () {
        if (!User.isLogin) {
            showDialog("dialog", "警告", "登录后拆包", true);
            return;
        }
        if(User.job == 4){
            showDialog("dialog","警告","经理不可以拆包",true);
        }
        this.setState({
            child: [
                React.createElement(Package, {key: "packageout", onCloseClick: this.onCloseClick, isPackageIn: false})
            ]
        })
    }
    ,
    handleManaberClick: function () {
        if (!User.isLogin) {
            showDialog("dialog", "警告", "登录后才能管理地址", true);
            return;
        }
        this.setState({
            child: [
                React.createElement(ManagerComponent, {onCloseClick: this.onCloseClick, key: "managecomponent"}),
            ]
        })
    },
    onCheckWorkload: function () {
        if(User.isLogin) {
            showWorkload();
        }else{
            showDialog("dialog", "警告", "登录后才能查看工作量", true);
        }
    },
    getInitialState: function () {
        User.Main = this;

        var init = {
            child: [
                React.createElement(ButtonContainer, {
                    child1: [
                            React.createElement(PackageIn, {key: "packagein", packageInClick: this.handlePackageInClick}),
                            React.createElement(PackageOut, {key: "packageout", packageOutClick: this.handlerPackageOutClick})
                        ], 
                    child2: [
                            React.createElement(ManagerButton, {key: "managerbutton", managerClick: this.handleManaberClick}),
                            React.createElement(CheckWorkloadButton, {key: "checkworkload", onCheckWorkload: this.onCheckWorkload})
                        ], 
                    key: "buttoncontainer"}
                )
            ]
        };
        return init;
    },
    render: function () {
        return (
            React.createElement("div", {className: "container col-sm-6 col-md-4 main"}, 
                React.createElement(UserInfo, {key: "userinfo"}), 
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
    componentDidMount: function () {
    },
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