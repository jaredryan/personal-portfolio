import React from 'react'
import './index.css'

const education = [{
    title: 'V School',
    date: '2018',
    subject: 'Fullstack JavaScript Web Development (MERN Stack)',
}, {
    title: 'UC Berkeley College of Engineering',
    date: '2017',
    subject: 'B.S. Bioengineering, Computer Science emphasis',
}]

const mapEducation = (education) => 
    <div key={education.title}>
        <h3>{education.title}</h3>
        <h4>{education.subject}<span>|</span>{education.date}</h4>
    </div>

const Education = (props) => {
    return (
        <div className="education" id="education" ref={props.refs.education}>
            <div className="container">
                <h1>Education</h1>
                <div className="educationItems">
                    {education.map(mapEducation)}
                </div>
            </div>
        </div>
    )
}

export default Education
