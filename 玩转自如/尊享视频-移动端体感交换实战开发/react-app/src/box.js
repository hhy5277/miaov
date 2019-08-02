import React, {
    Component
}
from 'react';
import data from './data';
import {
    css, mTween
}
from './mTween';

class Box extends Component {
    state = {
        deg: 360 / data.length,
        w: 129 / 2,
        translateZ: document.querySelector("#translateZ"),
        startDeg: 0,
        startPoint: 0,
        viewDeg: 90, //滑动一屏是90deg
        lastPoint: 0, //上一次的手指位置
        lastTime: 0, //上一次时间
        lastSpeed: 0, //最后的滑动速度
        isAnimateEnd: false,
        isTouch: false,
        isStart: true
    }
    getR() {
        let {
            deg,
            w
        } = this.state;
        let rad = Math.PI / 180 * (180 - deg) / 2;
        return Math.tan(rad) * w;
    }
    componentDidMount() {
        this.startAnimate();

    }
    startAnimate() {
        let {
            box, tZ
        } = this.refs;
        css(box, "rotateY", -1080);
        css(tZ, "rotateZ", -6000);
        mTween({
            el: box,
            attrs: {
                rotateY: 0
            },
            duration: 2000,
            ease: "easeBothStrong",
            cb: () => {
                this.setState({
                    isAnimateEnd: true
                });
                this.setSensors();
            }
        });
        mTween({
            el: tZ,
            attrs: {
                translateZ: -160
            },
            duration: 800,
            ease: "easeBothStrong"
        });
    }
    setSensors = () => {
        var box = this.refs;

        var startDeg = 0;
        var startElDeg = 0;
        window.addEventListener("deviceorientation", (e) => {
            let {
                isTouch, isStart
            } = this.state;
            if (isTouch) {
                return;
            }
            if (isStart) {
                startDeg = (e.alpha + e.gamma) % 360;
                startElDeg = css(box, "rotateY");
                this.setState({
                    isStart: false
                });
            } else {
                var nowDeg = (e.alpha + e.gamma) % 360;
                disDeg = nowDeg - startDeg;
                css(div, "rotateY", startElDeg);
            }
            //

        });
    }
    start = (e) => {
        if (!this.state.isAnimateEnd) {
            return;
        }
        let {
            box, tZ
        } = this.refs;
        let {
            lastPoint, startPoint, startDeg, lastTime, lastSpeed
        } = this.state;
        startPoint = e.changedTouches[0].pageX;
        startDeg = css(box, "rotateY");
        lastTime = Date.now();
        lastSpeed = 0;
        window.isTouch = true;
        mTween.stop(box);
        mTween.stop(translateZ);
        mTween({
            el: tZ,
            attrs: {
                translateZ: -300
            }
        });
        this.setState({
            lastPoint, startPoint, startDeg, lastTime, lastSpeed, isTouch: true
        });
    }
    move = (e) => {
        if (!this.state.isAnimateEnd) {
            return;
        }
        let {
            box
        } = this.refs;
        let {
            lastPoint, startPoint, startDeg, lastTime, lastSpeed, viewDeg
        } = this.state;
        lastPoint = nowPoint = e.changedTouches[0].pageX;
        var dis = nowPoint - startPoint;
        var disDeg = dis / window.innerWidth * viewDeg;
        var nowTime = Date.now();
        css(box, "rotateY", startDeg - disDeg);
        lastSpeed = (nowPoint - lastPoint) / (nowTime - lastTime);
        lastPoint = nowPoint;
        lastTime = nowTime;
        this.setState({
            lastPoint, lastTime, lastSpeed
        });
    }
    end = (e) => {
        if (!this.state.isAnimateEnd) {
            return;
        }
        let {
            box, tZ
        } = this.refs;
        let {
            lastTime, lastSpeed, viewDeg
        } = this.state;
        var nowTime = Date.now();
        mTween.stop(tZ);
        mTween({
            el: tZ,
            attrs: {
                tZ: -160
            },
            duration: 700
        });
        if (lastSpeed == 0 || nowTime - lastTime >= 100) {
            this.setState({
                isTouch: false,
                isStart: true
            });
            return;
        }
        var dis = lastSpeed * 200; //速度 和 缓冲距离成正比
        var disDeg = dis / window.innerWidth * viewDeg;
        var target = css(box, "rotateY") - disDeg;
        mTween({
            el: box,
            attrs: {
                rotateY: target
            },
            fx: "easeOutStrong",
            duration: {
                multiple: 3,
                min: 200,
                max: 1500
            },
            cb: () => {
                this.setState({
                    isTouch: false,
                    isStart: true
                });
            }
        });
    }
    render() {
        let {
            deg
        } = this.state;
        let r = this.getR();
        return ( < div id = "translateZ"
            ref = "tZ" >
            < div id = "box3D"
            ref = "box"
            onTouchStart = {
                this.start
            }
            onTouchMove = {
                this.move
            }
            onTouchEnd = {
                this.end
            } > {
                data.map((item) => {
                    return { < div key = {
                            index
                        }
                        style = {
                            {
                                background: `url($ { item})`,
                                transform: `rotateY(${-deg*index}deg) translateZ(${-r}px)`
                            }
                        } > < /div>
                    }
                })
            } < /div>    < /div >
        );
    }
}

export default Box;
