import React, { useState } from 'react'
import './index.css'

const Profile = (props) => {
    const [resumeButtonExpanded, setResumeButtonExpanded] = useState(false)

    const handleResumeButtonClick = () => setResumeButtonExpanded(!resumeButtonExpanded)

    return (
        <div className="profile" id="profile" ref={props.refs.profile}>
            <div className="topSection">
                <div className="container">
                    <div className="row">
                        <div className="profileText">
                            <h1>Jared Ryan</h1>
                            <h2>Software Engineer</h2>
                            <div className="fontAwesomeLogos">
                                <div className="resumeButtonContainer">
                                    <button className="resumeButton left" onClick={handleResumeButtonClick}>
                                        Resume
                                        {resumeButtonExpanded
                                            ? <i className="fa fa-angle-up" style={{fontWeight: 100}} />
                                            : <i className="fa fa-angle-down" />}
                                    </button>
                                    <div className={`resumeTooltip${!resumeButtonExpanded ? ' hidden' : ''}`}>
                                        <a href="Ryan_Jared_Resume.docx" target='_blank' rel='noopener noreferrer' className="downloadOption">
                                            Download Word Document<i className="fa fa-download" style={{fontWeight: 100}} />
                                        </a>
                                        <a href="Ryan_Jared_Resume.pdf" target='_blank' rel='noopener noreferrer' className="downloadOption">
                                            View PDF<i className="fa fa-eye" style={{fontWeight: 100}} />
                                        </a>
                                    </div>
                                </div>
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
                            <li>Full stack software engineer with 5 years experience, primarily in JS-based languages.</li>
                            <li>Seeking full-time, 100% remote, frontend or full stack roles.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
