JS自定义事件

所谓自定义事件，就是有别于有别于带有浏览器特定行为的事件(类似click, mouseover, submit, keydown等事件)，事件名称可以随意定义，可以通过特定的方法进行添加，触发以及删除。

先看个简单的事件添加的例子：

element.addEventListener("click", function() {
    // 我是临时工
});
这是个简单的为DOM元素分配事件处理函数的方法(IE 不支持)，有别于：

element.onclick = function() {
   // 我是临时工 
};
addEventListener()可以为元素分配多个处理函数（而非覆盖），因此，我们可以继续：

element.addEventListener("click", function() {
    // 我是二代临时工
});
然后，当element被click(点击)的时候，就会连续触发“临时工”和“二代临时工”函数。

抽象→具象→本质→数据层
你有没有觉得这种行为表现有点类似于往长枪里面塞子弹(add)，（扣动扳手 – click）发射的时候按照塞进去的顺序依次出来。这种行为表现为我们实现自定义事件提供了思路：我们可以定义一个数组，当添加事件的时候，我们push进去这个事件处理函数；当我们执行的时候，从头遍历这个数组中的每个事件处理函数，并执行。

当多个事件以及对应数据处理函数添加后，我们最终会得到一个类似下面数据结构的对象：

_listener = {
    "click": [func1, func2],
    "custom": [func3],
    "defined": [func4, func5, func6]
}
因此，如果我们脱离DOM, 纯碎在数据层面自定义事件的话，我们只要以构建、遍历和删除_listener对象为目的即可。

函数式实现
还是那句话，循序渐进，我们先看看函数式的实现（只展示骨干代码）：

var _listener = {};
var addEvent = function(type, fn) {
    // 添加
};
var fireEvent = function(type) {
    // 触发
};
var removeEvent = function(type, fn) {
    // 删除
};
上面的代码虽然显得比较初级，但是目的亦可实现。例如：

addEvent("alert", function() {
    alert("弹出！");
});

// 触发自定义alert事件
fireEvent("alert");
但是，函数式写法缺点显而易见，过多暴露在外的全局变量（全局变量是魔鬼），方法无级联等。这也是上面懒得显示完整代码的原因，略知即可。

字面量实现
众所周知，减少全局变量的方法之一就是使用全局变量（其他如闭包）。于是，我们稍作调整（代码较长，为限制篇幅，使用了滚动条，完整显示点击这里 – JS交互, RSS中无效果）：

var Event = {
    _listeners: {},    
    // 添加
    addEvent: function(type, fn) {
        if (typeof this._listeners[type] === "undefined") {
            this._listeners[type] = [];
        }
        if (typeof fn === "function") {
            this._listeners[type].push(fn);
        }    
        return this;
    },
    // 触发
    fireEvent: function(type) {
        var arrayEvent = this._listeners[type];
        if (arrayEvent instanceof Array) {
            for (var i=0, length=arrayEvent.length; i<length; i+=1) {
                if (typeof arrayEvent[i] === "function") {
                    arrayEvent[i]({ type: type });    
                }
            }
        }    
        return this;
    },
    // 删除
    removeEvent: function(type, fn) {
    	var arrayEvent = this._listeners[type];
        if (typeof type === "string" && arrayEvent instanceof Array) {
            if (typeof fn === "function") {
                // 清除当前type类型事件下对应fn方法
                for (var i=0, length=arrayEvent.length; i<length; i+=1){
                    if (arrayEvent[i] === fn){
                        this._listeners[type].splice(i, 1);
                        break;
                    }
                }
            } else {
                // 如果仅仅参数type, 或参数fn邪魔外道，则所有type类型事件清除
                delete this._listeners[type];
            }
        }
        return this;
    }
};

使用类似下面：

Event.addEvent("alert", function() {
    alert("弹出！");
});

// 触发自定义alert事件
Event.fireEvent("alert");

原型模式实现
代码如下（相比上面增加了addEvents, fireEvents, removeEvents多事件绑定、执行与删除方法，篇幅较长，增加滚动限高

var EventTarget = function() {
    this._listener = {};
};

