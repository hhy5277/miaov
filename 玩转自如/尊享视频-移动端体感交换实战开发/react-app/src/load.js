import React, {
    Component
}
from 'react';

export default class Load extends Component {
    componentDidUpdate() {
        if (this.props.loadNum >= 100) {
            this.loadEndMove();
        }
    }
    loadEndMove() {
        let {
            loadZ
        } = this.refs;
        css(loadZ, "translateZ", 0);
        mTween({
            el: loadZ,
            attrs: {
                translateZ: -6000,
                opacity: 0,
                duration: 600,
                fx: "easeOutStrong",
                cb: () => {
                    this.props.setShowBox();
                }
            },
        });
    }
    render() {
        let {
            loadNum
        } = this.props;
        return ({ < div id = "load" >
                < div id = "loadZ"
            ref = "loadZ" >
                < img src = {
                    require("./bg/logo.png")
                }
            /> < p > {loadNum} % < /p > < /div> < /div >
        });
    }
}
