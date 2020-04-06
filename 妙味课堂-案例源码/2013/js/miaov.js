//这是个运动库miaov.js,有请能比较具体的解释下下面的代码，小弟无材大部份不能理解

function css(obj, attr, value){
    if(arguments.length==2)//这是是什么，上面的函数不是三个参数都指定要写的吗，为什么现在要判断这些
    return parseFloat(obj.currentStyle?obj.currentStyle[attr]:document.defaultView.getComputedStyle(obj, false)[attr]);
    else if(arguments.length==3)
        switch(attr){
            case 'width':
            case 'height':
            case 'paddingLeft':
            case 'paddingTop':
            case 'paddingRight':
            case 'paddingBottom':
            value=Math.max(value,0);//这个东西还不能删除，删除了不运动了，求解
            case 'left':
            case 'top':
            case 'marginLeft':
            case 'marginTop':
            case 'marginRight':
            case 'marginBottom':
            obj.style[attr]=value+'px';
            break;
            case 'opacity':
            obj.style.filter="alpha(opacity:"+value*100+")";
            obj.style.opacity=value;
            break;
            default:
            obj.style[attr]=value;
        }
    return function (attr_in, value_in){//这个有大虾说是递归，我不明白这个是什么意义
        css(obj, attr_in, value_in)
    };
}

var MIAOV_MOVE_TYPE={
    BUFFER: 1,
    FLEX: 2
};

function miaovStartMove(obj, oTarget, iType, fnCallBack, fnDuring){//这五个参数，后面两个有什么作用(回调，回调的意义是什么)
    var fnMove=null;
    if(obj.timer){clearInterval(obj.timer);}
    
    switch(iType){
        case MIAOV_MOVE_TYPE.BUFFER:
            fnMove=miaovDoMoveBuffer;
            break;
        case MIAOV_MOVE_TYPE.FLEX:
            fnMove=miaovDoMoveFlex;
            break;
    }
    
    obj.timer=setInterval(function (){
        fnMove(obj, oTarget, fnCallBack, fnDuring);
    }, 15);
}

function miaovDoMoveBuffer(obj, oTarget, fnCallBack, fnDuring){//这个运动的方式能不能说下
    var bStop=true;
    var attr='';
    var speed=0;
    var cur=0;
    
    for(attr in oTarget){
        cur=css(obj, attr);
        if(oTarget[attr]!=cur){
            bStop=false;
            speed=(oTarget[attr]-cur)/5;
            speed=speed>0?Math.ceil(speed):Math.floor(speed);
            css(obj, attr, cur+speed);
        }
    }
    
    if(fnDuring)fnDuring.call(obj);
    
    if(bStop){
        clearInterval(obj.timer);
        obj.timer=null;
        if(fnCallBack)fnCallBack.call(obj);
    }
}

function miaovDoMoveFlex(obj, oTarget, fnCallBack, fnDuring){
    var bStop=true;
    var attr='';
    var speed=0;
    var cur=0;
    
    for(attr in oTarget){
        if(!obj.oSpeed)obj.oSpeed={};
        if(!obj.oSpeed[attr])obj.oSpeed[attr]=0;
        cur=css(obj, attr);
        if(Math.abs(oTarget[attr]-cur)>1 || Math.abs(obj.oSpeed[attr])>1){
            bStop=false;
            obj.oSpeed[attr]+=(oTarget[attr]-cur)/5;
            obj.oSpeed[attr]*=0.7;
            var maxSpeed=65;
            if(Math.abs(obj.oSpeed[attr])>maxSpeed){
                obj.oSpeed[attr]=obj.oSpeed[attr]>0?maxSpeed:-maxSpeed;
            }
            
            css(obj, attr, cur+obj.oSpeed[attr]);
        }
    }
    
    if(fnDuring)fnDuring.call(obj);
    
    if(bStop){
        clearInterval(obj.timer);
        obj.timer=null;
        if(fnCallBack)fnCallBack.call(obj);
    }
}

