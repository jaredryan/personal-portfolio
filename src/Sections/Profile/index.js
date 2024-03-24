import React from 'react'
import './index.css'

const Profile = (props) => (
    <div className="profile" id="profile" ref={props.refs.profile}>
        <div className="topSection">
            <div className="container">
                <div className="row">
                    <div className="profileText">
                        <h1>Jared Ryan</h1>
                        <h2>Software Engineer</h2>
                        <div className="fontAwesomeLogos">
                            <a href="Ryan_Jared_Resume.pdf" download="Ryan_Jared_Resume.pdf" className="downloadButton left">
                                Resume <i className="fa fa-download" style={{fontWeight: 100}} />
                            </a>
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
            </div>
        </div>
    </div>
)

export default Profile
