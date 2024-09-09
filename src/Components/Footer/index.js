import React from 'react'
import './index.css'

import ContactInfo from '../ContactInfo'
import ProfilePic from '../ProfilePic'

const Footer = (props) => {
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
                <ProfilePic size={150} />
                <ContactInfo className="footerContact"/>
                <ul>
                    <li>jryantennis@gmail.com</li>
                    <li>+1 (559) 348-3595</li>
                </ul>
            </div>
        </div>
    )
}

export default Footer
