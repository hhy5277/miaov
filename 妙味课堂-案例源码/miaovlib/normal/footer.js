/**
 * Created by oukai on 2017/5/11.
 */
$(function(){
    var menuNum = 0;
    switch( text ){
        case 'example' : menuNum = 5;//案例
            break;
        case 'work' : menuNum = 5;//学员作品
            break;
        case 'about' : menuNum = 0;//关于我们 4
            break;
        case 'course' : menuNum = 1;//课程
            break;
        case 'main' : menuNum = 0;//首页
            break;
        case 'message' : menuNum = 0;//留言 6
            break;
        case 'news' : menuNum = 0;//新闻
            break;
        case 'vip' : menuNum = 2;//vip
            break;
        case 'video':menuNum = 2;//vip视频列表
            break;
    }
    $('input').attr('autocomplete','off');
    if(document.getElementById('nav')){test.overArea.menu({obj:$('.nav li').eq(menuNum)});}
//		$(document).scrollTop(0);
    if(text!=='video') {
        $('body,html').animate({scrollTop: 0}, 100);
    }

    if(text!='main'){
        noticeFn()
    }
});
function noticeFn() {
    var oUl = $('.notifyBox ul');
    var aLi = oUl.find('li');
    var width = 20;
    for(var i=0;i<aLi.length;i++){
        width += Math.ceil(aLi.eq(i).width())+100;
    }
    oUl.width(width);
    var noticeLeft = parseInt(oUl.css('left'));
    var initLeft = 0;
    for(var i=0;i<3;i++){
        initLeft += Math.ceil(aLi.eq(i).width())+100;
    }
    var noticeTime = setInterval(noticeMove,100);
    oUl.on('mouseenter',function () {
        clearInterval(noticeTime);
    });
    oUl.on('mouseleave',function () {
        noticeTime = setInterval(noticeMove,100)
    });
    function noticeMove() {
        noticeLeft-=3;
        if(noticeLeft<=-initLeft){
            noticeLeft = 0;
        }
        oUl.css('left',noticeLeft);
    }
}