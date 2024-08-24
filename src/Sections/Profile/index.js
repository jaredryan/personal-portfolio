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
                            <div>
                                <h1>Jared Ryan</h1>
                                <h2>Senior Fullstack Engineer</h2>
                            </div>
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
                                <a href="mailto:jryantennis@gmail.com?subject=Hi, Jared (from the Portfolio Website)"><i className="fa fa-envelope" style={{fontWeight: 100}}></i></a>
                                <a href="https://www.linkedin.com/in/jared-m-ryan/" className="right"><i className="fa fa-linkedin" style={{fontWeight: 100}}></i></a>
                                <a href="https://github.com/jaredryan" className="right"><i className="fa fa-github" style={{fontWeight: 100}}></i></a>
                            </div>
                            <h3>The human side of software & how things work.</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
