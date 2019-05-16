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
        const hover = this.state.isOpen ? {backgroundColor: "rgb(40, 40, 40)", opacity: 1} : {}
        const highlighted = this.state.isOpen ? {color: "rgb(0, 137, 203)"} : {}

        return (
            <nav onClick={this.handleClick} style={hover} ref={this.props.refs.navbar}>
                <i className="fa fa-bars" style={highlighted}></i>
	            <ul className="dropdown-content" style={show}>
                    <div onClick={() => this.handleScroll(this.props.refs.home)}><li>Home</li></div>
                    <div onClick={() => this.handleScroll(this.props.refs.whyMe)}><li>Why Me</li></div>
                    <div onClick={() => this.handleScroll(this.props.refs.resume)}><li>Resume</li></div>
                    <div onClick={() => this.handleScroll(this.props.refs.projects)}><li>Projects</li></div>
        		</ul>
            </nav>
        )
    }
}

export default Navbar;
