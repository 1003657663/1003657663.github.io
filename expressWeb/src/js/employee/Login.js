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
        addCookie("employee_username", name);
        addCookie("employee_token", data.token);
        addCookie("employee_isLogin", "true");
        addCookie("employee_name", name);
        addCookie("employee_telephone", config.telephone);
        addCookie("employee_password", config.password);
        addCookie("employee_id", data.id);
        addCookie("employee_text", data.jobText);
        addCookie("employee_job", data.job);
        addCookie("employee_outletsId", data.outletsId);
        addCookie("employee_status", data.status);

        User.login(
            name, config.telephone, config.password, data.token, data.id,
            data.job, data.jobText, data.outletsId, data.status
        );

    }
}