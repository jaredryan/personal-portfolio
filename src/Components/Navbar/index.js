import React, { useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group';
import './index.css'

const Navbar = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const nodeRef = useRef(null);

    const handleScroll = (target) => {
        const goal = target.current.offsetTop;
        props.onScroll(goal);
    }

    return (
        <nav onClick={() => setIsOpen(!isOpen)} className={isOpen ? "open" : "closed"}>
            <div className="container">
                <i className="fa fa-bars" />
            </div>
            <CSSTransition nodeRef={nodeRef} in={isOpen} mountOnEnter unmountOnExit timeout={500} classNames="fade-bounce-down">
                <ul ref={nodeRef} className={`dropdown-content ${isOpen ? "open" : "closed"}`}>
                    <div onClick={() => handleScroll(props.refs.profile)}><li>Home</li></div>
                    <div onClick={() => handleScroll(props.refs.aboutMe)}><li>About Me</li></div>
                    <div onClick={() => handleScroll(props.refs.skills)}><li>Skills</li></div>
                    <div onClick={() => handleScroll(props.refs.experience)}><li>Timeline</li></div>
                    <div onClick={() => handleScroll(props.refs.contact)}><li>Contact</li></div>
                </ul>
            </CSSTransition>
        </nav>
    )
}

export default Navbar;
