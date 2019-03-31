import React, { Component } from 'react';
import './index.css';

class About extends Component {
  render() {
    return (
        <div className="whyMe" id="whyMe">
            <div className="flex">
                <div className="whyMeText">
                    <h1>Why Me?</h1>
                    <ul>
                        <li>Through my professional experience at IBM since June 2018, I know how to learn quickly on the job and work with a team.</li>
                        <li>Freelance web development since April 2018 has taught me how to communicate with clients.</li>
                        <li>While studying at UC Berkeley, I learned the value of hard work, focus, and organization.</li>
                        <li>I've spent a year gaining experience leading, managing, training, and coaching teams of up to 20 people while volunteering in Brazil.</li>
                        <li>From these experiences, in addition to developing these skills, I've come to embrace goal-setting, optimism, and humor.</li>
                    </ul>
                    <div className="pics">
                        <div className="whyMePic">
                            <img src={require("../../Images/whyMe.jpg")} alt=""/>
                        </div>
                        <div className="whyMePic">
                            <img src={require("../../Images/whyMeForest.jpg")} alt=""/>
                        </div>
                    </div>
                </div>
                <div className="contactMe">
                    <div className="profilePic">
                        <img src={require("../../Images/profilePic.jpg")} alt=""/>
                    </div>
                    <div className="seeMore">
                        <h1>Contact Me</h1>
                        <div className="fontAwesomeLogos">
                            <a href="https://github.com/jaredryan"><i className="fa fa-github" style={{fontSize: "44px", fontWeight: 100}}></i></a>
                            <a href="https://www.linkedin.com/in/jared-m-ryan/"><i className="fa fa-linkedin" style={{fontSize: "44px", fontWeight: 100}}></i></a>
                            <a href="mailto:jryantennis@gmail.com?subject=Hi, Jared (from the Portfolio Website)"><i className="fa fa-envelope" style={{fontSize: "44px", fontWeight: 100}}></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default About;
