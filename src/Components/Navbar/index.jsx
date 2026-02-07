import React, { useEffect, useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group';
import './index.css'

const Navbar = (props) => {
    const [isOpen, setIsOpen] = useState(false)
    const nodeRef = useRef(null)
    const barsRef = useRef(null)

    useEffect(() => {
        const closeMenuOnOutsideClick = (e)=> {
            if (isOpen && !nodeRef.current?.contains(e.target) && !barsRef.current?.contains(e.target)) {
                setIsOpen(false)
            }
        }

        window.addEventListener('mousedown', closeMenuOnOutsideClick);
        return () => window.removeEventListener('mousedown', closeMenuOnOutsideClick);
    }, [isOpen]);

    const handleScroll = (target) => {
        const goal = target.current.offsetTop;
        props.onScroll(goal);
    }

    return (
        <nav onClick={() => setIsOpen(!isOpen)} className={isOpen ? "open" : "closed"}>
            <div ref={barsRef} className="container">
                <i className="fa fa-bars" />
            </div>
            <CSSTransition nodeRef={nodeRef} in={isOpen} mountOnEnter unmountOnExit timeout={500} classNames="fade-bounce-down">
                <ul ref={nodeRef} className={`dropdown-content ${isOpen ? "open" : "closed"}`}>
                    <div onClick={() => handleScroll(props.refs.profile)}><li>Home</li></div>
                    <div onClick={() => handleScroll(props.refs.aboutMe)}><li>About</li></div>
                    <div onClick={() => handleScroll(props.refs.experience)}><li>Experience</li></div>
                    <div onClick={() => handleScroll(props.refs.skills)}><li>Skills</li></div>
                    <div onClick={() => handleScroll(props.refs.contact)}><li>Contact</li></div>
                </ul>
            </CSSTransition>
        </nav>
    )
}

export default Navbar;
