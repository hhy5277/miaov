/**
 * Created by oukai on 2017/5/11.
 */
var initNum = 0;
switch( text ){
    case 'example' : initNum = 5;//案例
        break;
    case 'work' : initNum = 5;//学员作品
        break;
    case 'about' : initNum = 0;//关于我们
        break;
    case 'course' : initNum = 1;//课程
        break;
    case 'main' : initNum = 0;//首页
        break;
    case 'message' : initNum = 0;//留言
        break;
    case 'news' : initNum = 0;//新闻
        break;
    case 'vip' : initNum = 2;//vip
        break;
    case 'video':initNum = 2;//vip视频列表
        break;
    case 'newsDetail':initNum = 0;//关于我们
        break;
    case 'notice':initNum = 0;//关于我们
        break;
}
$('#navLogin').on('click',function () {
    $.ajax({
        url:"http://2017.miaov.com/account/ajax/checklogin",
        type:'get',
        dataType: 'JSONP',
        jsonpCallback:"cb",
        success:function(data){
            if(data.type==-1){
                window.location.href = 'http://2017.miaov.com/login?ref='+refstatusUrl+'&refstatus='+refstatus;
            }else{
                window.location.href = "http://www.miaov.com/api.php/user/thirdConnect?code="+data.data+"&&refstatus="+refstatus;
            }
        },
        error:function(data){

        }
    });
});
$('#navRegister').on('click',function () {
    $.ajax({
        url:"http://2017.miaov.com/account/ajax/checklogin",
        type:'get',
        dataType: 'JSONP',
        jsonpCallback:"cb",
        success:function(data){
            if(data.type==-1){
                window.location.href = 'http://2017.miaov.com/signup?ref='+refstatusUrl+'&refstatus='+refstatus;
            }else{
                window.location.href = "http://www.miaov.com/api.php/user/thirdConnect?code="+data.data+"&&refstatus="+refstatus;
            }
        },
        error:function(data){

        }
    });
});