EventTarget.prototype = {
    constructor: this,
    addEvent: function(type, fn) {
        if (typeof type === "string" && typeof fn === "function") {
            if (typeof this._listener[type] === "undefined") {
                this._listener[type] = [fn];
            } else {
                this._listener[type].push(fn);    
            }
        }
        return this;
    },
    addEvents: function(obj) {
        obj = typeof obj === "object"? obj : {};
        var type;
        for (type in obj) {
            if ( type && typeof obj[type] === "function") {
                this.addEvent(type, obj[type]);    
            }
        }
        return this;
    },
    fireEvent: function(type) {
        if (type && this._listener[type]) {
            var events = {
                type: type,
                target: this    
            };
            
            for (var length = this._listener[type].length, start=0; start<length; start+=1) {
                this._listener[type][start].call(this, events);
            }
        }
        return this;
    },
    fireEvents: function(array) {
        if (array instanceof Array) {
            for (var i=0, length = array.length; i<length; i+=1) {
                this.fireEvent(array[i]);
            }
        }
        return this;
    },
    removeEvent: function(type, key) {
        var listeners = this._listener[type];
        if (listeners instanceof Array) {
            if (typeof key === "function") {
                for (var i=0, length=listeners.length; i<length; i+=1){
                    if (listeners[i] === key){
                        listeners.splice(i, 1);
                        break;
                    }
                }
            } else if (key instanceof Array) {
                for (var lis=0, lenkey = key.length; lis<lenkey; lis+=1) {
                    this.removeEvent(type, key[lenkey]);
                }
            } else {
                delete this._listener[type];
            }
        }
        return this;
    },
    removeEvents: function(params) {
        if (params instanceof Array) {
            for (var i=0, length = params.length; i<length; i+=1) {
                this.removeEvent(params[i]);
            }    
        } else if (typeof params === "object") {
            for (var type in params) {
                this.removeEvent(type, params[type]);    
            }
        }
        return this;    
    }
};

其实上面代码跟字面量方法相比，就是增加了下面点东西：

var EventTarget = function() {
    this._listener = {};
};

EventTarget.prototype = {
    constructor: this,
    // .. 完全就是字面量模式实现脚本
};
然后，需要实现自定义事件功能时候，先new构造下：

var myEvents = new EventTarget();
var yourEvents = new EventTarget();

DOM自定义事件
我们平常所使用的事件基本都是与DOM元素相关的，例如点击按钮，文本输入等，这些为自带浏览器行为事件，而自定义事件与这些行为无关。例如：

element.addEventListener("alert", function() {
    alert("弹出！");
});
这里的alert就属于自定义事件，后面的function就是自定义事件函数。而这个自定义事件是直接绑定在名为element的DOM元素上的，因此，这个称之为自定义DOM事件。

由于浏览器的差异，上面的addEventListener在IE浏览器下混不来(attachEvent代替)，因此，为了便于规模使用，我们需要新的添加事件方法名（合并addEventListener和attachEvent），例如addEvent, 并附带事件触发方法fireEvent, 删除事件方法removeEvent，(命名均参考自MooTools库)。

如何直接在DOM上扩展新的事件处理方法，以及执行自定义的事件呢？

如果不考虑IE6/7浏览器，我们可以直接在DOM上进行方法扩展。例如添加个addEvent方法：

HTMLElement.prototype.addEvent = function(type, fn, capture) {
    var el = this;
    if (window.addEventListener) {
        el.addEventListener(type, function(e) {
            fn.call(el, e);
        }, capture);
    } else if (window.attachEvent) {
        el.attachEvent("on" + type, function(e) {
            fn.call(el, e);
        });
    } 
};
//zxx: 上面代码中的HTMLElement表示HTML元素。以一个<p>标签元素举例，其向上寻找原型对象用过会是这样：HTMLParagraphElement.prototype → HTMLElement.prototype → Element.prototype → Node.prototype → Object.prototype → null。这下您应该知道HTMLElement所处的位置了吧，上述代码HTMLElement直接换成Element也是可以的，但是会让其他元素（例如文本元素）也扩展addEvent方法，有些浪费了。

这样，我们就可以使用扩展的新方法给元素添加事件了，例如一个图片元素：

elImage.addEvent("click", function() {
    alert("我是点击图片之后的弹出！");
});
由于IE6, IE7浏览器的DOM水平较低，无法直接进行扩展，因此，原型扩展的方法在这两个浏览器下是行不通的。要想让这两个浏览器也支持addEvent方法，只能是页面载入时候遍历所有DOM，然后每个都直接添加addEvent方法了。

var elAll = document.all, lenAll = elAll.length;
for (var iAll=0; iAll<lenAll; iAll+=1) {
    elAll[iAll].addEvent = function(type, fn) {
        var el = this;
        el.attachEvent("on" + type, function(e) {
            fn.call(el, e);
        });
    };
}

测试代码如下(demo页面有代码完整展示)：

<img id="image" data-src="http://image.zhangxinxu.com/image/study/s/s256/mm1.jpg" alt="年轻的张含韵" />

