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
        const show = this.state.isOpen ? {display: "block"} : {display: "none"}
        const hover = this.state.isOpen ? {backgroundColor: "#FFCAB3"} : {}

        return (
            <nav onClick={this.handleClick} style={hover} ref={this.props.refs.navbar}>
                <i className="fa fa-bars" />
	            <ul className="dropdown-content" style={show}>
                    <div onClick={() => this.handleScroll(this.props.refs.profile)}><li>Profile</li></div>
                    <div onClick={() => this.handleScroll(this.props.refs.aboutMe)}><li>About Me</li></div>
                    <div onClick={() => this.handleScroll(this.props.refs.experience)}><li>Experience</li></div>
                    <div onClick={() => this.handleScroll(this.props.refs.projects)}><li>Projects</li></div>
        		</ul>
            </nav>
        )
    }
}

export default Navbar;
