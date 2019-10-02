const logon = document.getElementsByClassName('logon')[0];
const reg = document.getElementsByClassName('reg')[0];//登录界面
const reg1 = document.getElementsByClassName('reg1')[0];//注册界面
const reg2 = document.getElementsByClassName('reg2')[0];//游客登陆界面
const ipts = reg.querySelectorAll('input');
const inps = reg1.querySelectorAll('input');
const inpBtn = reg2.querySelectorAll('input');
const tips = document.getElementsByClassName('tips')[0];
const name = tips.getElementsByClassName('name')[0];//提示用户名
const pas = tips.getElementsByClassName('pas')[0];//提示密码
const reg3 = document.getElementsByClassName('reg3')[0];
const phones = reg3.querySelectorAll('input');
const reg4 = document.getElementsByClassName('reg4')[0];//忘记密码
const restarts = reg4.querySelectorAll('input');
const forget = document.getElementById('forget');
const imgs = document.getElementsByClassName('img');//all img
const close = document.getElementsByClassName('close')[0];
const backs = document.getElementsByClassName('back');//返回图片
const btnQY = document.getElementById('btnQY');
const btnQ = document.getElementById('btnQ');
const aQy1 = document.getElementById('aQy1');
const qy1 = document.getElementById('qy1');
//小弹框
const layer = document.getElementById('layer');
const msk = document.querySelector('.msk');
const tip_txt = document.getElementById('tip_txt');
const btn_cls = document.getElementById('btn_cls');
const btn_cfrm = document.getElementById('btn_cfrm');
document.ondblclick = function(){
    logon.style.display = 'none';
    reg.style.display = 'block';
};
/*********************登陆界面************/
aQy.onclick = function(){//登陆进入游戏
    let iptVal = ipts[0].value;
    let iptVal1 = ipts[1].value;
    if(!iptVal || !iptVal1){
        layer.style.display = msk.style.display = 'block';
        tip_txt.innerText = '请输入帐户名和密码';
    }else if(!isNaN(iptVal)) {
        layer.style.display = msk.style.display = 'block';
        tip_txt.innerText = '账户必须是数字和字母的结合';
    } else{
        reg.style.display = 'none';
        aQy.setAttribute('href','mapIndex.html');
    }

};
//忘记密码
forget.onclick = function(){
    reg.style.display = 'none';
    reg4.style.display = 'block';
};
//游客登陆
ipts[2].onclick = function(){//游客登陆界面出现 自己消失
    reg2.style.display = 'block';
    reg.style.display = 'none';
};
//注册
ipts[3].onclick = function(){//注册界面出现 自己消失
    reg1.style.display = 'block';
    reg.style.display = 'none';
};
//账户安全
ipts[4].onclick = function(){
    reg.style.display = 'none';
    reg3.style.display = 'block';
};
/***************注册界面*********/
inps[4].onclick = function(){
    const protocol = reg1.getElementsByClassName('protocol');//用户协议
    let inpVal = inps[0].value;
    let inpVal1 = inps[1].value;
    let inpVal2 = inps[2].value;
    let inpVal3 = inps[3].value;
    if(!inpVal){
        layer.style.display = msk.style.display = 'block';
        tip_txt.innerText = '请输入注册的用户名和密码';
    }else if(!inpVal1 || !inpVal2 || !inpVal3){
        layer.style.display = msk.style.display = 'block';
        tip_txt.innerText = '账户、密码、邮箱一个都不能少哟！';
    }else if(!isNaN(inpVal)){
        layer.style.display = msk.style.display = 'block';
        tip_txt.innerText = '账户必须是数字和字母的结合';
    }else if(inpVal[0] === ' ' || inpVal[inpVal.length-1] === ' ' ){
        layer.style.display = msk.style.display = 'block';
        tip_txt.innerText = '前后不能有空格';
    }else if(inpVal1 !== inpVal2){
        layer.style.display = msk.style.display = 'block';
        tip_txt.innerText = '请输入的密码必须至少6位';
    }else if (!check_email(inpVal3)){
        layer.style.display = msk.style.display = 'block';
        tip_txt.innerText = '请输入正确的邮箱';
    } else{
            tips.style.display = 'block';
            name.innerText = inpVal;
            pas.innerText = inpVal1;
    }
};

