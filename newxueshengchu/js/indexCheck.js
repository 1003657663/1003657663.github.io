/**
 * Created by chao on 2016/4/30.
 */
function isMoOrPC(){
    var state = "";
    if(state == "") {
        if (screen && screen.width > 750) {
            //if (document.body.offsetWidth > 750) {
            if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
                var msViewportStyle = document.createElement('style');
                msViewportStyle.appendChild(
                    document.createTextNode(
                        '@-ms-viewport{width:auto!important}'
                    )
                );
                document.querySelector('head').appendChild(msViewportStyle)
            }

            //平台、设备和操作系统
            var system = {
                win: false,
                mac: false,
                xll: false,
                ipad: false
            };
            //检测平台
            var p = navigator.platform;
            system.win = p.indexOf("Win") == 0;
            system.mac = p.indexOf("Mac") == 0;
            system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);
            system.ipad = (navigator.userAgent.match(/iPad/i) != null) ? true : false;
            //跳转语句
            if (system.win || system.mac || system.xll || system.ipad) {
                //电脑
                state =  "pc";
            } else {
                state = "mo";
            }
        } else {
            //手机
            state = "mo";
        }
    }
    return state;
}

//判断是否是低版本IE
if(isMoOrPC() == "pc") {
    var isIELow = false;
    if (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.indexOf("MSIE 6.0") > 0) {
        isIELow = true;
    }
    else if (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.indexOf("MSIE 7.0") > 0) {
        isIELow = true;
    }
    else if (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.indexOf("MSIE 8.0") > 0) {
        isIELow = true;
    }
    else if (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.indexOf("MSIE 5.0") > 0) {
        isIELow = true;
    }
}