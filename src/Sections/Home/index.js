import React, { Component } from 'react'
import './index.css'

class Home extends Component {
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
                <a href="#whyMe"><button className="downArrow"><i class="fa fa-arrow-down" style={{fontSize: "24px"}}></i></button></a>
            </div>
        );
    }
}

export default Home;