/****************游客登陆界面**************/
aQy1.onclick = function(){//继续  进入游戏
    reg2.style.display = 'none';
    aQy1.setAttribute('href','mapIndex.html');
} ;
inpBtn[0].onclick = function(){//转注册
    reg1.style.display = 'block';
    reg2.style.display = 'none';
};
//
qy1.onclick = function(){
    reg1.style.display = 'block';
    reg2.style.display = 'none';
};
/****************账户安全界面**********************/
phones[3].onclick = function(){
  let val1 = phones[0].value;
  let val2 = phones[1].value;
  if(!val1){
      layer.style.display = msk.style.display = 'block';
      tip_txt.innerText = '请输入手机号并获取验证码，绑定账户';
  }else if(val1[0] !== '1' || val1.length !== 11){
      layer.style.display = msk.style.display = 'block';
      tip_txt.innerText = '请输入正确的手机号';
  }else if(val2 !== '111111'){
      layer.style.display = msk.style.display = 'block';
      tip_txt.innerText = '请输入正确的验证码';
  } else{
      reg3.style.display = 'none';
      reg.style.display = 'block';

  }
};
/*******************忘记密码**********************************/
restarts[4].onclick = function(){
    let val1 = restarts[0].value;
    let val2 = restarts[1].value;
    let val3 = restarts[2].value;
    if(!val1){
        layer.style.display = msk.style.display = 'block';
        tip_txt.innerText = '请输入手机号并获取验证码，绑定账户';
    }else if(val1[0] !== '1' || val1.length !== 11){
        layer.style.display = msk.style.display = 'block';
        tip_txt.innerText = '请输入正确的手机号';
    }else if(val2 !== '111111'){
        layer.style.display = msk.style.display = 'block';
        tip_txt.innerText = '请输入正确的验证码';
    }else if(!val3){
        layer.style.display = msk.style.display = 'block';
        tip_txt.innerText = '请重新输入密码';
    } else{
      reg4.style.display = 'none';
      reg.style.display = 'block';

    }
};
/********************tips**********************/
close.onclick = function(){
    tips.style.display = 'none';
    reg1.style.display = 'none';
    reg.style.display = 'block';
};
/***************函数*******************/
//判断邮箱中的数组
function len_check(arr){
    if(arr.length === 2) {
        if (arr[0].length > 0 && arr[1].length > 0) {
            return true;
        }
        else{
            return false;
        }
    }
    else{
        return false;
    }
}
//判断邮箱
function check_email(i){
    let a = i.split('@');
    if (len_check(a)){
        if (len_check(a[1].split('.'))){
            return true;
        } else{
            return false;
        }
    } else{
        return false
    }
}
//验证码1分钟
var wait=60;
function time(o) {
    if (wait == 0) {
        o.removeAttribute("disabled");
        o.value="免费获取验证码";
        wait = 60;
    } else {
        o.setAttribute("disabled", true);
        o.value="重新发送(" + wait + ")";
        wait--;
        setTimeout(function() {
                time(o)
            },
            1000)
    }
}
btnQY.onclick=function(){
    let val1 = phones[0].value;
    if(!val1){
        layer.style.display = msk.style.display = 'block';
        tip_txt.innerText = '请输入手机号并获取验证码，绑定账户';
    }else if(val1[0] !== '1' || val1.length !== 11){
        layer.style.display = msk.style.display = 'block';
        tip_txt.innerText = '请输入正确的手机号';
    } else{
        time(this)
    }

};
btnQ.onclick = function(){
    let val1 = phones[0].value;
    console.log(val1);
    if(!val1) {
        layer.style.display = msk.style.display = 'block';
        tip_txt.innerText = '请输入手机号并获取验证码，绑定账户';
    }else{
        time(this)
    }
};
/*****************返回*********************/
backs[0].onclick = function(){
    reg.style.display = 'block';
    reg1.style.display = 'none';
};
backs[1].onclick = function(){
    reg.style.display = 'block';
    reg2.style.display = 'none';
};
backs[2].onclick = function(){
    reg.style.display = 'block';
    reg3.style.display = 'none';
};
backs[3].onclick = function(){
    reg.style.display = 'block';
    reg4.style.display = 'none';
};
btn_cls.onclick = function(){
    layer.style.display = msk.style.display = 'none';
};
//皮卡丘音效
imgs[0].onclick = function() {
    let isPlaying = false;
    play();
    //music
    function play() {
        let player = document.querySelector('#test');
        if (isPlaying) {
            // 如果正在播放, 停止播放并停止读取此音乐文件
            player.pause();
            player.src = '';
        } else {
            player.src = 'music/pkq.mp3';
            player.play();
        }
    }
};