/**
 * Created by Administrator on 2015/9/16.
 */
var Json = {
    project:[
        {
            name:'色块翻转',
            date:'2015.9',
            detail:'一款娱乐的小游戏，只要将每一关关卡中的所有黄色快变成蓝色块就完成了这个项目，每点击一个色块，这个方块的颜色会变换，并且，与它四边相邻的方块的颜色也会变换。',
            image:['images/photo/1/1.png','images/photo/1/2.png','images/photo/1/3.png','images/photo/1/4.png'],
            link:'www.miaov.com/student/ldd/sekuaifanzhuan'
        },
        {
            name:'图片配对',
            date:'2015.9',
            detail:'整个过程利用随机数组打乱所有牌的顺序，存储这个数组，游戏区域中每个方块所在的索引值就是这个随机数组的索引值。每两次点击 进行一次比较，因为用到css3的技术 ，所以最好用谷歌、火狐来玩耍。等级的选项是要增加随机数组的长度。',
            image:['images/photo/2/1.png','images/photo/2/2.png','images/photo/2/3.png','images/photo/2/4.png'],
            link:'www.miaov.com/student/ldd/peidui'
        },
        {
            name:'扫雷',
            date:'2015.9',
            detail:'一款较老的小游戏，用了自己封装的tdn.js的库完成游戏的开发，为了贴近原版扫雷，添加了可以单击数字方格提示周围是否有雷的功能。',
            image:['images/photo/3/1.png','images/photo/3/2.png','images/photo/3/3.png','images/photo/3/4.png'],
            link:'www.miaov.com/student/ldd/ray'
        },
        {
            name:'日历插件',
            date:'2015.9',
            detail:' 日历插件因为在工作中用的较多，所以对他比较感兴趣，利用这段时间自己捣鼓了一个。用面向对象的编程思路编写日历函数，设置了多个功能选项对日历进行不同的操作。',
            image:['images/photo/4/1.png','images/photo/4/2.png','images/photo/4/3.png','images/photo/4/4.png'],
            link:'www.miaov.com/student/ldd/calendar'
        },
        {
            name:'手机端淘宝首页',
            date:'2015.10',
            detail:' 页面的制作整个基于rem单位。手机端的滑动比较阻塞，于是用了iScroll插件。网页效果整个基于jquery2.0，包括：banner的无缝滚动 、点击跳转链接（只做了部分处理），页面的图片的延迟加载，倒计时效果。',
            image:['images/photo/5/1.png','images/photo/5/2.png','images/photo/5/3.png','images/photo/5/4.png'],
            link:'www.miaov.com/student/ldd/taobao'
        },
        {
            name:'单屏滚动页面',
            date:'2015.10',
            detail:' 单屏滚动页面的样式是copy了，妙味远程课程的那个案例。封装一些常用的原生工具函数。然后通过一个预加载的loading效果，等待页面中的大部分图片加载完成（checkLoading函数），开始显示主页面的结构。该页面主要是通过鼠标滚轮控制 不同页面的显示，每个显示的单屏页面都有自己的事件，页面的每个事件基本都通过css3的属性进行操作。',
            image:['images/photo/6/1.png','images/photo/6/2.png','images/photo/6/3.png','images/photo/6/4.png'],
            link:'www.miaov.com/student/ldd/page_view'
        },
        {
            name:'H5场景应用',
            date:'2015.10',
            detail:'基于jQuery2.0的移动端场景页面。开场做loading 等待的动画效果,等待页面中的大部分图片加载完成后，做了一个页面偏移的滑动入场效果（css3的transform rotate）；等待滑动入场效果结束后开始播放音乐（此时会出现一个bug，iphone手机下的safari不会播放，解决方法是需要手动的触发一个事件来进行音乐播放，但我只考了虑滑动入场后能自发触动音乐这个效果，没考虑手动触发事件去播放音乐）。',
            image:['images/photo/7/1.png','images/photo/7/2.png','images/photo/7/3.png','images/photo/7/4.png'],
            link:'www.miaov.com/student/ldd/weixinH5'
        }
    ],
    work: [
        {
            company:'北京悠途畅享国际旅行社有限公司',
            job:'前端制作',
            date:'2014年6月-2015年9月',
            detail:'负责pc端，手机端页面的制作。负责完成页面交互效果的制作。与后端配合完成数据交互。',
            logo:'images/icons/header1.png'
        }
    ],
    myInfo:{
        name:'吕迪迪',
        slogan:'一年前端经验',
        edu:'本科 阜阳师范学院',
        time:'1年零2月',
        sex:'1992年 男',
        city:'北京',
        phone:'15010028563',
        mail:'649342195@qq.com',
        work:'前端工程师，全职，北京，8K-10K',
        work1:'前端工程师',
        nature:'全职',
        hopeCity:'北京',
        money:'8K-10K',
        head:'images/photo/head.jpg',
        ps:''
    }

};