import React, { Component } from 'react'
import './index.css'

class Home extends Component {
    constructor() {
        super()
        this.state = {
            animation: {opacity: '0', filter: 'alpha(opacity=0)'},
            scrolled: false
        }
    }
    componentDidMount() {
        window.addEventListener('scroll', this.arrowDisappear);
        setTimeout(() => {
            if (!this.state.scrolled) {
                this.arrowAppear()
            }
        }, 3000)
    }

    arrowAppear = () => {
        const self = this;
        var op = 0.1;  // initial opacity
        var timer = setInterval(function () {
            if (op >= 0.7){
                self.setState({animation: {opacity: '0.7', filter: 'alpha(opacity=70)'}})
                clearInterval(timer);
            } else {
                self.setState({animation: {opacity: `${op}`, filter: `alpha(opacity=${op * 100})`}})
                op += op * 0.1;
            }
        }, 10);
    }

    arrowDisappear = () => {
        if (!this.state.scrolled) {
            this.setState({scrolled: true})
            const self = this;
            var op = 1;  // initial opacity
            var timer = setInterval(function () {
                if (op <= 0.1){
                    clearInterval(timer);
                    self.setState({animation: {display: 'none'}})
                } else {
                    self.setState({animation: {opacity: `${op}`, filter: `alpha(opacity=${op * 100})`}})
                    op -= op * 0.1;
                }
            }, 10);
        }
    }

    handleScroll = () => {
        // this.arrowDisappear()
        const goal = this.props.refs.whyMe.current.offsetTop;
        const start = window.pageYOffset;
        const diff = goal - start;
        const scrollStep = Math.PI / (350 / 1);
        let count = 0;
        let currPos;

        const scrollInterval = setInterval(function(){
            if (window.pageYOffset !== goal) {
                count = count + 1
                currPos = start + diff * (0.5 - 0.5 * Math.cos(count * scrollStep))
                window.scrollTo(0, currPos)
            }
            else {
                clearInterval(scrollInterval)
            }
        }, 1);
    }

    render() {
        return (
            <div className="home" id="home" ref={this.props.refs.home}>
                <div className="homeText">
                    <h1>Jared Ryan</h1>
                    <h2>Software and Web Developer</h2>
                    <div className="fontAwesomeLogos">
                        <a href="mailto:jryantennis@gmail.com?subject=Hi, Jared (from the Portfolio Website)" className="left"><i className="fa fa-envelope" style={{fontSize: "40px", fontWeight: 100}}></i></a>
                        <a href="https://github.com/jaredryan"><i className="fa fa-github" style={{fontSize: "40px", fontWeight: 100}}></i></a>
                        <a href="https://www.linkedin.com/in/jared-m-ryan/" className="right"><i className="fa fa-linkedin" style={{fontSize: "40px", fontWeight: 100}}></i></a>
                    </div>
                </div>
                <div className="homeImg"></div>
                <button
                    style={this.state.animation}
                    className="downArrow"
                    onClick={this.handleScroll}>
                        <i class="fa fa-arrow-down" style={{fontSize: "24px"}}></i>
                </button>
            </div>
        );
    }
}

export default Home;
