import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import './index.css';

class Navbar extends Component {
    render(){
        return(
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/projects">Projects</Link></li>
                    <li><Link to="/resume">Resume</Link></li>
                </ul>
                <div className="overlay"></div>
            </nav>
        );
    }
}

export default Navbar;
