import React from 'react'
import './index.css'

const Home = () => (
    <div className="home" id="home">
        <div className="row">
            <div className="homeText">
                <h1>Jared Ryan</h1>
                <h2>Software Engineer</h2>
                <div className="fontAwesomeLogos">
                    <a href="Ryan_Jared_Resume.pdf" download="Ryan_Jared_Resume_2024.pdf" className="downloadButton left">Resume</a>
                    <a href="mailto:jryantennis@gmail.com?subject=Hi, Jared (from the Portfolio Website)" ><i className="fa fa-envelope" style={{fontWeight: 100}}></i></a>
                    <a href="https://www.linkedin.com/in/jared-m-ryan/" className="right"><i className="fa fa-linkedin" style={{fontWeight: 100}}></i></a>
                </div>
            </div>
            <div className="profilePic">
                <div></div>
            </div>
        </div>
        <div className="row summary">
            <ul>
                <li>Fullstack software engineer with 5 years experience, primarily in JS-based languages.</li>
                <li>Seeking full-time, 100% remote, frontend or fullstack roles.</li>
            </ul>
        </div>
        <div className="row points">
            <div className="pointsContainer">
                <h3>Technical Traits</h3>
                <ul>
                    <li>Curious to try new things</li>
                    <li>Tackles big projects boldly and systemically</li>
                    <li>Enjoys PR reviews</li>
                    <li>Loves clean code</li>
                    <li>Prioritizes design and usability</li>
                </ul>
            </div>
            <div className="pointsContainer">
                <h3>Personal Traits</h3>
                <ul>
                    <li>Organized: plans, coordinates, executes, and follows up</li>
                    <li>Empathetic and listens well</li>
                    <li>Appropriately outspoken</li>
                    <li>Personable and funny-ish</li>
                </ul>
            </div>
        </div>
    </div>
)

export default Home
