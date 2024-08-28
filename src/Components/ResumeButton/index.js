import React, { useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group';
import './index.css'

const ResumeButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const nodeRef = useRef(null);
    
    return (
        <div className="resumeButtonContainer">
            <button className="resumeButton left" onClick={() => setIsOpen(!isOpen)}>
                Resume
                {isOpen
                    ? <i className="fa fa-angle-up" style={{fontWeight: 100}} />
                    : <i className="fa fa-angle-down" />}
            </button>
            <CSSTransition nodeRef={nodeRef} in={isOpen} mountOnEnter={true} timeout={500} classNames="fade-bounce">
                <div ref={nodeRef} className="resumeTooltip">
                    <a href="Ryan_Jared_Resume.docx" target='_blank' rel='noopener noreferrer' className="downloadOption">
                        Download Word Document<i className="fa fa-download" style={{fontWeight: 100}} />
                    </a>
                    <a href="Ryan_Jared_Resume.pdf" target='_blank' rel='noopener noreferrer' className="downloadOption">
                        View PDF<i className="fa fa-eye" style={{fontWeight: 100}} />
                    </a>
                </div>
            </CSSTransition>
        </div>
    )
}

export default ResumeButton