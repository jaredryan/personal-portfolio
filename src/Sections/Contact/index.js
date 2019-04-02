import React, { Component } from 'react'
import './index.css'

class Contact extends Component {
    constructor() {
        super();
        this.state = {
            opened: false
        }
    }

    handleClick = () => {
        this.setState(prevState => {
            return {opened: !prevState.opened}
        })
    }

    render() {
        if (this.state.opened) {
            return (
                <div className="contact">
                    <div className="contactMe" style={{opacity: 1, bottom: "80px"}}>
                        <div className="profilePic">
                            <div></div>
                        </div>
                        <div className="seeMore">
                            <div className="fontAwesomeLogos">
                                <a href="mailto:jryantennis@gmail.com?subject=Hi, Jared (from the Portfolio Website)"><i className="fa fa-envelope" style={{fontSize: "32px", fontWeight: 100}}></i></a>
                                <a href="https://github.com/jaredryan"><i className="fa fa-github" style={{fontSize: "32px", fontWeight: 100}}></i></a>
                                <a href="https://www.linkedin.com/in/jared-m-ryan/"><i className="fa fa-linkedin" style={{fontSize: "32px", fontWeight: 100}}></i></a>
                            </div>
                        </div>
                    </div>
                    <div className="backButton" onClick={this.handleClick}><i class="fa fa-arrow-down" style={{fontSize: "24px"}}></i></div>
                </div>
            )
        } else {
            return (
                <button className="contactMe" onClick={this.handleClick}>Contact Me</button>
            )
        }
    }
}

export default Contact;
