import React, { Component } from 'react'
import './index.css'

class Navbar extends Component {
    constructor() {
        super()
        this.state = {isOpen: false}
    }

    handleClick = () => {
        this.setState(prevState => ({isOpen: !prevState.isOpen}))
    }

    render() {
        const show = this.state.isOpen ? {display: "block"} : {display: "none"}
        const hover = this.state.isOpen ? {backgroundColor: "rgb(40, 40, 40)"} : {}

        return (
            <nav onClick={this.handleClick} style={hover}>
                <i className="fa fa-bars"></i>
	            <ul className="dropdown-content" style={show}>
                    <a href="#intro"><li>Intro</li></a>
                    <a href="#whyMe"><li>Why Me</li></a>
                    <a href="#resume"><li>Resume</li></a>
                    <a href="#projects"><li>Projects</li></a>
        		</ul>
            </nav>
        )
    }
}

export default Navbar;
