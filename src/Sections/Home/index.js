import React, { Component } from 'react'
import './index.css'

class Home extends Component {
    handleScroll = () => {
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
                <button className="downArrow" onClick={this.handleScroll}><i class="fa fa-arrow-down" style={{fontSize: "24px"}}></i></button>
            </div>
        );
    }
}

export default Home;
