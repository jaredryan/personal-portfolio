import React from 'react'
import './index.css'

import ContactInfo from '../../Components/ContactInfo'

const Profile = (props) => {
    return (
        <div className="profile" id="profile" ref={props.refs.profile}>
            <div className="topSection">
                <div className="container">
                    <div className="row">
                        <div className="profileText">
                            <div>
                                <h1>Jared Ryan</h1>
                                <h2>Senior Fullstack Engineer</h2>
                                <h3>The human side of software & how things work.</h3>
                            </div>
                            <ContactInfo />
                        </div>
                    </div>
                </div>
            </div>
            <div className="bottomSection" />
        </div>
    )
}

export default Profile
