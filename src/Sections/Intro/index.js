import React from 'react'
import './index.css'

const Intro = () => {
    return (
        <div className="intro" id="intro">
            <div className="introText">
                <h1>Jared Ryan</h1>
                <h2>Software and Web Developer</h2>
                <div className="fontAwesomeLogos">
                    <a href="mailto:jryantennis@gmail.com?subject=Hi, Jared (from the Portfolio Website)"><i className="fa fa-envelope" style={{fontSize: "40px", fontWeight: 100}}></i></a>
                    <a href="https://github.com/jaredryan"><i className="fa fa-github" style={{fontSize: "40px", fontWeight: 100}}></i></a>
                    <a href="https://www.linkedin.com/in/jared-m-ryan/"><i className="fa fa-linkedin" style={{fontSize: "40px", fontWeight: 100}}></i></a>
                </div>
            </div>
            <div className="introImg"></div>
        </div>
    );
}

export default Intro;