//下面是实现运动效果的js
<script type="text/javascript" src="miaov.js"></script>
<script type="text/javascript">
function getByClass(oParent, sClass)
{
    var aEle=oParent.getElementsByTagName('*');
    var aResult=[];
    var i=0;
    for(i=0;i<aEle.length;i++){
        if(aEle[i].className==sClass){aResult.push(aEle[i]);}
    }
    return aResult;
}

window.onload=function (){
    var oDiv=document.getElementById('div1');
    var aLi=getByClass(oDiv, 'miaov_box_head')[0].getElementsByTagName('li');
    var aBtn=getByClass(oDiv, 'miaov_box_foot')[0].getElementsByTagName('a');
    var oCaret=getByClass(oDiv, 'caret')[0];
    var aPos=[];
    var timer=null;
    var i=0;
    
    for(i=0;i<aLi.length;i++){
        aLi[i].index=i;
        aPos[i]=aLi[i].offsetLeft;
    }
    for(i=0;i<aLi.length;i++){
        aLi[i].style.position='absolute';
        aLi[i].style.left=aPos[i]+'px';
    }
    
    aBtn[0].onclick=function (){
        var i=aLi.length-1;
        clearTimeout(timer);
        function next(){
            var obj=aLi[i];
            if(i>=aLi.length/2){
                miaovStartMove(aLi[i], {left: 900}, MIAOV_MOVE_TYPE.FLEX);
                timer=setTimeout(next, 100);
                i--;
            }else{
                timer=setTimeout(next2, 200);
            }
        }
        
        function next2(){
            if(i>=0){
                miaovStartMove(aLi[i], {left: aPos[i]}, MIAOV_MOVE_TYPE.FLEX);
                timer=setTimeout(next2, 100);
            }
            i--;
        }
        next();
        aBtn[1].className='';
        this.className='show';
        miaovStartMove(oCaret, {left: this.offsetLeft+this.offsetWidth/2}, MIAOV_MOVE_TYPE.BUFFER);
    };
    
    aBtn[1].onclick=function (){
        var i=0;
        clearTimeout(timer);
        function next(){
            var obj=aLi[i];
            if(i<=aLi.length/2-1){
                miaovStartMove(aLi[i], {left: -200}, MIAOV_MOVE_TYPE.FLEX);
                timer=setTimeout(next, 100);
                i++;
            }else{
                timer=setTimeout(next2, 200);
            }
        }
        
        function next2(){
            if(i<aLi.length){
                miaovStartMove(aLi[i], {left: aPos[i-aLi.length/2]}, MIAOV_MOVE_TYPE.FLEX);
                timer=setTimeout(next2, 100);
            }
            i++;
        }
        next();
        aBtn[0].className='';
        this.className='show';
        miaovStartMove(oCaret, {left: this.offsetLeft+this.offsetWidth/2}, MIAOV_MOVE_TYPE.BUFFER);
    };
};
</script>

