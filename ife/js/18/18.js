

var queue = [];
//初始化
function init(){
    var leftIn = document.getElementById("left-in");
    var rightIn = document.getElementById("right-in");
    var leftOut = document.getElementById("left-out");
    var rightOut = document.getElementById("right-out");
    var inp = document.getElementById("inp");

    leftIn.onclick = function(){
        var num = inp.value;
        if(check(num)) {
            queue.push(num);
            write();
        }else{
            alert("只能是数字");
        }
    };
    rightIn.onclick = function(){
        var num = inp.value;
        if(check(num)) {
            queue.unshift(num);
            write();
        }else{
            alert("只能是数字");
        }
    };
    leftOut.onclick = function(){
        alert(queue.pop());
        write();
    };
    rightOut.onclick = function(){
        alert(queue.shift());
        write();
    }
}
//添加检测
function check(num){
    var reg = /^[0-9]*$/;
    if(reg.test(num)){
        return true;
    }else{
        return false;
    }
}
//渲染
function write(){
    var main = document.getElementById("main");
    main.innerHTML = "";
    for(var i=queue.length-1;i>=0;i--){
        var but = document.createElement("button");
        but.innerText = queue[i];
        main.appendChild(but);
        but.onclick = function(ev){
            var h = 0;
            for(h=0;h<main.children.length;h++){
                if(main.children[h] == ev.target){
                    break;
                }
            }
            queue.splice(queue.length-h-1,1);
            write();
        }
    }
}

init();