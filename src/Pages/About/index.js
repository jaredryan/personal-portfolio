import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
                        <p><span>Email:</span><br className="mobile"/>jryantennis@gmail.com</p>
                        <div className="gapEmailAndCell"></div>
                        <br/>
                        <a href="mailto:jryantennis@gmail.com?subject=Hi, Jared (from the Portfolio Website)" className="aboutEmail"><p><span>Send Email</span></p></a>
                        <p>See <a href="https://www.linkedin.com/in/jared-m-ryan/">LinkedIn</a>.</p>
                        <p>See <a href="https://github.com/jaredryan">Github</a>.</p>
                        <p>See <Link to="/projects">Projects</Link>.</p>
                        <p>See <Link to="/resume">Resume</Link>.</p>
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
                    <p>Having something to work towards: right now, that's studying design thinking, visual design, and management.</p>
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
