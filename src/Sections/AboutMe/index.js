import React from 'react'
import './index.css'

const AboutMe = (props) => (
    <div className="aboutMe" id="aboutMe" ref={props.refs.aboutMe}>
        <div className="bottomSection">
            <div className="container"> 
                <h1>About Me</h1>
                <div className="row points">
                    <div className="pointsContainer technical">
                        <i className="fa fa-code" style={{fontWeight: 100}}></i>
                        <h3 className="mobile">Technical</h3>
                        <ul>
                            <li>Curious to try new things</li>
                            <li>Tackles big projects boldly and systemically</li>
                            <li>Enjoys PR reviews</li>
                            <li>Loves clean code</li>
                            <li>Prioritizes design and usability</li>
                        </ul>
                    </div>
                    <div className="circleContainer">
                        <div className="circle left">
                            <h3>Technical</h3>
                        </div>
                        <div className="circle right">
                            <h3>Personal</h3>
                        </div>
                    </div>
                    <div className="pointsContainer personal">
                        <i className="fa fa-user" style={{fontWeight: 100}}></i>
                        <h3 className="mobile">Personal</h3>
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
