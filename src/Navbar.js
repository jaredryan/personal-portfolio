import React, {Component} from 'react'
import { Link } from 'react-router-dom';

class Navbar extends Component {
    render(){
        return(
            <nav>
                <ul>
                    <Link to="/"><li>Home</li></Link>
                    <Link to="/about"><li>About</li></Link>
                    <Link to="/projects"><li>Projects</li></Link>
                    <Link to="/resume"><li>Resume</li></Link>
                </ul>
                <div className="overlay"></div>
            </nav>
        );
    }
}

export default Navbar;