<style type="text/css">
*{margin:0;padding:0;}
body{background:#EBEBED;_position:relative;_height:100%;}
img{border:none;display:block;}
li{list-style:none;}
.page{
    -webkit-box-shadow: rgba(0,0,0,0.3) 0 1px 3px;
    -moz-box-shadow: rgba(0,0,0,0.3) 0 1px 3px;
    box-shadow: rgba(0,0,0,0.3) 0 1px 3px; 
    background:#FFFFFF;
    border-color: #E5E5E5 #DBDBDB #D2D2D2;
    border-style: solid;
    border-width: 1px;
    margin:5px auto 0;
    width:980px;
}
.miaov_box{
    overflow:hidden;
    position: relative;
    width: 820px;
    z-index: 0;
    height:158px;
    margin: 0 70px;
}
.miaov_box_head{
    width: 1680px;    
}
.miaov_box_head li{
    width:140px; 
    float:left;
    text-align: center;
}
a{
    text-decoration:none;
    font: 12px/18px "Lucida Grande","Lucida Sans Unicode",Helvetica,Arial,Verdana,sans-serif;
    color:#7F7F7F;
}
.miaov_box_head li a:hover{color:#333;}
.miaov_box_foot{
    height:30px; 
    text-align:center; 
    background:#fff; 
    overflow:hidden;
    background:url(img/nav_bg.png) no-repeat 0 0;
    background:-moz-linear-gradient(center bottom, rgba(223,223,223,1) 0%, rgba(242,242,242,1) 66%, rgba(242,242,242,1) 90%, rgba(230,230,230,1) 93%, rgba(190,190,190,1) 96%, rgba(150,150,150,1) 100%);
    background:-webkit-gradient(linear, left bottom, left top, from(rgba(223,223,223,1)), color-stop(66%, rgba(242,242,242,1)), color-stop(90%, rgba(242,242,242,1)), color-stop(93%, rgba(230,230,230,1)), color-stop(96%, rgba(210,210,210,1)), to(rgba(140,140,140,1)));
    border-bottom:1px solid #ebebeb;
    position:relative;
}
.caret{
    background: url(img/caret_active.gif) no-repeat scroll 0 0;
    display: block;
    height: 8px;
    margin: 0 0 -8px -7px;
    position: absolute;
    width: 15px;
}
.miaov_box_foot a{
     display: inline-block;
    margin: 0 15px;
    padding: 8px 0 6px;
    cursor:pointer;
    text-shadow: 0 1px 0 #FFFFFF;
}
.miaov_box_foot .show{
    cursor: default;
    color:#2B2B2B;    
}
.miaov_box_foot a:hover{color:#000;}
.miaov{height:36px;line-height:26px;text-align:center;position:fixed;_position:absolute;bottom:0;width:100%;}
.miaov a{color:#777;font-size:16px;}
.miaov a:hover{color:#555;}
.miaov_head{height:36px;width:980px;overflow:hidden;margin:0 auto;}
.miaov_head .left{float:left;}
.miaov_head .right{float:right;}
.miaov_head a{line-height:36px;color:#777;}
.miaov_head a:hover{color:#555;}
</style>

<div id="div1" class="page">
    <div class="miaov_box">
            <ul class="miaov_box_head">
                <li><a href="http://www.miaov.com"><img src="img/1.jpg" alt=""/>iPod shuffle</a></li>
                <li><a href="http://www.miaov.com"><img src="img/2.jpg" alt=""/>iPod nano</a></li>
                <li><a href="http://www.miaov.com"><img src="img/3.jpg" alt=""/>iPod classic</a></li>
                <li><a href="http://www.miaov.com"><img src="img/4.jpg" alt=""/>iPod touch</a></li>
                <li><a href="http://www.miaov.com"><img src="img/5.jpg" alt=""/>Apple TV</a></li>
                <li><a href="http://www.miaov.com"><img src="img/6.jpg" alt=""/>Accessories</a></li>
                <li><a href="http://www.miaov.com"><img src="img/7.jpg" alt=""/>Download iTunes 10</a></li>
                <li><a href="http://www.miaov.com"><img src="img/8.jpg" alt=""/>iTunes Gift Cards</a></li>
                <li><a href="http://www.miaov.com"><img src="img/9.jpg" alt=""/>Nike + iPod</a></li>
                <li><a href="http://www.miaov.com"><img src="img/10.jpg" alt=""/>(PRODUCT) RED</a></li>
                <li><a href="http://www.miaov.com"><img src="img/11.jpg" alt=""/>MobileMe</a></li>
                <li><a href="http://www.miaov.com"><img src="img/12.jpg" alt=""/>In-Ear Headphones</a></li>
            </ul>
    </div>
    <div class="miaov_box_foot">
        <span style="left: 424px;" class="caret"></span>
        <a class="show">Products</a>
        <a>iTunes and more</a>
    </div>
</div>