import React, { Component } from 'react'
import './index.css'

class Navbar extends Component {
    constructor() {
        super()
        this.state = {
          isOpen: false
        }
    }

    handleClick = () => {
        this.setState(prevState => ({isOpen: !prevState.isOpen}))
    }

    handleScroll = (target) => {
        const goal = target.current.offsetTop;
        this.props.onScroll(goal);
    }

    render() {
        return (
            <nav onClick={this.handleClick} className={this.state.isOpen ? "open" : "closed"}>
                <div className="container">
                    <i className="fa fa-bars" />
                </div>
	            <ul className={`dropdown-content ${this.state.isOpen ? "open" : "closed"}`}>
                    <div onClick={() => this.handleScroll(this.props.refs.profile)}><li>Profile</li></div>
                    <div onClick={() => this.handleScroll(this.props.refs.aboutMe)}><li>About Me</li></div>
                    <div onClick={() => this.handleScroll(this.props.refs.skills)}><li>Skills</li></div>
                    <div onClick={() => this.handleScroll(this.props.refs.experience)}><li>Experience</li></div>
                    <div onClick={() => this.handleScroll(this.props.refs.education)}><li>Education</li></div>
                    <div onClick={() => this.handleScroll(this.props.refs.projects)}><li>Projects</li></div>
        		</ul>
            </nav>
        )
    }
}

export default Navbar;
