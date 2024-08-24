import React from 'react'
import './index.css'
import TechnicalImage from '../../Images/technical.png';
import PersonalImage from '../../Images/personal.png';

const AboutMe = (props) => (
    <div className="aboutMe" id="aboutMe" ref={props.refs.aboutMe}>
        <div className="bottomSection">
            <div className="container"> 
                <div className="profilePicContainer">
                    <div className="profilePic">
                        <div></div>
                    </div>
                    <div>
                        <h3>
                            Welcome! I'm Jared. You're probably wondering who I am and how I can help.
                        </h3>
                        <p>
                            I stumbled into software while studying Bioengineering at UC Berkeley.
                            From there, I studied it non-stop until I managed to sneak my way into IBM.
                            Over the last 5 years, I worked my way up a couple of positions, then pivoted to MANTL to experience startup life.
                            I've cultivated not just a love for clean code, but the work that comes beforehand: 
                            determining customer needs, prioritizing them, user-friendly design solutions, then making them happen from start to finish.
                        </p>
                        <p>
                            Enough background — you're probably wondering what I can do for you.
                            This is what I bring to the table.
                        </p>
                    </div> 
                </div>
                <div className="row">
                    <div className="pointsContainer technical">
                        <i className="fa fa-code" style={{fontWeight: 100}}></i>
                        <h3 className="mobile">My Technical Approach: </h3>
                        <ul>
                            <li>Prioritizes design and usability</li>
                            <li>Curious to try new things</li>
                            <li>Loves clean code</li>
                            <li>Tackles big projects boldly and systemically</li>
                            <li>Enjoys PR reviews</li>
                        </ul>
                    </div>
                    <img src={TechnicalImage} alt="Tech" className="technicalImage" />
                </div>
                <div className="row">
                    <img src={PersonalImage} alt="Chatting about tech" className="personalImage" />
                    <div className="pointsContainer personal">
                        <i className="fa fa-user" style={{fontWeight: 100}}></i>
                        <h3 className="mobile">My Personal Approach:</h3>
                        <ul>
                            <li>Organized: plans, coordinates, executes, and follows up</li>
                            <li>Empathetic and listens well</li>
                            <li>Appropriately outspoken</li>
                            <li>Personable and funny-ish</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
)

export default AboutMe
