import React, {
    Component
}
from 'react';
import Load from './load';
import data from './data';

class App extends Component {
    state = {
        p: 0,
        viewDeg: 52,
        loadNum: 0,
        loadLength: 0,
        showBox: false
    }
    componentDidMount() {
        this.getPerspective();
        window.addEventListener("resize", () => {
            this.getPerspective();

        });
        // window.addEventListener("orientationchange",() => {//兼容ios 横竖屏切换
        //   this.getPerspective();

        // });
        this.loadImg();
    }
    getPerspective() {
        let {
            viewDeg, p
        } = this.state;
        var h = window.innerHeight;
        var p = Math.tan(Math.PI / 180 * viewDeg) * h / 2;
        this.setState({
            p
        });
    }
    setShowBox = () => {
        this.setState({
            showBox: true
        });
    }
    loadImg() {
        data.forEach(item => {
            let img = new Image();
            img.src = item;
            img.onload = () => {
                let {
                    loadLength
                } = this.state;
                loadLength++;
                this.setState({
                    loadLength,
                    loadNumL: Math.floor(loadLength / data.length * 100)
                });
            }
        });
    }
    render() {
            let {
                p, loadNum, showBox
            } = this.state;
            return ( < div id = "view"
                style = {
                    {
                        perspective: p + "px"
                    }
                } >
                < div id = "disZ"
                style = {
                    {
                        transform: `translateZ(${p}px)`
                    }
                } > {
                    showBox ? < Box / > : ( < Load loadNum = {
                            loadNum
                        }
                        setShowBox = {
                            this.setShowBox
                        }
                        / >)}   < /div > < /div >
                    );
                }
            }

            export default App;
