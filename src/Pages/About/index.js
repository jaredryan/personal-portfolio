import React, { Component } from 'react';
import './index.css';

class About extends Component {
  render() {
    return (
        <div className="aboutPage">
            <div className="aboutBanner">
                <h1>About Me</h1>
                <div className="aboutPageImg"></div>
            </div>
            <div className="introAndContact">
                <div className="row1">
                    <div className="gradPic">
                        <img src={require("../../Images/graduation.jpg")} alt=""/>
                    </div>
                    <div className="softwareText">
                        <h3>My Experience</h3>

                        <p>IBM Software Cloud Security Developer since June 2018.</p>
                        <p>Freelance web developer since April 2018.</p>
                        <p>UC Berkeley Bioengineering Major with Computer Science Emphasis.</p>
                        <p>Lead, managed, trained, and coached teams of up to 20 people for a year.</p>
                    </div>
                </div>
                <div className="row2">
                    <div className="profilePic">
                        <img src={require("../../Images/profilePic.jpg")} alt=""/>
                    </div>
                    <div className="seeMore">
                        <h3>Contact Me</h3>
                        <p>jryantennis@gmail.com</p>
                        <div className="gapEmailAndCell"></div>
                        <br/>
                        <div className="fontAwesomeLogos">
                            <a href="https://github.com/jaredryan"><i className="fa fa-github" style={{fontSize: "32px", fontWeight: 100}}></i></a>
                            <a href="https://www.linkedin.com/in/jared-m-ryan/"><i className="fa fa-linkedin" style={{fontSize: "32px", fontWeight: 100}}></i></a>
                            <a href="mailto:jryantennis@gmail.com?subject=Hi, Jared (from the Portfolio Website)"><i className="fa fa-envelope" style={{fontSize: "32px", fontWeight: 100}}></i></a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="myValues">
                <div className="naturePic">
                    <img src={require("../../Images/nature.jpg")} alt=""/>
                </div>
                <div className="valuesText">
                    <h3>What I'm About</h3>

                    <p>Self-improvement, organization, optimism, and teamwork.</p>
                    <p>Having something to work towards: right now, that's studying development, design thinking, visual design, business, and management.</p>
                    <p>Work hard, but don't take yourself too seriously.</p>
                    <p>Games: sports, video games, board games, etc. Love them.</p>
                    <p>If I'm not planning, studying, or playing something, I'm probably relaxing with Netflix.</p>
                    <p>Or, on occasion, you'll find me hanging out with friends or out in nature.</p>
                </div>
            </div>
        </div>
    );
  }
}

export default About;