document.getElementById("image").addEvent("click", function() {
    alert("这是：" + this.alt);    
});
只能点到为止
直接在DOM上进行事件方法扩展其实是个糟糕的做法，因此，这里我并没有对自定义事件做进一步深入探讨（这个下一部分会讲）。

基于DOM扩展缺点有：缺少标准无规律、提高冲突可能性、性能以及浏览器支持。
扩展名字任意命，很有可能就会与未来DOM浏览器本身支持的方法相互冲突；扩展无规律，很有可能出现A和B同名不同功能的扩展而造成冲突；IE6-7浏览器下所有扩展都要通过遍历支持，其性能开销可想而知；另外IE8对DOM扩展的支持并不完整，例如其支持Element.prototype，却没有HTMLElement.prototype.

虽然我从事的站点就是基于MooTools库的，但是，我对MooTools库基于DOM扩展方法的做法是不支持的。相反，我更亲近jQuery库的做法，也就是下面要讲的“伪DOM自定义事件”。

四、伪DOM自定义事件
这里的“伪DOM自定义事件”是自己定义的一个名词，用来区分DOM自定义事件的。例如jQuery库，其是基于包装器（一个包含DOM元素的中间层）扩展事件的，既与DOM相关，又不直接是DOM，因此，称之为“伪DOM自定义事件”。

//zxx: 下面即将展示的代码目的在于学习与认识，要想实际应用可能还需要在细节上做些调整。例如，下面测试的包装器仅仅只是包裹DOM元素，并非选择器之类；$符号未增加冲突处理，且几个重要方法都暴露在全局环境中，没有闭包保护等。

原型以及new函数构造不是本文重点，因此，下面这个仅展示：

var $ = function(el) {
    return new _$(el);    
};
var _$ = function(el) {
    this.el = el;
};
_$.prototype = {
    constructor: this,
    addEvent: function() {
        // ...
    },
    fireEvent: function() {
        // ...
    },
    removeEvent: function() {
        // ...
    }
}
于是我们就可以使用类似$(dom).addEvent()的语法为元素添加事件了（包括不包含浏览器行为的自定义事件）。

自定义事件的添加
如果只考虑事件添加，我们的工作其实很简单，根据支持情况，addEventListener与attachEvent方法分别添加事件（attachEvent方法后添加事件先触发）即可：

addEvent: function(type, fn, capture) {
    var el = this.el;
    if (window.addEventListener) {
        el.addEventListener(type, fn, capture);        
    } else if (window.attachEvent) {
        el.attachEvent("on" + type, fn);
    }
    return this;
}
显然，事情不会这么简单，有句古话叫做“上山容易下山难”，自定义事件添加容易，但是如何触发它们呢？——考虑到自定义事件与浏览器行为无关，同时浏览器没有直接的触发事件的方法。

自定义事件的触发
又是不可避免的，由于浏览器兼容性问题，我们要分开说了，针对标准浏览器和IE6/7等考古浏览器。

1. 对于标准浏览器，其提供了可供元素触发的方法：element.dispatchEvent(). 不过，在使用该方法之前，我们还需要做其他两件事，及创建和初始化。因此，总结说来就是：

document.createEvent()
event.initEvent()
element.dispatchEvent()
举个板栗：

$(dom).addEvent("alert", function() {
    alert("弹弹弹，弹走鱼尾纹~~");
});

// 创建
var evt = document.createEvent("HTMLEvents");
// 初始化
evt.initEvent("alert", false, false);

// 触发, 即弹出文字
dom.dispatchEvent(evt);
createEvent()方法返回新创建的Event对象，支持一个参数，表示事件类型，具体见下表：

参数	事件接口	初始化方法
HTMLEvents	HTMLEvent	initEvent()
MouseEvents	MouseEvent	initMouseEvent()
UIEvents	UIEvent	initUIEvent()
关于createEvent()方法我自己了解也不是很深入，不想滥竽充数，误人子弟，所以您有疑问我可能作答不了，希望对熟知该方法的人可以做进一步的解释说明（例如事件接口与document关系，UIEvent是什么东西等）。

initEvent()方法用于初始化通过DocumentEvent接口创建的Event的值。支持三个参数：initEvent(eventName, canBubble, preventDefault). 分别表示事件名称，是否可以冒泡，是否阻止事件的默认操作。

dispatchEvent()就是触发执行了，dom.dispatchEvent(eventObject), 参数eventObject表示事件对象，是createEvent()方法返回的创建的Event对象。

