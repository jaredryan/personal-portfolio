import React, { useState } from 'react'
import './index.css'

const Footer = (props) => {
    const [resumeButtonExpanded, setResumeButtonExpanded] = useState(false)

    const handleResumeButtonClick = () => setResumeButtonExpanded(!resumeButtonExpanded)

    return (
        <div className="footer" ref={props.refs.contact}>
            <div className="blurb">
                <h2 className="emphasis">Thanks for visiting!</h2>
                <h3>I'm currently looking for full-time, remote positions.</h3>
                <p>
                    Fullstack or frontend positions with leadership opportunities best match my current skills.
                    Professionally, I've primarily worked with JS-based languages such as React and Node.
                    I'm also more than happy to pick up new skills and languages, so please don't
                    hesitate to reach out if you think we'd be a good fit!
                </p>
            </div>
            <div className="contact">
                <div className="profilePic">
                    <div></div>
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
                <ul>
                    <li>jryantennis@gmail.com</li>
                    <li>+1 (559) 348 3595</li>
                </ul>
            </div>
        </div>
    )
}

export default Footer
