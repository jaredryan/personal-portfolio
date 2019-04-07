import React, { Component } from 'react'
import './index.css'

class Contact extends Component {
    constructor() {
        super();
        this.state = {
            opened: false,
            animation: {}
        }
    }

    handleClick = () => {
        this.handleFade()
        setTimeout(() => {
            this.setState(prevState => {
                return {opened: !prevState.opened}
            })
            this.handleAppear()
        }, 500)
    }

    handleFade = () => {
        const self = this;
        var op = 1;  // initial opacity
        var timer = setInterval(function () {
            if (op <= 0.1){
                clearInterval(timer);
                self.setState({animation: {opacity: 0, filter: `alpha(opacity=0)`}})
            } else {
                self.setState({animation: {opacity: `${op}`, filter: `alpha(opacity=${op * 100})`}})
                op -= op * 0.1;
            }
        }, 10);
    }

    handleAppear = () => {
        const self = this;
        var op = 0.1;  // initial opacity
        var timer = setInterval(function () {
            if (op >= 1){
                clearInterval(timer);
            } else {
                self.setState({animation: {opacity: `${op}`, filter: `alpha(opacity=${op * 100})`}})
                op += op * 0.1;
            }
        }, 10);
    }

    render() {
        if (this.state.opened) {
            return (
                <div className="contact" ref={this.props.refs.contact} style={this.state.animation}>
                    <div className="contactMe picture">
                        <div className="profilePic">
                            <div></div>
                        </div>
                        <div className="seeMore">
                            <div className="fontAwesomeLogos">
                                <a href="mailto:jryantennis@gmail.com?subject=Hi, Jared (from the Portfolio Website)" className="left"><i className="fa fa-envelope" style={{fontSize: "32px", fontWeight: 100}}></i></a>
                                <a href="https://github.com/jaredryan"><i className="fa fa-github" style={{fontSize: "32px", fontWeight: 100}}></i></a>
                                <a href="https://www.linkedin.com/in/jared-m-ryan/" className="right"><i className="fa fa-linkedin" style={{fontSize: "32px", fontWeight: 100}}></i></a>
                            </div>
                        </div>
                    </div>
                    <div className="backButton" onClick={this.handleClick}><i class="fa fa-arrow-down" style={{fontSize: "24px"}}></i></div>
                </div>
            )
        } else {
            return (
                <button className="contactMe" onClick={this.handleClick} ref={this.props.refs.contact} style={this.state.animation}>Contact Me</button>
            )
        }
    }
}

export default Contact;