2. 对于IE浏览器，由于向下很多版本的浏览器都不支持document.createEvent()方法，因此我们需要另辟蹊径（据说IE有document.createEventObject()和event.fireEvent()方法，但是不支持自定义事件~~）。

IE浏览器有不少自给自足的东西，例如下面要说的这个"propertychange"事件，顾名思意，就是属性改变即触发的事件。例如文本框value值改变，或是元素id改变，或是绑定的事件改变等等。

我们可以利用这个IE私有的东西实现自定义事件的触发，大家可以先花几分钟想想……

// zxx: 假设几分钟已经过去了……

大家现在有思路了没？其实说穿了很简单，当我们添加自定义事件的时候，顺便给元素添加一个自定义属性即可。例如，我们添加自定义名为"alert"的自定义事件，顺便我们可以对元素做点小手脚：

dom.evtAlert = "2012-04-01";
再顺便把自定义事件fn塞到"propertychange"事件中：

dom.attachEvent("onpropertychange", function(e) {
    if (e.propertyName == "evtAlert") {
        fn.call(this);
    }
});
这个，当我们需要触发自定义事件的时候，只要修改DOM上自定义的evtAlert属性的值即可：

dom.evtAlert = Math.random();	// 值变成随机数
此时就会触发dom上绑定的onpropertychange事件，又因为修改的属性名正好是"evtAlert", 于是自定义的fn就会被执行。这就是IE浏览器下事件触发实现的完整机制，应该说讲得还是蛮细的。

自定义事件的删除
与触发事件不同，事件删除，各个浏览器都提供了对于的时间删除方法，如removeEventListener和detachEvent。不过呢，对于IE浏览器，还要多删除一个事件，就是为了实现触发功能额外增加的onpropertychange事件：

dom.detachEvent("onpropertychange", evt);


大综合
结合上面所有论述与展示，我们可以得到类似下面的完整代码（为限制篇幅，滚动定高，想查看完整代码推荐去原demo，或是点击这里收起– js交互，RSS中无效果。）：

var $ = function(el) {
    return new _$(el);    
};
var _$ = function(el) {
    this.el = (el && el.nodeType == 1)? el: document;
};
_$.prototype = {
    constructor: this,
    addEvent: function(type, fn, capture) {
        var el = this.el;
        if (window.addEventListener) {
            el.addEventListener(type, fn, capture);
            var ev = document.createEvent("HTMLEvents");
            ev.initEvent(type, capture || false, false);
            
            if (!el["ev" + type]) {
                el["ev" + type] = ev;
            }  
        } else if (window.attachEvent) {
            el.attachEvent("on" + type, fn);    
            if (isNaN(el["cu" + type])) {
                // 自定义属性
                el["cu" + type] = 0; 
            }   
            var fnEv = function(event) {
                if (event.propertyName == "cu" + type) { fn.call(el); }
            };
            el.attachEvent("onpropertychange", fnEv);     
            if (!el["ev" + type]) {
                el["ev" + type] = [fnEv];
            } else {
                el["ev" + type].push(fnEv);    
            }
        }
        return this;
    },
    fireEvent: function(type) {
        var el = this.el;
        if (typeof type === "string") {
            if (document.dispatchEvent) {
                if (el["ev" + type]) {
                    el.dispatchEvent(el["ev" + type]);
                }
            } else if (document.attachEvent) {
                el["cu" + type]++;
            }    
        }    
        return this;
    },
    removeEvent: function(type, fn, capture) {
        var el = this.el;
        if (window.removeEventListener) {
            el.removeEventListener(type, fn, capture || false);
        } else if (document.attachEvent) {
            el.detachEvent("on" + type, fn);
            var arrEv = el["ev" + type];
            if (arrEv instanceof Array) {
                for (var i=0; i<arrEv.length; i+=1) {
                    el.detachEvent("onpropertychange", arrEv[i]);
                }
            }
        }
        return this;    
    }
};
您可以狠狠地点击这里：JS DOM自定义事件自定义事件demo

demo页面中的的张含韵小姐图片上通过级联形式联系添加了三个事件（一个是包含浏览器行为的click事件，还有两个是自定义不含行为的alert事件）：

$(elImage)
    .addEvent("click", funClick);
    .addEvent("alert", funAlert1)
    .addEvent("alert", funAlert2);
而funClick方法中有等同下面脚本：

$(e.target).fireEvent("alert");
因此，点击图片，才会出现三个弹出框：用户点击图片 → 执行funClick → 第一个弹框 → 执行fireEvent → 触发自定义"alert"事件 → 连续两个"alert"事件弹框