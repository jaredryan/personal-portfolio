import React from 'react'
import './index.css'

import ResumeButton from '../ResumeButton'

const ContactInfo = (props) => 
    <div className={`fontAwesomeLogos${props.className ? ` ${props.className}` : ''}`}>
        <ResumeButton />
        <a href="mailto:jryantennis@gmail.com?subject=Hi, Jared (from the Portfolio Website)"><i className="fa fa-envelope" style={{fontWeight: 100}}></i></a>
        <a href="https://www.linkedin.com/in/jared-m-ryan/" className="right"><i className="fa fa-linkedin" style={{fontWeight: 100}}></i></a>
        <a href="https://github.com/jaredryan" className="right"><i className="fa fa-github" style={{fontWeight: 100}}></i></a>
    </div>

export default ContactInfo